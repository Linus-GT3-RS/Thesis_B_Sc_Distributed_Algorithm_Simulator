<script setup lang="ts">
import type { IndexedStore } from "./common/EntityStores.ts";
import type { MessageState } from "./domain/components/algorithm_plugins/api/entities/state_entities/Messages.ts";
import type { MessageStateStore } from "./domain/components/simulation/SimulationSnapshot.ts";
import MessageTableRow from "./MessageTableRow.vue";

defineProps<{
    messages: IndexedStore<MessageState>;
}>();
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Receiver Node</th>
                <th>Destination Time</th>
            </tr>
        </thead>

        <tbody>
            <MessageTableRow
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
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    border: 1px solid black;
    text-align: left;
}
</style>