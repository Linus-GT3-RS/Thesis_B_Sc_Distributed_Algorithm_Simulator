<script lang="ts" setup>
import { usePiniaStore } from '@/presentation/stores/PiniaStore';
import { storeToRefs } from 'pinia';
import TableRow from './TableRow.vue';

const piniastore = usePiniaStore();
const {storeMessageStates} = storeToRefs(piniastore);

</script>


<template>
<div class="message-view">
    
    <TableRow class="header" 
        :onClick="null"
        :cells="['Sender ID', 'Type', 'Receiver ID', 'Send Time', 'Destination Time']"
    />
    
    <div class="body">
        <TableRow 
            v-for="model in storeMessageStates.readAllValues()"
            :cells="[model.idSender, model.typePayload, model.idReceiver, model.sendTime, model.destinationTime]"
            :onClick="() => piniastore.selectedEntity = {entityType: 'MessageState', entityId: model.id}"
        />
    </div>
    
    <div class="footer">{{storeMessageStates.size()}} Messages</div>

</div>
</template>

<style scoped>

.header {
     background: #F8FAFC;
    border-bottom: 1px solid #CBD5E1;
}

.message-view {
    height: 100%;
    width: 100%;
    min-height: 0;

    display: grid;
    grid-template-rows: 40px minmax(0, 1fr) 32px;
    background: #FFFFFF;
    color: #0F172A;

    font-family: Inter, sans-serif;
}


.body {
     min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #CBD5E1 transparent;
}

.footer {
    padding: 0 12px;

    background: #F8FAFC;
    border-top: 1px solid #E2E8F0;

    color: #64748B;

    font-size: 12px;
}
</style>