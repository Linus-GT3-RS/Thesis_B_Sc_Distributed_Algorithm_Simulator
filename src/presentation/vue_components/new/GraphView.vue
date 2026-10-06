<template>
<div class="graph-view">
    <div class="header">
        <div class="actions">
            <button class="primary" @click="onBtnLoadGraph">Load graph</button>
            <button @click="onBtnInit">Simulate initiation</button>
            <button @click="onBtnAdvance">Advance time <span class="shortcut">25 ms</span></button>
            <button class="debug" @click="testError">Test error</button>
        </div>
        
        <button class="focus-button" @click="panAndZoomToCenter">Focus center</button>
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
                    "background-color": "#705fd0",

                    "border-width": "2",
                    "border-color": "#a99bea",

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
                    "text-background-color": "#1b2738",
                    "text-background-opacity": 0.94,
                    "text-background-shape": "roundrectangle",
                    "text-background-padding": "4px",
                    "text-border-color": "#46536a",
                    "text-border-width": 1,
                    "text-border-opacity": 0.9,
                    "color": "#ffffff",
                    "font-family": "Inter",
                    "font-size": 10,
                }
            },
            {
                selector: "edge",
                style: {
                    "width": "2",

                    "line-style": "dashed",
                    "line-color": "#d5ad62",
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
                    "text-background-color": "#1b2738",
                    "text-background-opacity": 0.94,
                    "text-background-shape": "roundrectangle",
                    "text-background-padding": "4px",
                    "text-border-color": "#46536a",
                    "text-border-width": 1,
                    "text-border-opacity": 0.9,
                    "color": "#ffffff",
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
    height: 100%;
    width: 100%;
    min-width: 0;
    min-height: 0;
    display: grid;
    grid-template-rows: 54px minmax(0, 1fr) 36px;
    overflow: hidden;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 0 14px;
    background: #202c3e;
    border-bottom: 1px solid #334157;
}

.actions {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 8px;
}

.header button {
    min-height: 32px;
    padding: 0 11px;
    background: #29374c;
    color: #d2dbea;
    border: 1px solid #40516b;
    border-radius: 7px;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
}

.header button:hover {
    background: #34445c;
    border-color: #5b6f8e;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
}

.header button:active {
    transform: translateY(1px);
}

.header button:focus-visible {
    outline: 3px solid rgba(115, 156, 240, 0.45);
    outline-offset: 2px;
}

.header button.primary {
    background: #3769c8;
    border-color: #3769c8;
    color: #fff;
    box-shadow: 0 2px 6px rgba(55, 105, 200, 0.22);
}

.header button.primary:hover {
    background: #2e5db6;
    border-color: #2e5db6;
}

.header button.debug {
    color: #f0a9b2;
}

.shortcut {
    margin-left: 3px;
    color: #a9bad3;
    font-variant-numeric: tabular-nums;
}

.focus-button {
    flex: 0 0 auto;
}

.body {
    min-width: 0;
    min-height: 0;
    background: #111827;
    padding: 9px;
}

#cont-cytoscape {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #2b374a;
    border-radius: 8px;
    background: #111827;
}

.footer {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 15px;
    background: #202c3e;
    border-top: 1px solid #334157;
    color: #a9bad3;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 11px;
    font-variant-numeric: tabular-nums;
}

</style>