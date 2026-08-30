<script setup lang="ts">
defineProps<{
    id: string;
    type: string;
    receiverNode: string;
    destinationTime: string;
}>();
</script>

<template>
    <tr>
        <td>{{ id }}</td>
        <td>{{ type }}</td>
        <td>{{ receiverNode }}</td>
        <td>{{ destinationTime }}</td>
    </tr>
</template>

<style scoped>
tr {
    background-color: green;
    width: 100%;
    height: 100%;
}
</style>