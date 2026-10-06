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
    <Splitpanes vertical>
        <Pane size="75">
            <Splitpanes horizontal>
                <Pane class="cont-graph-view" size="75">
                    <GraphView class="graph-view">
                    </GraphView>
                </Pane>

                <Pane>
                    <Splitpanes vertical>
                        <Pane class="cont-nodelog-table" size="60">
                            <TitleBar title="Node Logs"></TitleBar>
                            <NodeLogView></NodeLogView>
                        </Pane>

                        <Pane class="cont-property-view">
                            <DetailView></DetailView>
                        </Pane>
                    </Splitpanes>
                </Pane>                
            </Splitpanes>
        </Pane>

        <Pane class="cont-message-table" size="25">
            <TitleBar title="Messages"></TitleBar>
            <MessageView></MessageView>
        </Pane>

    </Splitpanes>
</div>
</template>



<style scoped>

:deep(.splitpanes) {
    min-width: 0;
    min-height: 0;
}

:deep(.splitpanes--vertical > .splitpanes__splitter) {
    width: 12px;
    background: transparent;
}

:deep(.splitpanes--horizontal > .splitpanes__splitter) {
    height: 12px;
    background: transparent;
}

:deep(.splitpanes__splitter:hover) {
    background: #34435a;
}

.cont-app {
    height: 100%;
    width: 100%;
    min-height: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 12px;
    background: var(--app-background);
    color: var(--text-primary);
}

.cont-graph-view {
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--panel-border);
    border-radius: 12px;
    background: var(--panel-background);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12);
}

.graph-view {
    height: 100%;
    width: 100%;
    background: var(--panel-background);
}

.cont-nodelog-table {
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--panel-border);
    border-radius: 12px;
    background: var(--panel-background);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12);
}

.cont-message-table {
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--panel-border);
    border-radius: 12px;
    background: var(--panel-background);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12);
}

.cont-property-view {
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--panel-border);
    border-radius: 12px;
    background: var(--panel-background);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12);
}

</style>