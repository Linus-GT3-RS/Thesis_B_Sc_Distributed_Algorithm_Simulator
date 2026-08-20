import { GenericEdge, GenericNode } from "./domain/algorithm/data/AlgoData.js";
import { EchoAlgorithmNode } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoData.js";
import { AlgorithmDataWorker } from "./domain/algorithm/data/AlgoDataWorker.js";
import { EchoAlgoNodeProcess } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoProtocol.js";
import { AlgorithmActionHandler } from "./domain/algorithm/actions/ActionScheduler.js";
import { MessageQueueBuilder } from "./domain/algorithm/data/AlgoDataBuilder.js";
import Queue from "yocto-queue";
import { RealtimeClock } from "./domain/simulation/RealtimeClock.js";
import { SimulationEngine, SimulationContext } from "./domain/simulation/SimulationEngine.js";

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


// Setup SimulationEngine
const actHandler = new AlgorithmActionHandler(new Queue<unknown>());
const algo = new EchoAlgoNodeProcess(actHandler);
const dataWorker = new AlgorithmDataWorker();

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