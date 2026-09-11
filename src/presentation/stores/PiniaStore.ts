import { IndexedStore } from "@/common/EntityStores";
import type { PresentationModelNodeLog, PresentationModelNodeState, PresentationModelMessageState, PresentationModelEdgeState, MapModelDataDetails } from "@/domain_layer/components/simulation/entity_presentation/models/PresentationModels";
import type { TypeErrorEv, TypeEvCreatedNodeLog, TypeEvCreatedNodeState, TypeEvUpdatedNodeState, TypeEvCreatedMessageState, TypeEvCreatedEdgeState, TypeEvUpdatedEdgeState } from "@/domain_layer/gateways/Events";
import { defineStore, storeToRefs } from "pinia";
import { UIEventGateway } from "../gateway/UIEventGateway";
import { WebMasterDomainWorker } from "../worker/WebMaster";

//* Types

export interface SelectedEntity {
    entityType: string,
    entityId: number
}

export interface SelectedEntityDetails {
    selected: SelectedEntity,
    details: MapModelDataDetails,
}


//* Store

export const usePiniaStore = defineStore("pinia-store", {

    //= Store Items
    state: () => ({
        //# ViewModels Entities
        storeNodeLogs: new IndexedStore<PresentationModelNodeLog>(),
        storeNodeStates: new IndexedStore<PresentationModelNodeState>(),
        storeMessageStates: new IndexedStore<PresentationModelMessageState>(),
        storeEdgeStates: new IndexedStore<PresentationModelEdgeState>(),

        //# Helpers
        selectedEntity: null as null | SelectedEntity,
    }),


    //= Computed Values = Getters
    getters: {

        //# Selected Entity
        detailsSelectedEntity(store): SelectedEntityDetails | null {
            if (store.selectedEntity !== null
                && store.selectedEntity.entityType === "MessageState") {
                return {
                    selected: store.selectedEntity,
                    details: store.storeMessageStates.read({
                        id: store.selectedEntity.entityId
                    }).dataDetails
                };
            }

            if (store.selectedEntity !== null
                && store.selectedEntity.entityType === "NodeState") {
                return {
                    selected: store.selectedEntity,
                    details: store.storeNodeStates.read({
                        id: store.selectedEntity.entityId
                    }).dataDetails
                }
            }

            if (store.selectedEntity !== null
                && store.selectedEntity.entityType === "EdgeState") {
                return {
                    selected: store.selectedEntity,
                    details: store.storeEdgeStates.read({
                        id: store.selectedEntity.entityId
                    }).dataDetails
                };
            }

            return null;
        }

    },


    //= Actions
    actions: {

    }
});