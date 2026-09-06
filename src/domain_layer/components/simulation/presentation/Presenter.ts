import { Identifiable, ReadonlyIndexedStore } from "../../../../common/EntityStores.js";
import { IDomainEventGateway } from "../../../gateways/EventGateway.js";
import { NodeLogUpdatedEv, UpdatedEdgeStateEv, UpdatedMessageStateEv, UpdatedNodeLogEv, UpdatedNodeStateEv } from "../../../gateways/Events.js";
import { BiDirectionalEdgeState } from "../../algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeLog } from "../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../../algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../../algorithm_plugins/api/entities/state_entities/Nodes.js";
import { ModelBuilderEdgeState, ModelBuilderMessageState, ModelBuilderNodeLog, ModelBuilderNodeState } from "./models/PresentationModelBuilder.js";
import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeLog, PresentationModelNodeState } from "./models/PresentationModels.js";

//* Interface

/** 
 * An entity presenter is responsible for presenting 
 * entities of one specific type. 
 * 
 * It presents an entity through a PresentationModel 
 * and emits corresponding events. 
 */
export abstract class IEntityPresenter {

    /**
     * Presents an updated entity.
     * @param id 
     */
    public presentUpdated(id: number): void {

    }

    // /**
    //  * Presents a newly created entity.
    //  * @param id 
    //  */
    // public presentCreated(id: number): void {

    // }

    // /**
    //  * Presents an entity in response to a read request.
    //  * @param id 
    //  */
    // public presentRead(id: number): void {

    // }

}


//* Implementations 

export class PresenterNodeLogs implements IEntityPresenter {

    constructor(
        private store: ReadonlyIndexedStore<NodeLog>,
        private modelBuilder: ModelBuilderNodeLog,
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentUpdated(id: number): void {
        const updtEntity: Readonly<NodeLog> = this.store.read({ id: id });

        const model: PresentationModelNodeLog =
            this.modelBuilder.build(updtEntity);

        this.eventGateway.emit(new UpdatedNodeLogEv(model));
    }

}


export class PresenterNodeStates implements IEntityPresenter {

    constructor(
        private roStore: ReadonlyIndexedStore<NodeState>,
        private modelBuilder: ModelBuilderNodeState,
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentUpdated(id: number): void {
        const updtEnt: Readonly<NodeState> = this.roStore.read({ id: id });

        const model: PresentationModelNodeState = this.modelBuilder.build(updtEnt);

        this.eventGateway.emit(new UpdatedNodeStateEv(model));
    }

}


export class PresenterMessageStates implements IEntityPresenter {

    constructor(
        private store: ReadonlyIndexedStore<MessageState>,
        private modelBuilder: ModelBuilderMessageState,
        private eventGateway: IDomainEventGateway,
    ) { }


    public presentUpdated(id: number): void {
        const updtEntity: Readonly<MessageState> =
            this.store.read({ id: id });

        const model: PresentationModelMessageState =
            this.modelBuilder.build(updtEntity);

        this.eventGateway.emit(new UpdatedMessageStateEv(model));
    }

}



export class PresenterEdgeStates implements IEntityPresenter {

    constructor(
        private store: ReadonlyIndexedStore<BiDirectionalEdgeState>,
        private modelBuilder: ModelBuilderEdgeState,
        private eventGateway: IDomainEventGateway,
    ) { }

    public presentUpdated(id: number): void {
        const updtEntity: Readonly<BiDirectionalEdgeState> =
            this.store.read({ id: id });

        const model: PresentationModelEdgeState =
            this.modelBuilder.build(updtEntity);

        this.eventGateway.emit(new UpdatedEdgeStateEv(model));
    }

}