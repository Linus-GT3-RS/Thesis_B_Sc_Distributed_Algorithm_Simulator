<template>
<div class="graph-view">
    <div class="header">
        <button @click="onBtnLoadGraph">Load Graph</button>
        <button @click="onBtnInit">Simulate Initiation</button>
        <button @click="onBtnAdvance">Advance Time 25ms</button>
        <button @click="testError">Test Error</button>
        
        <button @click="panAndZoomToCenter">Focus Center</button>
    </div>
    
    <div class="body">
        <div id="cont-cytoscape"/>
    </div>

    <div class="footer">
        <span>Number of Nodes: {{ piniaStore.storeNodeStates.size()}}</span>
        <span>Number of Edges: {{ piniaStore.storeEdgeStates.size() }}</span>
    </div>
</div>
</template>


<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import cytoscape from 'cytoscape';
import { usePiniaStore } from '@/presentation/stores/PiniaStore';
import { storeToRefs } from 'pinia';
import type { TypeErrorEv, TypeEvCreatedNodeLog, TypeEvCreatedNodeState, TypeEvUpdatedNodeState, TypeEvCreatedMessageState, TypeEvCreatedEdgeState, TypeEvUpdatedEdgeState } from '@/domain_layer/gateways/Events';
import { UIEventGateway } from '@/presentation/gateway/UIEventGateway';
import { WebMasterDomainWorker } from '@/presentation/worker/WebMaster';
import type { IndexedStore } from '@/common/EntityStores';
import type { PresentationModelEdgeState, PresentationModelNodeState } from '@/domain_layer/components/simulation/entity_presentation/models/PresentationModels';

//* Refs
const piniaStore = usePiniaStore();
const {
    storeNodeLogs, storeMessageStates,
    storeNodeStates, storeEdgeStates,
} = storeToRefs(piniaStore);

const uiEventGateway = new UIEventGateway(
    (ev: TypeErrorEv) => {
        confirm("Received Error Event: ");
        console.log("Received Error Event: ", ev.error);
    },
    (ev: TypeEvCreatedNodeLog) => {
        storeNodeLogs.value.insert(ev.model);
    },
    (ev: TypeEvCreatedNodeState) => {
        storeNodeStates.value.insert(ev.model);
    },
    (ev: TypeEvUpdatedNodeState) => {
        storeNodeStates.value.update(ev.updated);
    },
    (ev: TypeEvCreatedMessageState) => {
        storeMessageStates.value.insert(ev.model);
    },
    (ev: TypeEvCreatedEdgeState) => {
        storeEdgeStates.value.insert(ev.model);
    },
    (ev: TypeEvUpdatedEdgeState) => {
        storeEdgeStates.value.update(ev.updated);
    },
);

const masterDomainWorker =
    new WebMasterDomainWorker(uiEventGateway);

function onBtnLoadGraph(): void {
    masterDomainWorker.sendToDomainCmdGateway({
        type: "CmdLoadGraph",
        command: {graphId: 1}
    });
}

function onBtnInit(): void {
    if(piniaStore.selectedEntity !== null 
        && piniaStore.selectedEntity.entityType === "NodeState") {
        masterDomainWorker.sendToDomainCmdGateway({
            type: "CmdSimulateAlgoInit",
            command: { initiator:  piniaStore.selectedEntity.entityId}
        });
    }
    else {
        alert("Select a Node before trying to simulate an initiation");
    }
}

function onBtnAdvance(): void {
    masterDomainWorker.sendToDomainCmdGateway({
        type: "CmdSimulateTimeAdvance",
        command: { delta: 25 }
    });
}

function testError(){
    masterDomainWorker.sendToDomainCmdGateway("hi this is me");
}


//* Cytoscape Graph Variable
// NOTE: only useable after onMounted was called
let cytoscapeGraph: cytoscape.Core;

// NOTE: only useable after onMounted was called
let panAndZoomToCenter: () => void;
let renderNodes: (states: IndexedStore<PresentationModelNodeState>) => void;
let renderEdges: (states: IndexedStore<PresentationModelEdgeState>) => void;

onMounted(() => {

    //* Create Cytoscape Graph once the
    //* div-container for it is created.
    //* (only then cytoscape can take control about it)
    cytoscapeGraph = cytoscape({

        //= Specify container
        container: document.getElementById('cont-cytoscape'),

        //= Set no Graph Entites at init
        elements: {
            nodes: [
                // {data:{id: "1"}}, {data:{id: "2"}}
            ],
            edges: [
                // {data:{id: "3", source: "1", target: "2"}}
            ]
        },
        
        //= Set default entity Styles
        // Note:
        // An Entity can have its own style rules to override the default values
        //
        // Links:
        // styles node: https://js.cytoscape.org/#style/node-body
        // styles edge: https://js.cytoscape.org/#style/edge-line
        // labels: https://js.cytoscape.org/#style/labels
        style: [
            {
                selector: "node",
                style: {
                    "shape": "ellipse",
                    "background-color": "#B4DBF9",

                    "border-width": "2",
                    "border-color": "#4D9CD1",

                    // shadow
                    'ghost': 'yes',
                    'ghost-opacity': 0.05,
                    'ghost-offset-x': 1.5,
                    'ghost-offset-y': 1.5,

                    // the data json of a node must contain this property
                    // in order for it to have a label
                    "label": "data(labels)", 

                    "text-wrap": "wrap",
                    "text-valign": "center",
                    "text-halign": "right",
                    "text-margin-x": 5,
                    "color": "#1F2937",
                    "font-family": "Inter",
                    "font-size": 10,
                }
            },
            {
                selector: "edge",
                style: {
                    "width": "2",

                    "line-style": "dashed",
                    "line-color": "#FFE9AD",
                    "line-dash-pattern": [4, 2],

                    // shadow
                    "ghost": 'yes',
                    'ghost-opacity': 0.15,
                    'ghost-offset-x': 0.75,
                    'ghost-offset-y': 0.75,

                    // the data json of an edge must contain this property
                    // in order for it to have a label
                    'label': 'data(labels)',

                    "text-wrap": "wrap",
                    "text-justification": "center",
                    "text-margin-x": 15,
                    "color": "#1F2937",
                    "font-family": "Inter",
                    "font-size": 7.5,
                }
            }
        ],

        //= Set layout of graph
        layout: {
            name: 'grid',
            fit: true,
            nodeDimensionsIncludeLabels: true,
            condense: true,
            avoidOverlap: true,
            spacingFactor: 3,
        },

    });


    //* Handler for Cytoscape Events

    //= Node is tapped
    cytoscapeGraph.on("tap", "node", (event) => {
        piniaStore.selectedEntity = {
            entityType: "NodeState",
            entityId: Number(event.target.id()),
        };
    });

    //= Edge is tapped
    cytoscapeGraph.on("tap", "edge", (event) => {
        piniaStore.selectedEntity = {
            entityType: "EdgeState",
            entityId: Number(String(event.target.id()).replace("e", "")),
        };
    });


    //* Setters

    //= Set Zoom and Panning to Center of Graph
    panAndZoomToCenter = () => {
        cytoscapeGraph.fit(undefined, 50);
    }

    renderNodes = (states: IndexedStore<PresentationModelNodeState>) => {
        cytoscapeGraph.remove("nodes");
        for(const model of states.readAllValues()) {
            let details: string = `id:${model.id}\n`;
            for(const detail of model.dataDetails.values()) {
                details += `${detail}\n`;
            }

            cytoscapeGraph.add({
                group: "nodes",
                data: {
                    id: model.id.toString(),
                    labels: details,
                }
            })
        }
        
        cytoscapeGraph.layout({
            name: "grid",
            nodeDimensionsIncludeLabels: true,
            condense: true,
            spacingFactor: 3,
            rows: 3,
            cols: 4,
        }).run();
    }


    renderEdges = (states: IndexedStore<PresentationModelEdgeState>) => {
        cytoscapeGraph.remove("edges");
        for(const model of states.readAllValues()) {
            const labels: string = `${model.idNodeA}-${model.idNodeB}\n${model.length_ms}`;

            cytoscapeGraph.add({
                group: "edges",
                data: {
                    id: `e${model.id}`,
                    source: model.idNodeA.toString(),
                    target: model.idNodeB.toString(),
                    labels: labels,
                },
            })
        }
    }

});

watch(storeNodeStates.value, () => {
    renderNodes(storeNodeStates.value);
    panAndZoomToCenter();
});

watch(storeEdgeStates.value, () => {
    renderEdges(storeEdgeStates.value);
    panAndZoomToCenter();
});

onUnmounted(() => {
    cytoscapeGraph.destroy();
});


</script>


<style scoped>

.graph-view {
    display: grid;
    grid-template-rows: 7.5% 1fr;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
     gap: 12px;

    background: #FFFFFF;
    border-bottom: 1px solid #E2E8F0;

    padding: 0 20px;
}

.header button {
    padding: 7px 14px;

    background: #FFFFFF;
    color: #334155;

    border: 1px solid #CBD5E1;
    border-radius: 6px;

    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: 500;

    cursor: pointer;
}

.header button:hover {
    background: #F8FAFC;
    border-color: #94A3B8;
}

.header button:active {
    background: #F1F5F9;
}

.body {
    background: #F8FAFC;
    padding: 12px;
}

#cont-cytoscape {
    height: 100%;
    width: 100%;
        box-sizing: border-box;


      border: 1px solid #E2E8F0;
    border-radius: 8px;
}

.footer {
    display: flex;
    align-items: center;
    gap: 20px;

    padding: 0 16px;

    background: #FFFFFF;
    border-top: 1px solid #E2E8F0;

    color: #64748B;

    font-family: Inter, sans-serif;
    font-size: 12px;
}

</style>