<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import TitleBar from '../vue_components/TitleBar.vue';
import NodeLogView from '../vue_components/new/NodeLogView.vue';
import MessageView from '../vue_components/new/MessageView.vue';
import DetailView from '../vue_components/new/DetailView.vue';
import GraphView from '../vue_components/new/GraphView.vue';

</script>



<template>
<div class="cont-app">

    <div class="cont-header">
    </div>

    <Splitpanes vertical>
        <Pane size="75">
            <Splitpanes horizontal>

                <Pane class="cont-graph-view" size="80">
                    <GraphView class="graph-view">
                    </GraphView>
                </Pane>

                <Pane class="cont-nodelog-table">
                    <TitleBar :title="'Node Log Overview'"></TitleBar>
                    <NodeLogView></NodeLogView>
                </Pane>
                
            </Splitpanes>
        </Pane>

        <Pane class="right" size="25">
            <Splitpanes horizontal>

                <Pane class="cont-message-table" min-size="0" size="70">
                    <TitleBar :title="'Message Overview'"></TitleBar>
                    <MessageView></MessageView>
                </Pane>

                <Pane class="cont-property-view">
                    <TitleBar :title="'Detail View'"></TitleBar>
                    <DetailView></DetailView>
                </Pane>                

            </Splitpanes>
        </Pane>

    </Splitpanes>
</div>
</template>



<style scoped>

:deep(.splitpanes--vertical > .splitpanes__splitter) {
    width: 8px;
        background: #F1F5F9;
}

:deep(.splitpanes--horizontal > .splitpanes__splitter) {
    height: 8px;
        background: #F1F5F9;
}

.cont-app {
    height: 100%;
    width: 100%;
    min-height: 0;

    display: flex;
    flex-direction: column;

         background: #F1F5F9;
    color: #0F172A;
}

.cont-header {
    height: 25px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;

    padding: 10px 16px;

    background: #FFFFFF;
    border-bottom: 1px solid #E2E8F0;
}

.cont-graph-view {
    height: 100%;
    width: 100%;
        min-height: 0;
    
    display: flex;
    flex-direction: column;
        background-color: #FFFFFF;


}

.graph-view {
   flex: 1;
       background-color: #FFFFFF;
}


.cont-nodelog-table {
    height: 100%;
    width: 100%;
    
    padding: 5px;

        background: #FFFFFF;
}

.cont-message-table {
    height: 100%;
    width: 100%;

     display: flex;
    flex-direction: column;
      min-height: 0;
    min-width: 0;

    
        background: #FFFFFF;
}

.cont-property-view {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

        background: #FFFFFF;
}

.detail-view {
    height: 100%;
    width: 100%;
}

</style>