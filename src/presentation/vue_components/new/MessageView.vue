<script lang="ts" setup>
import { usePiniaStore } from '@/presentation/stores/PiniaStore';
import { storeToRefs } from 'pinia';
import TableRow from './TableRow.vue';

const piniastore = usePiniaStore();
const {storeMessageStates} = storeToRefs(piniastore);

</script>


<template>
<div class="message-view">
    
    <TableRow
        :onClick="null"
        :isHeader="true"
        :cells="['Sender ID', 'Type', 'Receiver ID', 'Send Time', 'Destination Time']"
    />
    
    <div class="body">
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
    grid-template-rows: 32px minmax(0, 1fr) 30px;
    background: var(--panel-background);
    color: var(--text-primary);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}

.body {
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #455570 transparent;
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