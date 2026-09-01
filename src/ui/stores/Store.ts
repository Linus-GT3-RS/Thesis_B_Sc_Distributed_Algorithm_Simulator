import { IndexedStore, type Identifiable } from "@/common/EntityStores";
import { defineStore } from "pinia";
import { MessageViewModel, NodeLogViewModel, type EdgeViewModel, type NodeLogViewMStore, type NodeViewModel } from "../view_models/ViewModels";


export const useStore = defineStore("store", {

    state: () => ({
        nodeLogViewModels: new IndexedStore<NodeLogViewModel>(),
        messageViewModels: new IndexedStore<MessageViewModel>(),
        nodeViewModels: new IndexedStore<NodeViewModel>(),
        edgeViewModels: new IndexedStore<EdgeViewModel>(),

        // domainState: "undefined",
        // simTime: 0,
    }),

    getters: {
        buildTableRowNodeLogViewM(store) {
            return (target: Identifiable) => {
                const vm: NodeLogViewModel = this.nodeLogViewModels.read(target);
                return [
                    `${vm.id}`, `${vm.logType}`, `${vm.timestamp}`,
                    `${vm.node}`, `${vm.log}`
                ];
            };
        },

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
        }
    },

    actions: {
        addNodeLogVM() {
            this.nodeLogViewModels.insert(new NodeLogViewModel(
                this.nodeLogViewModels.size(), "info", 0, 1, "monke"
            ));
        },

        changeElem() {
            this.nodeLogViewModels.peek({ id: 0 }).node++;
        },

        removeAll() {
            this.nodeLogViewModels = new IndexedStore<NodeLogViewModel>();
        },

        addMessage() {
            this.messageViewModels.insert(new MessageViewModel(
                this.messageViewModels.size(), "type x",
                this.messageViewModels.size(), 10, 2, 4
            ));
        },

        changeMessage() {
            this.messageViewModels.peek({ id: 1 }).destinationTime += 5;
        },
    }

});