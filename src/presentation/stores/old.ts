import { IndexedStore, type Identifiable } from "@/common/EntityStores";
import { defineStore } from "pinia";
import { MessageViewModel, 2PresentationModelNodeLog, type EdgeViewModel, type NodeViewModel } from "../view_models/ViewModels";

// export interface SpeedSliderSettings {
//     min: number,
//     max: number,
//     stepsize: number,
//     currentValue: number,
//     metric: string,
// }

export const useStore = defineStore("store", {

    state: () => ({
    }),

    getters: {

        getSortedMessageViews(store): ReadonlyArray<MessageViewModel> {
            return Array
                .from(store.messageViewModels.readAllValues())
                .sort((l, r) => l.destinationTime - r.destinationTime);
        },

        buildTableRowMessageViewM(store) {
            return (target: Identifiable) => {
                const vm: MessageViewModel = this.messageViewModels.read(target);
                return [
                    `${vm.id}`, `${vm.type}`,
                    `${vm.destinationTime}`, `${vm.sendTime}`,
                    `${vm.sender}`, `${vm.receiver}`,
                ];
            };
        },

        getSortedNodeLogs(store): ReadonlyArray<2PresentationModelNodeLog> {
        return Array
            .from(store.nodeLogViewModels.readAllValues())
            .sort((l, r) => l.timestamp - r.timestamp);
    },

    buildTableRowNodeLogViewM(store) {
        return (target: Identifiable) => {
            const vm: 2PresentationModelNodeLog = this.nodeLogViewModels.read(target);
            return [
                `${vm.id}`, `${vm.logType}`, `${vm.timestamp}`,
                `${vm.node}`, `${vm.log}`
            ];
        };
    },


},

    actions: {

    changeLog() {
        this.nodeLogViewModels.interact({ id: 0 }).timestamp += 5;
    },
}

});