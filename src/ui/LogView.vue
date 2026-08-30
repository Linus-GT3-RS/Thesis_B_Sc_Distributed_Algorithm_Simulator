<script setup lang="ts">
import { MessageState } from '@/domain/components/algorithm_plugins/api/entities/state_entities/Messages.js';
import LogRow from './LogRow.vue';
import { IndexedStore } from '@/common/EntityStores.js';

defineProps<{
    header: string[],
    rows: IndexedStore<MessageState>,
}>();

</script>

<template>
    <div class="log-view">
        <LogRow :columns="header" class="table-header" />

        <div class="table-body">
            <LogRow 
                v-for="item of rows.readAllValues()" 
                :columns="[
                    `${item.id}`,
                    `${item.data.type}`,
                    `${item.destinationTime}`,
                    `${item.receiverNode.id}`,
                ]" 
            />
        </div>
    </div>
</template>

<style scoped>

.log-view {
    width: 100%;
    height: 100%;
}

.table-header {
    font-weight: bold;
}

.table-body {
    height: 100%;
    overflow-y: scroll;
}

</style>