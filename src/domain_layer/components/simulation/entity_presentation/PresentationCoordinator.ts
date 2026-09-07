import { ReadonlyIndexedStore } from "../../../../common/EntityStores.js";
import { IDomainEventGateway } from "../../../gateways/EventGateway.js";
import { CreatedEdgeStateEv, CreatedMessageStateEv, CreatedNodeLogEv, CreatedNodeStateEv, UpdatedEdgeStateEv, UpdatedNodeStateEv } from "../../../gateways/Events.js";
import { BiDirectionalEdgeState } from "../../algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeLog } from "../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../../algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../../algorithm_plugins/api/entities/state_entities/Nodes.js";
import { ConsumableCollectionObserver } from "../entity_observation/EntityCollectionObserver.js";
import { ModelBuilderEdgeState, ModelBuilderMessageState, ModelBuilderNodeLog, ModelBuilderNodeState } from "./models/PresentationModelBuilder.js";
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
        //= all stores
        private storeNodeLogs: ReadonlyIndexedStore<NodeLog>,
        private storeNodeStates: ReadonlyIndexedStore<NodeState>,
        private storeEdgeStates: ReadonlyIndexedStore<BiDirectionalEdgeState>,
        private storeMessageStates: ReadonlyIndexedStore<MessageState>,

        //= all observers
        private obsNodeLogs: ConsumableCollectionObserver<NodeLog>,
        private obsNodeStates: ConsumableCollectionObserver<NodeState>,
        private obsEdgeStates: ConsumableCollectionObserver<BiDirectionalEdgeState>,
        private obsMessageStates: ConsumableCollectionObserver<MessageState>,

        //= all builder
        private modelBuilderNodeLog: ModelBuilderNodeLog,
        private modelBuilderNodeState: ModelBuilderNodeState,
        private modelBuilderEdgeState: ModelBuilderEdgeState,
        private modelBuilderMessageState: ModelBuilderMessageState,

        //= event gateway
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentSnapshotChanges(): void {
        //= present node state collection changes
        for (const idCreated of this.obsNodeStates.consumeCreationReports()) {
            const created: Readonly<NodeState> =
                this.storeNodeStates.read({ id: idCreated });

            const model: PresentationModelNodeState =
                this.modelBuilderNodeState.build(created);

            this.eventGateway.emit(new CreatedNodeStateEv(model));
        }

        for (const idUpdated of this.obsNodeStates.consumeUpdateReports()) {
            const updated: Readonly<NodeState> =
                this.storeNodeStates.read({ id: idUpdated });

            const model: PresentationModelNodeState =
                this.modelBuilderNodeState.build(updated);

            this.eventGateway.emit(new UpdatedNodeStateEv(model));
        }

        //= present edge state collection changes
        for (const idCreatedEdge of this.obsEdgeStates.consumeCreationReports()) {
            const createdEdge: Readonly<BiDirectionalEdgeState> =
                this.storeEdgeStates.read({ id: idCreatedEdge });

            const model: PresentationModelEdgeState =
                this.modelBuilderEdgeState.build(createdEdge);

            this.eventGateway.emit(new CreatedEdgeStateEv(model));
        }

        for (const idUpdatedEdge of this.obsEdgeStates.consumeUpdateReports()) {
            const updatedEdge: Readonly<BiDirectionalEdgeState> =
                this.storeEdgeStates.read({ id: idUpdatedEdge });

            const model: PresentationModelEdgeState =
                this.modelBuilderEdgeState.build(updatedEdge);

            this.eventGateway.emit(new UpdatedEdgeStateEv(model));
        }

        //= present message state collection changes
        for (const idCreatedMessage of this.obsMessageStates.consumeCreationReports()) {
            const target: Readonly<MessageState> =
                this.storeMessageStates.read({ id: idCreatedMessage });

            const model: PresentationModelMessageState =
                this.modelBuilderMessageState.build(target);

            this.eventGateway.emit(new CreatedMessageStateEv(model));
        }

        //= present log collection changes
        for (const idCreatedLog of this.obsNodeLogs.consumeCreationReports()) {
            const createdLog: Readonly<NodeLog> =
                this.storeNodeLogs.read({ id: idCreatedLog });

            const model: PresentationModelNodeLog =
                this.modelBuilderNodeLog.build(createdLog);

            this.eventGateway.emit(new CreatedNodeLogEv(model));
        }
    }

}