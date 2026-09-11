<script setup lang="ts">

defineProps<{
    cells: ReadonlyArray<string | number>,
    onClick: null | (() => void),
}>();


</script>

<template>

<button v-if="onClick !== null" class="table-row" @click="onClick">
    <div class="cell" v-for="item in cells">
        {{ item }}
    </div>
</button>


<div v-else class="table-row">
    <div class="cell" v-for="item in cells">
        {{ item }}
    </div>
</div>

</template>

<style scoped>

.table-row {
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 10px;
    
    padding: 9px 12px;

    background: #FFFFFF;

    border: none;
    border-bottom: 1px solid #E2E8F0;

    color: #334155;

    font-family: Inter, sans-serif;
    font-size: 13px;
    text-align: left;

    box-sizing: border-box;
}

button.table-row {
    cursor: pointer;
}

button.table-row:hover {
    background: #F8FAFC;
}

button.table-row:active {
    background: #F1F5F9;
}

.cell {
    flex: 1;

    min-width: 0;

    line-height: 1.4;
}

</style>