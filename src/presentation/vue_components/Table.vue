<script setup lang="ts" generic="I extends Identifiable">

import { type Identifiable } from '@/common/EntityStores.js';
import TableRow from './TableRow.vue';

defineProps<{
    header: ReadonlyArray<string>,
    sortedStoreItems: ReadonlyArray<I>
    renderAsRow: (id: I) => ReadonlyArray<string>
}>();

</script>


<template>
    <div class="table">
        <TableRow class="table-header" 
            :cells="header"
        />

        <div class="table-body">
            <TableRow 
                v-for="item of sortedStoreItems" 
                :cells="renderAsRow(item)" 
            />
        </div>
    </div>
</template>


<style scoped>

.table {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
}

.table-body {
    overflow-y: scroll;
}

</style>