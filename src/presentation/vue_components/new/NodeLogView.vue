<script lang="ts" setup>
import { usePiniaStore } from '@/presentation/stores/PiniaStore';
import { storeToRefs } from 'pinia';
import TableRow from './TableRow.vue';

const piniastore = usePiniaStore();
const {storeNodeLogs} = storeToRefs(piniastore);

</script>


<template>
<div class="nodelog-view">

    <TableRow class="header" 
        :onClick="null"
        :cells="['ID Logger', 'Log Type', 'Log']"
    />
    
    <div class="body">
        <TableRow 
            v-for="model in storeNodeLogs.readAllValues()"
            :onClick="null"
            :cells="[model.idLogger, model.logType, model.log]"
        />
    </div>

</div>
</template>

<style scoped>

.nodelog-view {
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-rows: 40px minmax(0, 1fr);

    background: #FFFFFF;
    color: #0F172A;

    font-family: Inter, sans-serif;
}

.header {
    background: #F8FAFC;
    color: #475569;

    font-size: 12px;
    font-weight: 600;

    border-bottom: 1px solid #CBD5E1;
}

.body {
    min-height: 0;
    overflow-y: auto;
}

</style>