<script setup lang="ts">
import TableRow from './TableRow.vue';

defineProps<{

}>();

</script>

<template>
    <div class="detail-view">
        <TableRow
            v-for="value of [['key1', 'val1'], ['key2', 'val2']]"
            :cells="value"
        >
        </TableRow>
    </div>
</template>

<style scoped>

.detail-view {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
}

</style>