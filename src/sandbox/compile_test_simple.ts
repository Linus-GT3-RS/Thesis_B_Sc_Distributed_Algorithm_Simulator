import { GenericBiDirectionalEdge, GenericNodeState } from "../domain_layer/components/simulation/algorithm_plugin_api/entities/state_entities/AlgoData.js";
import { EchoAlgorithmNode } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoData.js";
import { SimulationEntityWorker } from "../domain_layer/components/simulation/algorithm_plugin_api/entities/worker/EntityWorker.js";
import { EchoAlgoNodeProcess } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoProtocol.js";
import { AlgorithmActionHandler } from "./domain/simulation/algorithm_plugin_api/actions/ActionScheduler.js";
import { MessageQueueBuilder } from "../domain_layer/components/simulation/algorithm_plugin_api/entity_builder/AlgoDataBuilder.js";
import Queue from "yocto-queue";
import { RealtimeClock } from "../domain_layer/components/simulation/engine/RealtimeClock.js";
import { SimulationEngine, SimulationContext } from "../domain_layer/components/simulation/SimulationEngine.js";

//! todo initiaor false by default
// only update if it acutally does sth 

// Setup Simulation Context
const node0 = new EchoAlgorithmNode(0, false, false, 0, null);
const node1 = new EchoAlgorithmNode(1, false, false, 0, null);
const node2 = new EchoAlgorithmNode(2, false, false, 0, null);
const node3 = new EchoAlgorithmNode(3, false, false, 0, null);
const node4 = new EchoAlgorithmNode(4, false, false, 0, null);

const nodes = new Map<number, GenericNodeState>([
    [0, node0],
    [1, node1],
    [2, node2],
    [3, node3],
    [4, node4],
]);

const edges = new Map<number, GenericBiDirectionalEdge>([
    [0, new GenericBiDirectionalEdge(0, node0, node1, 100)],
    [1, new GenericBiDirectionalEdge(1, node0, node2, 110)],

    [2, new GenericBiDirectionalEdge(2, node2, node3, 120)],
    [3, new GenericBiDirectionalEdge(3, node2, node4, 130)],

    [4, new GenericBiDirectionalEdge(3, node1, node4, 140)],
]);


// Setup SimulationEngine
const actHandler = new AlgorithmActionHandler(new Queue<unknown>());
const algo = new EchoAlgoNodeProcess(actHandler);
const dataWorker = new SimulationEntityWorker();

const engine = new SimulationEngine(
    algo, actHandler, dataWorker
);


// Start Simulation
const initiatorId: number = 0;
const context = new SimulationContext(
    nodes, edges, new MessageQueueBuilder().build(), 0
);
const rtClock = new RealtimeClock(Date.now); //? purpose in pauseCmd to be shown

engine.handleInitiation(initiatorId, context);
engine.processMessagesInstantTillSimTime(context);

// Run Simulation
while (context.pendingMessages.length > 0) { // code line just for demo
    context.curSimTimestamp += rtClock.getElapsedTime_ms();

    engine.processMessagesInstantTillSimTime(context);
}