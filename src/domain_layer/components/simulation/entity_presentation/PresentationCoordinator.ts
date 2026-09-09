import type { ReadonlyIndexedStore } from "@/common/EntityStores.js";
import { IDomainEventGateway } from "../../../gateways/EventGateway.js";
import { CreatedMessageStateEv, CreatedNodeLogEv, UpdatedEdgeStateEv, UpdatedNodeStateEv } from "../../../gateways/Events.js";
import { BiDirectionalEdgeState } from "../../algorithm_plugins/plugin_api/entities/state_entities/Edges.js";
import { NodeLog } from "../../algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import { MessageState } from "../../algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import { NodeState } from "../../algorithm_plugins/plugin_api/entities/state_entities/Nodes.js";
import { IChangeReportProvider } from "../entity_observation/EntityCollectionObserver.js";
import type { IModelBuilderNodeLog, IModelBuilderNodeState, IModelBuilderEdgeState, IModelBuilderMessageState } from "./models/ModelBuilder.js";
import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeLog, PresentationModelNodeState } from "./models/PresentationModels.js";


export abstract class IPresentationCoordinator {

    /**
     * changes can be created or updated entities
     */
    public abstract presentSnapshotChanges(): void;

}


/**
 * handles presentation of changes of entites
 * by presenting all in a specific order
 * 
 * the corresponding
 * event containing presentation model of entity 
 * je nach action
 */
export class PresentationCoordinator implements IPresentationCoordinator {

    constructor(
        //= all observers
        private creationReporterNodeLogs: IChangeReportProvider,
        private updateReporterNodeStates: IChangeReportProvider,
        private updateReporterEdgeStates: IChangeReportProvider,
        private creationReporterMessageStates: IChangeReportProvider,

        //= all stores
        private storeNodeLogs: ReadonlyIndexedStore<NodeLog>,
        private storeNodeStates: ReadonlyIndexedStore<NodeState>,
        private storeEdgeStates: ReadonlyIndexedStore<BiDirectionalEdgeState>,
        private storeMessageStates: ReadonlyIndexedStore<MessageState>,

        //= all builder
        private modelBuilderNodeLog: IModelBuilderNodeLog,
        private modelBuilderNodeState: IModelBuilderNodeState,
        private modelBuilderEdgeState: IModelBuilderEdgeState,
        private modelBuilderMessageState: IModelBuilderMessageState,

        //= event gateway
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentSnapshotChanges(): void {
        //= present node state collection changes
        for (const idUpdated of this.updateReporterNodeStates.consumeChangeReports()) {
            const updated: Readonly<NodeState> =
                this.storeNodeStates.read({ id: idUpdated });

            const model: PresentationModelNodeState =
                this.modelBuilderNodeState.build(updated);

            this.eventGateway.emit(new UpdatedNodeStateEv(model));
        }

        //= present edge state collection changes
        for (const idUpdatedEdge of this.updateReporterEdgeStates.consumeChangeReports()) {
            const updatedEdge: Readonly<BiDirectionalEdgeState> =
                this.storeEdgeStates.read({ id: idUpdatedEdge });

            const model: PresentationModelEdgeState =
                this.modelBuilderEdgeState.build(updatedEdge);

            this.eventGateway.emit(new UpdatedEdgeStateEv(model));
        }

        //= present message state collection changes
        for (const idCreatedMessage of this.creationReporterMessageStates.consumeChangeReports()) {
            const target: Readonly<MessageState> =
                this.storeMessageStates.read({ id: idCreatedMessage });

            const model: PresentationModelMessageState =
                this.modelBuilderMessageState.build(target);

            this.eventGateway.emit(new CreatedMessageStateEv(model));
        }

        //= present log collection changes
        for (const idCreatedLog of this.creationReporterNodeLogs.consumeChangeReports()) {
            const createdLog: Readonly<NodeLog> =
                this.storeNodeLogs.read({ id: idCreatedLog });

            const model: PresentationModelNodeLog =
                this.modelBuilderNodeLog.build(createdLog);

            this.eventGateway.emit(new CreatedNodeLogEv(model));
        }
    }

}