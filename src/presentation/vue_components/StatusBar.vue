<script setup lang="ts">

defineProps<{
    domainState: string,
    simulationTime: string
}>();

</script>

<template>
<div class="cont-status-bar">
    <div>
        App State: {{ domainState }}
    </div>

    <div>
        Simulation Time: {{ simulationTime }} ms
    </div>
</div>
</template>

<style scoped>

.cont-status-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-left: 20px;
    padding-right: 20px;

    font-size: small;
}

</style>