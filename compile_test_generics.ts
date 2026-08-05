// import { EchoAlgorithmNodeDataBuilder } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoBuilder";
// import { EchoAlgorithmNodeData, EchoAlgorithmMessageData } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoData";
// import { EchoAlgorithm } from "./domain/algorithm_impl/echo_algorithm/EchoAlgorithm";
// import { GenericAlgorithm } from "./domain/algorithm/Algorithm";
// import { AlgorithmMessageData, AlgorithmNode } from "./domain/algorithm/data/Data";
// import { SimulationEngine } from "./domain/simulation/SimulationEngine";
// import { GenericGraphconfigBuilder } from "./domain/graphconfig_generic/GenGraphconfigBuilder";
// import { GenericGraphconfig } from "./domain/graphconfig_generic/GenGraphconfig";
// import { AlgorithmIdentifier } from "./domain/algorithm/GlobalAlgorithmRegistry";
// import { AlgorithmGraphconfigBuilder } from "./domain/graphconfig_algorithm/AlgoGraphconfigBuilder";
// import { GenericAction, MessageAction, NodeAction } from "./domain/algorithm/actions/Actions";
// import { EchoAlgoMsgDataRenderer } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoRenderer";

// //* Generic Graphconfig

// const file: string = "";
// const genericConfigBuilder: GenericGraphconfigBuilder =
//     new GenericGraphconfigBuilder();
// const genConfig: GenericGraphconfig = genericConfigBuilder.build(file);





// //* Algorithm Graphconfig

// const algoType: AlgorithmIdentifier = AlgorithmIdentifier.Echo_Algorithm; //!
// const echoNodeDataBuilder = new EchoAlgorithmNodeDataBuilder(); //!
// const algoConfigBuilder =
//     new AlgorithmGraphconfigBuilder<EchoAlgorithmNodeData>();
// const algoConfig =
//     algoConfigBuilder.build(genConfig, echoNodeDataBuilder, algoType);




    
// // * Simulation
// const echoAlgorithm = new EchoAlgorithm(); //!
// const genActQ = new Array<GenericAction>();
// const msgActQ = new Array<MessageAction<EchoAlgorithmMessageData>>();
// const nodeActQ = new Array<NodeAction<EchoAlgorithmNodeData>>();

// const engine = new SimulationEngine(
//     echoAlgorithm,
//     algoConfig.nodes,
//     algoConfig.edges,

//     genActQ,
//     msgActQ,
//     nodeActQ,
// )

