<script setup lang="ts">

defineProps<{
    cells: ReadonlyArray<string>,
}>();


</script>

<template>
    <div class="table-row">
        <div class="cell" v-for="item in cells">
            {{ item }}
        </div>
    </div>
</template>

<style scoped>

.table-row {
    display: flex;
    flex-direction: row;
    gap: 10px;

    border-width: 1px;
    border-style: solid;
    border-color: black;
}

.cell {
    flex: 1;
}

</style>