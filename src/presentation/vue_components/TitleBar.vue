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

.title-bar{
    font-size: large;
}

</style>