<script setup lang="ts">

defineProps<{
    cells: ReadonlyArray<string | number>,
    onClick: null | (() => void),
    isHeader?: boolean,
}>();


</script>

<template>

<div v-if="isHeader" class="table-row table-row--header">
    <div class="cell" v-for="(item, index) in cells" :key="index">
        {{ item }}
    </div>
</div>

<button v-else-if="onClick !== null" class="table-row" @click="onClick">
    <div class="cell" v-for="(item, index) in cells" :key="index">
        {{ item }}
    </div>
</button>

<div v-else class="table-row">
    <div class="cell" v-for="(item, index) in cells" :key="index">
        {{ item }}
    </div>
</div>

</template>

<style scoped>

.table-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 8px 12px;
    background: var(--panel-background);
    border: none;
    border-bottom: 1px solid var(--row-border);
    color: #d2dbea;
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 12px;
    text-align: left;
    box-sizing: border-box;
}

.table-row--header {
    position: sticky;
    top: 0;
    z-index: 1;
    min-height: 34px;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;
    background: var(--panel-subtle);
    border-bottom: 1px solid var(--panel-border);
    color: var(--text-secondary);
    font-size: 10px;
    font-weight: 650;
    letter-spacing: 0.045em;
    text-transform: uppercase;
}

button.table-row {
    cursor: pointer;
    transition: background 100ms ease;
}

button.table-row:hover {
    background: #223148;
}

button.table-row:active {
    background: #293a54;
}

button.table-row:focus-visible {
    position: relative;
    z-index: 1;
    outline: 2px solid #9ab6ff;
    outline-offset: -2px;
}

.cell {
    flex: 1;
    min-width: 0;
    line-height: 1.4;
    overflow-wrap: anywhere;
}

</style>