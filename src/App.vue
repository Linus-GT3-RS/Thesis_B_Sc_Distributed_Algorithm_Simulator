<template>
 <div class="app">
        <div class="header">
            <button @click="onInit">Init Node with id 0</button>
            <button @click="onStep">Do Simulation Step of 25ms</button>

            SimulationTime is: {{ refSnapshot.simulationTimestamp }}
        </div>

        <div class="main">
            <div ref="container" class="graph"/>

            <LogView class="message-log" 
                :header="['id', 'type', 'destinationTime', 'receiver']" 
                :rows="refSnapshot.msgStates"" 
            />
        </div>
    </div>
</template>

<style scoped>
.app {
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
    
    display: flex;
    flex-direction: column;

    padding: 20px;
}

.header {
    height: 10%;
}

.main {
    flex: 1;

    display: flex;
    flex-direction: row;
}

.graph {
    flex: 3;
}

.message-log {
    flex: 1;
    height: 50%;
}

/* .my-table {
    flex: 1;
    height: 100%;
} */


</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import cytoscape, { type Core } from "cytoscape";
import MessageTable from "./MessageTable.vue";
import { engine, refSnapshot } from "./config.ts";
import LogView from "./ui/LogView.vue";

// // const refMsgs = ref(new Array<MessageTableData>);

function btn1(): void {
  console.log(engine);
}

function btn2(): void {
  console.log(refSnapshot);
}



//* cyto
const container = ref<HTMLDivElement | null>(null);
let cy: cytoscape.Core;
onMounted(() => {
    cy = cytoscape({
        container: container.value!,
        elements: [
            {
                data: {
                    id: "0",
                    label: "0",
                }
            },
            {
                data: {
                    id: "1",
                    label: "1"
                }
            },
            {
                data: {
                    id: "2",
                    label: "2"
                }
            },
            {
                data: {
                    id: "3",
                    label: "3"
                }
            },
            


            {
                data: {
                    id: "0-1",
                    source: "0",
                    target: "1",
                    label: refSnapshot.value.edgeStates.peek({id: 0}).length_ms
                }
            },
            {
                data: {
                    id: "0-2",
                    source: "0",
                    target: "2",
                    label: refSnapshot.value.edgeStates.peek({id: 1}).length_ms
                }
            },{
                data: {
                    id: "2-3",
                    source: "2",
                    target: "3",
                    label: refSnapshot.value.edgeStates.peek({id: 2}).length_ms
                }
            },
            {
                data: {
                    id: "1-3",
                    source: "1",
                    target: "3",
                    label: refSnapshot.value.edgeStates.peek({id: 3}).length_ms
                }
            },
        ],

        style: [
            {
                selector: "node",
                style: {
                    label: "data(label)"
                }
            },
             {
                selector: "edge",
                style: {
                    label: "data(label)"
                }
            }
        ]
    });


watch(refSnapshot.value.nodeStates, (newValue) => {
    for(const state of newValue.readAllValues()){

        if(state.isInformed) {
            cy.getElementById(state.id.toString()).style(
                "background-color", "green"
            );
        }

        cy.getElementById(state.id.toString()).data(
            "label", "id="+state.id + " infNeighbors="+state.numberInformedNeighbors + " isInfromed="+state.isInformed
        )


    }
});


    cy.layout({
        name: "grid"
    }).run();




});


function onInit(): void {
    engine.handleInitiation(0);
}

function onStep(): void {
    refSnapshot.value.simulationTimestamp += 25;
    engine.handlePendingMessages();
}


</script>