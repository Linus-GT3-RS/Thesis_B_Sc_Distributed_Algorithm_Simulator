// import { GenericMessage, GenericNodeState } from "./algorithm_plugin_api/entities/state_entities/AlgoData.js";
// import { Identifiable, ReadonlyStore } from "../common/EntityStores.js";
// import { NodeLog } from "../engine/SimulationEngine.js";



// export class SimulationSnapshotPresenter {

//     /**
//      * 
//      * @param snapshotMessages 
//      * @param updates 
//      * @throws {IdentifiableError} if id of updated message does not exist in snapshot of messages
//      */
//     public presentMessageUpdates(
//         snapshotMessages: ReadonlyStore<GenericMessage>,
//         updates: ReadonlySet<number>
//     ): void {
//         for (const idUpdated of updates) {
//             // get update
//             const updatedMessage: Readonly<GenericMessage> = snapshotMessages.peek({ id: idUpdated });

//             // present update
//             console.log(updatedMessage);
//         }
//     }

//     /**
//      * 
//      * @param snapshotNodes 
//      * @param updatedNodes 
//      * @throws {IdentifiableError} if id of updated node does not exist in snapshot of nodes
//      */
//     public presentUpdatedNodes(snapshotNodes: ReadonlyStore<GenericNodeState>, updatedNodes: ReadonlySet<number>): void {
//         for (const idUpdatedNode of updatedNodes) {
//             // get update
//             const updatedNode: Readonly<GenericNodeState> = snapshotNodes.peek({ id: idUpdatedNode });

//             // present update
//             console.log(updatedNode);
//         }
//     }


//     /**
//      * 
//      * @param snapshot 
//      * @param updatedLogs 
//      * @throws {IdentifiableError} if id of update log does not exist in snapshot of logs
//      */
//     public presentUpdatedLogs(snapshot: ReadonlyStore<NodeLog>, updatedLogs: ReadonlySet<number>): void {
//         for (const idUpdatedLog of updatedLogs) {
//             // get update
//             const updatedLog: Readonly<NodeLog> = snapshot.peek({ id: idUpdatedLog });

//             // present update
//             console.log(updatedLog);
//         }
//     }
// }