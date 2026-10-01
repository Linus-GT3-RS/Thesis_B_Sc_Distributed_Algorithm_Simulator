import type { IndexedStore } from "@/common/EntityStores"
import type { Node } from "../algorithm_plugins/plugin_api/entities/state_entities/Nodes"
import type { BiDirectionalEdgeState } from "../algorithm_plugins/plugin_api/entities/state_entities/Edges"
import type { IDomainEventGateway } from "@/domain_layer/gateways/EventGateway";

export class StateBehavGraphconfig {

    constructor(
        private storeConfigs: GraphconfigRepo // full access
    ) { }

    public onCmdGetGraphconfigs(): void {

    }


    public onCmdSetActiveConfig(id: number): void {

    }

}

export class GraphconfigRepo {

    constructor(
        private storeConfigs: IndexedStore<Graphconfig>, // full access
        private activeConfig: number | null, //todo number? or full obj ref.. whats better

        private eventGateway: IDomainEventGateway,
    ) { }

    public getAllConfigs(): GraphconfigInfo[] {
        const res: GraphconfigInfo[] = [];

        for (const config of this.storeConfigs.readAllValues()) {

        }

        return res;
    }

}


export type GraphconfigInfo =
    Pick<Graphconfig, "id" | "name" | "description">

export interface Graphconfig {
    id: number,
    name: string,
    description: string,

    storeNodes: IndexedStore<Node>,
    storeEdges: IndexedStore<BiDirectionalEdgeState>,
}