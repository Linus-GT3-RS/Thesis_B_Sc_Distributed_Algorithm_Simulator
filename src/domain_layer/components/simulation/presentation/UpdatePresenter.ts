import { Identifiable, ReadonlyIndexedStore } from "../../../../common/EntityStores.js";
import { IDomainEventGateway } from "../../../gateways/EventGateway.js";
import { NodeLogUpdatedEv } from "../../../gateways/Events.js";
import { NodeLog } from "../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { ModelBuilderNodeLog } from "./models/PresentationModelBuilder.js";
import { PresentationModelNodeLog } from "./models/PresentationModels.js";


export class NodeLogPresenter {

    constructor(
        private store: ReadonlyIndexedStore<NodeLog>,
        private modelBuilder: ModelBuilderNodeLog,
        private eventGateway: IDomainEventGateway,
    ) { }

    public onUpdate(id: number): void {
        const update: Readonly<NodeLog> = this.store.read({ id: id });
        const model: PresentationModelNodeLog =
            this.modelBuilder.build(update);

        this.eventGateway.emit(new NodeLogUpdatedEv(
            model
        ));
    }

}