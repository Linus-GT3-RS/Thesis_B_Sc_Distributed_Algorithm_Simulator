import { INodeProcess } from "../../algorithm_plugins/api/entities/behaviour_entities/NodeProcess.js";
import { NodeProcessEnvironment } from "../../algorithm_plugins/api/entities/behaviour_entities/NodeProcessEnv.js";
import { MessageState } from "../../algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../../algorithm_plugins/api/entities/state_entities/Nodes.js";
import { NodeProcessLogObserver, NodeStateObserver, MessageStateObserver } from "../presenter/SimSnapshotObserver.js";
import { PendingMessage, SimulationSnapshot } from "../SimulationSnapshot.js";
import { SnapshotDataWorker as SnapshotDataWorker } from "../worker/SnapshotWorker.js";
import { LoggingSystem } from "./env_system_impl/LogSystem.js";
import { MessageDeliverySystem } from "./env_system_impl/MsgDeliverySystem.js";
import { MessageSenderSystem } from "./env_system_impl/MsgSenderSystem.js";
import { NodeStateSystem } from "./env_system_impl/NodeSystem.js";

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
     * @throws {} // todo exceptions
     */
    public abstract simulateInitiation(initiatorNode: number): void;

    /**
     * Advances simulation time by the given amount and simulates 
     * how the world evolves and behaves during that time.
     * 
     * @param t_ms 
     * @throws {} // todo exceptions
     */
    public abstract simulateTimeAdvancement(delta: number): void;

}


//* Engine

export class SimulationEngine<N extends NodeState>
    implements ISimulationEngine {

    constructor(
        private ss: SimulationSnapshot<N>, // full access

        private worker: SnapshotDataWorker,
        private process: INodeProcess<N>,

        private observerLogsNodeProcess: NodeProcessLogObserver,
        private observerNodeStates: NodeStateObserver,
        private observerMessageStates: MessageStateObserver
    ) { }


    //? Initiation Simulation

    public simulateInitiation(target: number): void {
        // determine initiator node
        const initiator: Readonly<NodeState> = this.ss.nodeStates.read({ id: target });
        const scopedNodeId: number = initiator.id;

        // setup environment for NodeProcess
        const env: NodeProcessEnvironment<N> = {
            up: new LoggingSystem(this.ss.logs,
                this.observerLogsNodeProcess, scopedNodeId
            ),

            local: new NodeStateSystem<N>(this.ss.nodeStates,
                this.observerNodeStates, scopedNodeId
            ),

            in: new MessageDeliverySystem(null),

            out: new MessageSenderSystem(
                this.ss.msgStates, this.ss.pendingMessages, this.ss.simulationTimestamp,
                this.observerMessageStates,
                this.ss.edgeStates, this.worker,
                scopedNodeId
            ),
        };

        // simulate initiation
        this.process.onInitiationInstruction(env);
    }


    //? Time Advancement Simulation

    public simulateTimeAdvancement(delta_ms: number): void {
        const t_ms: number = this.ss.simulationTimestamp + delta_ms;
        this.advanceTimeUntil(t_ms);
    }


    private advanceTimeUntil(t_ms: number): void {
        if (t_ms < this.ss.simulationTimestamp) {
            throw new SimulationEngineError('');
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
                    this.observerLogsNodeProcess, scopedNode
                ),

                local: new NodeStateSystem<N>(this.ss.nodeStates,
                    this.observerNodeStates, scopedNode
                ),

                in: new MessageDeliverySystem(delivery.data),

                out: new MessageSenderSystem(
                    this.ss.msgStates, this.ss.pendingMessages, this.ss.simulationTimestamp,
                    this.observerMessageStates,
                    this.ss.edgeStates, this.worker,
                    scopedNode
                ),
            };

            // simulate message delivery
            this.process.onIncomingMessage(env);
        }
        this.ss.simulationTimestamp = t_ms;
    }

}