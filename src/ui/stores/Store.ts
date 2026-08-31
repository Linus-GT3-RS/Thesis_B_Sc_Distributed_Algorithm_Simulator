import { IndexedStore } from "@/common/EntityStores";
import { defineStore } from "pinia";
import { NodeLogViewModel, type EdgeViewModel, type MessageViewModel, type NodeViewModel } from "../view_models/ViewModels";


export const useStore = defineStore("store", {

    state: () => ({
        domainState: "undefined",
        simTime: 0,

        nodeLogVMStore: new IndexedStore<NodeLogViewModel>(),
        msgVMStore: new IndexedStore<MessageViewModel>(),
        nodeVMStore: new IndexedStore<NodeViewModel>(),
        edgeVMStore: new IndexedStore<EdgeViewModel>(),
    }),

    // getters: {
    //     buildTableRowFromNodeLogVm(store): ReadonlyArray<string> {
    //         const item = this.nodeLogVMStore.peek({ id: id });
    //         return [
    //             item.id.toString(), item.logType, item.timestamp.toString(),
    //             item.node.toString(), item.log
    //         ];
    //     }
    // },

    actions: {
        addNodeLogVM() {
            this.nodeLogVMStore.insert(new NodeLogViewModel(
                this.nodeLogVMStore.size(), "info", 0, 1, "monke"
            ));
        },

        changeFirst() {
            this.nodeLogVMStore.peek({ id: 1 }).node++;
        }
    }

});