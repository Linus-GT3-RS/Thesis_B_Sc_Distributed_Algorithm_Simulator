<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { useStore } from '../stores/Store';
import { storeToRefs } from 'pinia';
import Table from '../vue_components/Table.vue';
import StatusBar from '../vue_components/StatusBar.vue';
import TitleBar from '../vue_components/TitleBar.vue';
import DetailWidget from '../vue_components/DetailWidget.vue';

const store = useStore();
const {
    getSortedMessageViews, buildTableRowMessageViewM,
    getSortedNodeLogs, buildTableRowNodeLogViewM,
    domainState, renderedSimulationTime,
} = storeToRefs(store);

function btn(): void {
    store.changeStatusBar(4);
}

</script>



<template>
<div class="cont-app">

    <div class="cont-header">
        <button @click="store.addMessage">insert msg</button>
        <button @click="store.changeMessage">change msg 1</button>

        <button @click="store.addNodeLogVM">add node log</button>
        <button @click="store.changeLog">change node log</button>

        <button @click="btn">change status bar</button>
    </div>

    <Splitpanes vertical>
        <Pane size="75">
            <Splitpanes horizontal>

                <Pane class="cont-graph-view" size="80">
                    <div class="graph-view"></div>
                    <StatusBar class="status-bar" 
                        :domainState="domainState"
                        :simulationTime="renderedSimulationTime">
                    </StatusBar>
                </Pane>

                <Pane class="cont-nodelog-table" size="20">
                    <TitleBar :title="'Node Log Overview'"></TitleBar>
                    <Table
                        :header="['Id', 'Log Type', 'Timestamp', 'Node', 'Log']"
                        :sortedStoreItems="getSortedNodeLogs"
                        :renderAsRow="buildTableRowNodeLogViewM"
                    />
                </Pane>
                
            </Splitpanes>
        </Pane>

        <Pane class="right" size="25">
            <Splitpanes horizontal>

                <Pane class="cont-message-table" size="65">
                    <TitleBar :title="'Message Overview'"></TitleBar>
                    <Table 
                        :header="['id', 'type', 'destTime', 'sendTime', 'sender', 'receiver']"
                        :sortedStoreItems="getSortedMessageViews"
                        :renderAsRow="buildTableRowMessageViewM" 
                    />
                </Pane>

                <Pane class="cont-property-view"  size="35">
                    <TitleBar :title="'Detail View'"></TitleBar>
                    <DetailWidget class="detail-view"></DetailWidget>
                </Pane>

            </Splitpanes>
        </Pane>

    </Splitpanes>
</div>
</template>



<style scoped>

:deep(.splitpanes--vertical > .splitpanes__splitter) {
    width: 8px;
}

:deep(.splitpanes--horizontal > .splitpanes__splitter) {
    height: 8px;
}

.cont-app {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: start;
}

.cont-header{
    max-height: 9%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    gap: 25px;

    padding: 10px;

    background-color: rgb(55, 55, 55);
}

.cont-right {
    display: flex;
    flex-direction: column;
}

.cont-graph-view {
    height: 100%;
    width: 100%;
    
    display: flex;
    flex-direction: column;
}

.graph-view {
   flex: 1;
    background-color: aqua;
}

.status-bar {
    height: 3.5%;
    background-color:  grey;
}


.cont-nodelog-table {
    height: 100%;
    width: 100%;
    
    padding: 5px;

    background-color: lawngreen;
}

.cont-message-table {
    height: 100%;
    width: 100%;

    padding: 5px;
    
    background-color: yellow;
}

.cont-property-view {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    background-color: chocolate;
}

.detail-view {
    height: 100%;
    width: 100%;
}


</style>