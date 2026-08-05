import TinyQueue from "tinyqueue";
import { GenericAlgorithm } from "./domain/algorithm/Algorithm";
import { GenericEdge, GenericMessage, GenericNode } from "./domain/algorithm/data/Data";
import { AlgorithmIdentifier, algorithmRegistry } from "./domain/algorithm/GlobalAlgorithmRegistry";
import { SimulationEngine } from "./domain/simulation/SimulationEngine";

// get registry entry

const echoRegEntry = algorithmRegistry.get(
    AlgorithmIdentifier.Echo_Algorithm
);
if (echoRegEntry === undefined) {
    throw new Error();
}

// use registry entry

const algo = echoRegEntry.getAlgorithm();

const builder = echoRegEntry.getNodeBuilder();
const nodes = [
    builder.build(""),
    builder.build("")
];

// build engine

const engine = new SimulationEngine(
    algo,
    algo.actionHandler,

    nodes,
    new Array<GenericEdge>(),
    new TinyQueue<GenericMessage>(),
);

