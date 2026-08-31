<script setup>
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

</script>

<template>
<div class="cont-app">

    <div class="cont-header">
    </div>

    <Splitpanes vertical>

        <Pane size="75">
            <Splitpanes horizontal>

                <Pane class="cont-graph-view" size="80">
                </Pane>

                <Pane class="cont-nodelog-table" size="20">
                </Pane>
                
            </Splitpanes>
        </Pane>

        <Pane class="right" size="25">
            <Splitpanes horizontal>

                <Pane class="cont-message-table" size="65">
                </Pane>

                <Pane class="cont-property-view"  size="35">
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
    box-sizing: border-box;

    height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
}

.cont-header{
    height: 10%;
    width: 100%;

    background-color: grey;
}

.cont-right {
    display: flex;
    flex-direction: column;
}

.cont-graph-view {
    height: 100%;
    width: 100%;
    background-color: aqua;
}

.cont-nodelog-table {
    height: 100%;
    width: 100%;
    background-color: lawngreen;
}

.cont-message-table {
    height: 100%;
    width: 100%;
    background-color: yellow;
}

.cont-property-view {
    height: 100%;
    width: 100%;
    background-color: chocolate;
}


</style>