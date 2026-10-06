<script lang="ts" setup>
import { usePiniaStore } from '@/presentation/stores/PiniaStore';
import { storeToRefs } from 'pinia';
import TableRow from './TableRow.vue';

const piniastore = usePiniaStore();
const {storeNodeLogs} = storeToRefs(piniastore);

</script>


<template>
<div class="nodelog-view">

    <div class="body">
        <TableRow
            :onClick="null"
            :isHeader="true"
            :cells="['ID Logger', 'Log Type', 'Log']"
        />

        <TableRow 
            v-for="model in storeNodeLogs.readAllValues()"
            :key="model.id"
            :onClick="null"
            :cells="[model.idLogger, model.logType, model.log]"
        />
    </div>

</div>
</template>

<style scoped>

.nodelog-view {
    height: 0;
    width: 100%;
    flex: 1 1 auto;
    min-height: 0;

    display: grid;
    grid-template-rows: minmax(0, 1fr);
    background: var(--panel-background);
    color: var(--text-primary);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}

.body {
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #455570 var(--panel-background);
}

.body::-webkit-scrollbar {
    width: 10px;
}

.body::-webkit-scrollbar-track {
    background: var(--panel-background);
}

.body::-webkit-scrollbar-thumb {
    background: #455570;
    border: 2px solid var(--panel-background);
    border-radius: 5px;
}

.body::-webkit-scrollbar-thumb:hover {
    background: #60728e;
}

:deep(.body .table-row:nth-child(even)) {
    background: #1b2738;
}

:deep(.table-row .cell:last-child) {
    flex: 2;
}

</style>