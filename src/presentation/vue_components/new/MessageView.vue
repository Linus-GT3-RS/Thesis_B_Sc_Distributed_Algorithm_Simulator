<script lang="ts" setup>
import { usePiniaStore } from '@/presentation/stores/PiniaStore';
import { storeToRefs } from 'pinia';
import TableRow from './TableRow.vue';

const piniastore = usePiniaStore();
const {storeMessageStates} = storeToRefs(piniastore);

</script>


<template>
<div class="message-view">

    <div class="body">
        <TableRow
            :onClick="null"
            :isHeader="true"
            :cells="['Sender ID', 'Type', 'Receiver ID', 'Send Time', 'Destination Time']"
        />

        <TableRow 
            v-for="model in storeMessageStates.readAllValues()"
            :key="model.id"
            :cells="[model.idSender, model.typePayload, model.idReceiver, model.sendTime, model.destinationTime]"
            :onClick="() => piniastore.selectedEntity = {entityType: 'MessageState', entityId: model.id}"
        />
    </div>
    
    <div class="footer">{{storeMessageStates.size()}} Messages</div>

</div>
</template>

<style scoped>

.message-view {
    height: 100%;
    width: 100%;
    min-height: 0;

    display: grid;
    grid-template-rows: minmax(0, 1fr) 30px;
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

:deep(.table-row .cell:nth-child(4)),
:deep(.table-row .cell:nth-child(5)) {
    flex: 1.35;
}

.footer {
    display: flex;
    align-items: center;
    padding: 0 13px;
    background: var(--panel-subtle);
    border-top: 1px solid var(--row-border);
    color: var(--text-muted);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
}
</style>