<script setup lang="ts">

defineProps<{
    columns: string[],
}>();


</script>

<template>
    <div class="log-row">
        <div class="log-row-col" v-for="item in columns">
            {{ item }}
        </div>
    </div>
</template>

<style scoped>

.log-row {
    display: flex;
    flex-direction: row;
    gap: 10px;

    border-width: 1px;
    border-style: solid;
    border-color: black;
}

.log-row-col {
    flex: 1;

}

</style>