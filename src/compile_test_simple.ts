import { GenericEdge, GenericNode } from "./domain/algorithm/data/AlgoData.js";
import { SimulationContext, SimulationEngine } from "./domain/simulation/SimulationEngine.js";
import { EchoAlgorithmNode } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoData.js";
import { AlgorithmDataWorker } from "./domain/algorithm/data/AlgoDataWorker.js";
import { EchoAlgorithm } from "./domain/algorithm_impl/echo_algorithm/EchoAlgorithm.js";
import { AlgorithmActionHandler } from "./domain/algorithm/actions/ActionHandler.js";
import { MessageQueueBuilder } from "./domain/algorithm/data/AlgoDataBuilder.js";
import Queue from "yocto-queue";

//! todo initiaor false by default
// only update if it acutally does sth 

// Setup Simulation Context
const node0 = new EchoAlgorithmNode(0, false, false, 0, null);
const node1 = new EchoAlgorithmNode(1, false, false, 0, null);
const node2 = new EchoAlgorithmNode(2, false, false, 0, null);
const node3 = new EchoAlgorithmNode(3, false, false, 0, null);
const node4 = new EchoAlgorithmNode(4, false, false, 0, null);

const nodes = new Map<number, GenericNode>([
    [0, node0],
    [1, node1],
    [2, node2],
    [3, node3],
    [4, node4],
]);

const edges = new Map<number, GenericEdge>([
    [0, new GenericEdge(0, node0, node1, 100)],
    [1, new GenericEdge(1, node0, node2, 110)],

    [2, new GenericEdge(2, node2, node3, 120)],
    [3, new GenericEdge(3, node2, node4, 130)],

    [4, new GenericEdge(3, node1, node4, 140)],
]);

const context = new SimulationContext(
    nodes, edges, new MessageQueueBuilder().build(), 0
);


// Setup SimulationEngine
const actHandler = new AlgorithmActionHandler(new Queue<unknown>());
const algo = new EchoAlgorithm(actHandler);
const dataWorker = new AlgorithmDataWorker();

const engine = new SimulationEngine(
    algo, actHandler, dataWorker
);


// Start Simulation
engine.handleInitiationRequest(0, context);
engine.processMessagesAt(context);

// Run Simulation
while (context.messages.length > 0) { // code line just for demo
    context.simTime += 5;            // code line just for demo

    engine.processMessagesAt(context);
}