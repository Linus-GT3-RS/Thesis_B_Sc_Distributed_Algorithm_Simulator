<script setup lang="ts">
import type { IndexedStore } from "./common/EntityStores.ts";
import type { MessageState } from "./domain/components/algorithm_plugins/api/entities/state_entities/Messages.ts";
import type { MessageStateStore } from "./domain/components/simulation/SimulationSnapshot.ts";
import TableHeader from "./TableHeader.vue";
import TableRow from "./TableRow.vue";

defineProps<{
    messages: IndexedStore<MessageState>;
}>();
</script>

<template>
            <table class="table">
                <thead class="table-header">
                    <TableHeader/>
                </thead>

                <tbody class="table-body">
                    <TableRow
                        v-for="message of messages.readAllValues()"
                        :key="message.id"
                        :id="message.id.toString()"
                        :type="message.data.type.toString()"
                        :receiver-node="message.receiverNode.id.toString()"
                        :destination-time="message.destinationTime.toString()"
                    />
                </tbody>
            </table>

</template>

<style scoped>

.table {
    flex: 1;

    display: flex;
    flex-direction: column;
}

.table-header {
    height: 10%;
}

.table-body {
    flex: 1;
    overflow: hidden;
}


</style>