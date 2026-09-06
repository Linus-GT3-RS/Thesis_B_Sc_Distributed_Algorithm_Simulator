import { Identifiable, ReadonlyIndexedStore } from "../../../../common/EntityStores.js";
import { IDomainEventGateway } from "../../../gateways/EventGateway.js";
import { NodeLogUpdatedEv, UpdatedNodeLogEv, UpdatedNodeStateEv } from "../../../gateways/Events.js";
import { NodeLog } from "../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { NodeState } from "../../algorithm_plugins/api/entities/state_entities/Nodes.js";
import { ModelBuilderNodeLog, ModelBuilderNodeState } from "./models/PresentationModelBuilder.js";
import { PresentationModelNodeLog, PresentationModelNodeState } from "./models/PresentationModels.js";

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