<script setup lang="ts">

defineProps<{
    title: string,
}>();

</script>

<template>
<div class="title-bar">
    {{ title }}    
</div>
</template>

<style scoped>

.title-bar {
    height: 30px;
    width: 100%;
    flex: 0 0 30px;
    display: flex;
    align-items: center;
    padding: 0 13px;
    background: var(--panel-background);
    border-bottom: 1px solid var(--row-border);
    color: var(--text-primary);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 12px;
    font-weight: 650;
    letter-spacing: 0.01em;
    box-sizing: border-box;
}

</style>