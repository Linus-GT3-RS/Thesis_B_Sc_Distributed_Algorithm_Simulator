import { INodeProcess as INodeProcessEmulator } from "../../algorithm_plugins/plugin_api/entities/behaviour_entities/NodeProcess.js";
import type { NodeProcessEnvironment } from "../../algorithm_plugins/plugin_api/entities/behaviour_entities/NodeProcessEnv.js";
import { MessageState } from "../../algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import type { NodeState } from "../../algorithm_plugins/plugin_api/entities/state_entities/Nodes.js";
import { SnapshotDataWorker as SnapshotDataWorker } from "../data/SnapshotWorker.js";
import { LoggingSystem } from "./environment_systems/LogSystem.js";
import { MessageDeliverySystem } from "./environment_systems/MsgDeliverySystem.js";
import { MessageSenderSystem } from "./environment_systems/MsgSenderSystem.js";
import { NodeStateSystem } from "./environment_systems/NodeSystem.js";
import type { PendingMessage } from "../data/SimulationSnapshot.js";
import { SimulationSnapshot } from "../data/SimulationSnapshot.js";
import { NodeLog } from "../../algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import { IChangeObserverCollection } from "../entity_observation/EntityCollectionObserver.js";

//* Errors

/**
 * If any error occurs in the simulation, 
 * this exception is thrown
 * 
 * This Exceptions marks the simulation state as
 * illegal.
 * 
 * A reset should occur
 */
export class SimulationEngineError extends Error { }


//* Interface Engine

/**
 * The {@link SimulationEngine} receives a {@link SimulationSnapshot}
 * representing the current state of the simulated world.
 *
 * Based on this state, it simulates the actions and 
 * events that would occur in reallife.
 * 
 * The resulting sequence of snapshots represents "the simulation" over time,
 * similar to how a sequence of images represents a video.
 */
export abstract class ISimulationEngine {

    /**
     * Allows the node process to execute its initiation protocol.
     * This action is executed instantly at the current simulation time and does
     * not advance simulation time.
     * 
     * @param initiatorNode 
     * @throws {}
     */
    public abstract simulateInitiation(initiatorNode: number): void;

    /**
     * Advances simulation time by the given amount and simulates 
     * how the world evolves and behaves during that time.
     * 
     * @param t_ms 
     * @throws {}
     */
    public abstract simulateTimeAdvancement(delta: number): void;

}


//* Engine

export class SimulationEngine<N extends NodeState>
    implements ISimulationEngine {

    constructor(
        private ss: SimulationSnapshot<N>, // full access

        private worker: SnapshotDataWorker,
        private processEmulator: INodeProcessEmulator<N>,

        private creationObsNodeLogs: IChangeObserverCollection<NodeLog>,
        private updateObsNodeStates: IChangeObserverCollection<NodeState>,
        private creationObsMessageStates: IChangeObserverCollection<MessageState>,
    ) { }

    //= Initiation Simulation

    public simulateInitiation(target: number): void {
        // determine initiator node
        const initiator: Readonly<NodeState> = this.ss.nodeStates.read({ id: target });
        const scopedNodeId: number = initiator.id;

        // setup environment for NodeProcess
        const env: NodeProcessEnvironment<N> = {
            up: new LoggingSystem(this.ss.logs,
                this.creationObsNodeLogs, scopedNodeId
            ),

            local: new NodeStateSystem<N>(this.ss.nodeStates,
                this.updateObsNodeStates, scopedNodeId
            ),

            in: new MessageDeliverySystem(null),

            out: new MessageSenderSystem(
                this.ss.msgStates, this.ss.pendingMessages,
                this.creationObsMessageStates,
                this.ss.simulationTimestamp,
                this.ss.edgeStates, this.worker,
                scopedNodeId
            ),
        };

        // simulate initiation
        this.processEmulator.onInitiationInstruction(env);
    }


    //? Time Advancement Simulation

    public simulateTimeAdvancement(delta_ms: number): void {
        const t_ms: number = this.ss.simulationTimestamp + delta_ms;
        this.advanceTimeUntil(t_ms);
    }


    private advanceTimeUntil(t_ms: number): void {
        if (t_ms < this.ss.simulationTimestamp) {
            throw new SimulationEngineError(
                `Can not simulate time advancement
                to a time t which is in the past:
                SimulationTime is ${this.ss.simulationTimestamp}, 
                but t is ${t_ms}.`
            );
        }

        while (this.worker.pendingMsgExists( // deliver message
            this.ss.pendingMessages, t_ms
        )) {
            // determine pending MessageState
            const pending: Readonly<PendingMessage> =
                this.worker.popPendingMessage(this.ss.pendingMessages);
            const delivery: Readonly<MessageState> = this.ss.msgStates.read(pending);

            // update simulation time
            this.ss.simulationTimestamp = delivery.destinationTime;

            // setup environment for NodeProcess
            const scopedNode: number = delivery.receiver;

            const env: NodeProcessEnvironment<N> = {
                up: new LoggingSystem(this.ss.logs,
                    this.creationObsNodeLogs, scopedNode
                ),

                local: new NodeStateSystem<N>(this.ss.nodeStates,
                    this.updateObsNodeStates, scopedNode
                ),

                in: new MessageDeliverySystem(delivery.data),

                out: new MessageSenderSystem(
                    this.ss.msgStates, this.ss.pendingMessages,
                    this.creationObsMessageStates,
                    this.ss.simulationTimestamp,
                    this.ss.edgeStates, this.worker,
                    scopedNode
                ),
            };

            // simulate message delivery
            this.processEmulator.onIncomingMessage(env);
        }
        this.ss.simulationTimestamp = t_ms;
    }

}