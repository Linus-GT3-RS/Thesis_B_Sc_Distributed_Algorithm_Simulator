<script setup lang="ts" generic="I extends Identifiable">

import { MessageState } from '@/domain/components/algorithm_plugins/api/entities/state_entities/Messages.js';
import { IndexedStore, type Identifiable, type ReadonlyIndexedStore, type RoStoreAccessor as RoAccessor } from '@/common/EntityStores.js';
import type { MessageViewMStore } from '../view_models/ViewModels.ts';
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
}

.table-header {
    height: 4%;
    font-weight: bold;
}

.table-body {
    height: 96%;
    overflow-y: scroll;
}

</style>