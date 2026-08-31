<script setup lang="ts" generic="I extends Identifiable">

import { MessageState } from '@/domain/components/algorithm_plugins/api/entities/state_entities/Messages.js';
import { IndexedStore, type Identifiable, type ReadonlyIndexedStore, type RoStoreAccessor as RoAccessor } from '@/common/EntityStores.js';
import type { MessageViewMStore } from './view_models/ViewModels';
import TableRow from './TableRow.vue';

defineProps<{
    header: ReadonlyArray<string>,
    store: RoAccessor<IndexedStore<I>>,
    buildRowFromStoreItem: (id: I) => ReadonlyArray<string>
}>();

</script>


<template>
    <div class="table">
        <TableRow class="table-header" 
            :cells="header"
        />

        <div class="table-body">
            <TableRow 
                v-for="item of store.readAllValues()" 
                :cells="buildRowFromStoreItem(item)" 
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
    font-weight: bold;
}

.table-body {
    height: 100%;
    overflow-y: scroll;
}

</style>