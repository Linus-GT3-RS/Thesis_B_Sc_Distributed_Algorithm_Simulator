import { ReadonlyIndexedStore } from "../../../../common/EntityStores.js";
import { IDomainEventGateway } from "../../../gateways/EventGateway.js";
import { CreatedEdgeStateEv, CreatedMessageStateEv, CreatedNodeLogEv, CreatedNodeStateEv, UpdatedEdgeStateEv, UpdatedNodeStateEv } from "../../../gateways/Events.js";
import { BiDirectionalEdgeState } from "../../algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeLog } from "../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../../algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../../algorithm_plugins/api/entities/state_entities/Nodes.js";
import { ModelBuilderEdgeState, ModelBuilderMessageState, ModelBuilderNodeLog, ModelBuilderNodeState } from "./models/PresentationModelBuilder.js";
import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeLog, PresentationModelNodeState } from "./models/PresentationModels.js";

//* Interfaces

export abstract class IPresenterUpdatedEntityStates {

    /**
     * Presents an entity after it has been updated by
     * emitting an event containing its presentation model. 
     * 
     * @param id 
     */
    public abstract presentUpdate(id: number): void;

}

export abstract class IPresenterCreatedEntityStates {

    /**
     * Presents an entity for the first time after it
     * has been created by emitting an event containing
     * its presentation model.
     * 
     * @param id 
     */
    public abstract presentCreation(id: number): void;

}


//* Implementations 

export class PresenterNodeLogs implements IPresenterCreatedEntityStates {

    constructor(
        private store: ReadonlyIndexedStore<NodeLog>,
        private modelBuilder: ModelBuilderNodeLog,
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentCreation(id: number): void {
        const updtEntity: Readonly<NodeLog> = this.store.read({ id: id });

        const model: PresentationModelNodeLog =
            this.modelBuilder.build(updtEntity);

        this.eventGateway.emit(new CreatedNodeLogEv(model));
    }

}


export class PresenterNodeStates
    implements
    IPresenterCreatedEntityStates,
    IPresenterUpdatedEntityStates {

    constructor(
        private roStore: ReadonlyIndexedStore<NodeState>,
        private modelBuilder: ModelBuilderNodeState,
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentCreation(id: number): void {
        const updtEnt: Readonly<NodeState> = this.roStore.read({ id: id });

        const model: PresentationModelNodeState = this.modelBuilder.build(updtEnt);

        this.eventGateway.emit(new CreatedNodeStateEv(model));
    }

    public presentUpdate(id: number): void {
        const updtEnt: Readonly<NodeState> = this.roStore.read({ id: id });

        const model: PresentationModelNodeState = this.modelBuilder.build(updtEnt);

        this.eventGateway.emit(new UpdatedNodeStateEv(model));
    }

}


export class PresenterMessageStates implements IPresenterCreatedEntityStates {

    constructor(
        private store: ReadonlyIndexedStore<MessageState>,
        private modelBuilder: ModelBuilderMessageState,
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentCreation(id: number): void {
        const updtEntity: Readonly<MessageState> =
            this.store.read({ id: id });

        const model: PresentationModelMessageState =
            this.modelBuilder.build(updtEntity);

        this.eventGateway.emit(new CreatedMessageStateEv(model));
    }

}



export class PresenterEdgeStates
    implements
    IPresenterCreatedEntityStates,
    IPresenterUpdatedEntityStates {

    constructor(
        private store: ReadonlyIndexedStore<BiDirectionalEdgeState>,
        private modelBuilder: ModelBuilderEdgeState,
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentCreation(id: number): void {
        const updtEntity: Readonly<BiDirectionalEdgeState> =
            this.store.read({ id: id });

        const model: PresentationModelEdgeState =
            this.modelBuilder.build(updtEntity);

        this.eventGateway.emit(new CreatedEdgeStateEv(model));
    }

    public presentUpdate(id: number): void {
        const updtEntity: Readonly<BiDirectionalEdgeState> =
            this.store.read({ id: id });

        const model: PresentationModelEdgeState =
            this.modelBuilder.build(updtEntity);

        this.eventGateway.emit(new UpdatedEdgeStateEv(model));
    }

}