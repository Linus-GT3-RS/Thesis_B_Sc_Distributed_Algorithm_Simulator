<script setup lang="ts">

defineProps<{
    cells: ReadonlyArray<string>,
}>();


</script>

<template>
    <button class="table-row">
        <div class="cell" v-for="item in cells">
            {{ item }}
        </div>
    </button>
</template>

<style scoped>

.table-row {
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 10px;
    
    border-top: 1px;
    border-bottom: 1px;
    border-top-style: solid;
    border-bottom-style: solid;
    border-color: black;
}

.cell {
    flex: 1;
}

</style>