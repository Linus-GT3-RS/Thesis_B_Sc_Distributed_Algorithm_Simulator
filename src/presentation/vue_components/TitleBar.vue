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
    height: 36px;
    width: 100%;

    display: flex;
    align-items: center;

    padding: 0 12px;

    background: #F1F5F9;
    border-bottom: 1px solid #CBD5E1;

    color: #334155;

    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.01em;

    box-sizing: border-box;
}

</style>