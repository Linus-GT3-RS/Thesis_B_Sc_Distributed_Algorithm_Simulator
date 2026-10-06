<script setup lang="ts">
import { usePiniaStore } from '@/presentation/stores/PiniaStore';
import { storeToRefs } from 'pinia';


const piniastore = usePiniaStore();
const {detailsSelectedEntity} = storeToRefs(piniastore);

</script>


<template>
<div class="detail-view">
    <div class="entity-summary">
        <span class="panel-title">Element Details</span>
        <template v-if="detailsSelectedEntity !== null">
            <span class="entity-type">{{ detailsSelectedEntity.selected.entityType }}</span>
            <span class="entity-id">#{{ detailsSelectedEntity.selected.entityId }}</span>
        </template>
    </div>

    <div class="details" v-if="detailsSelectedEntity !== null">
        <div 
            class="detail"
            v-for="detailPair of detailsSelectedEntity.details.entries()"
            :key="detailPair[0]">
            <span class="detail-key">{{ detailPair[0] }}</span>
            <span class="detail-value">{{ detailPair[1] }}</span>
        </div>
    </div>

    <div class="empty-state" v-else>
        <div class="empty-icon">↖</div>
        <strong>Nothing selected</strong>
        <span>Select a node, edge, or message to inspect its details.</span>
    </div>
</div>
</template>


<style scoped>

.detail-view{
    height: 0;
    width: 100%;
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--panel-background);
    color: var(--text-primary);
    font-family: Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: 13px;
}

.entity-summary {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 0 14px;
    background: var(--panel-subtle);
    border-bottom: 1px solid var(--row-border);
}

.panel-title {
    margin-right: auto;
    color: var(--text-primary);
    font-size: 11px;
    font-weight: 650;
    letter-spacing: 0.015em;
}

.entity-type {
    padding: 4px 8px;
    border: 1px solid #38527a;
    border-radius: 999px;
    background: var(--accent-soft);
    color: #b8ccff;
    font-size: 11px;
    font-weight: 600;
}

.entity-id {
    color: var(--text-muted);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
}

.details {
    flex: 1;
    width: 100%;
    min-height: 0;
    overflow: auto;
    padding: 14px;
}

.detail {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
    gap: 10px;
    padding: 9px 2px;
    border-bottom: 1px solid var(--row-border);
    line-height: 1.4;
}

.detail-key {
    color: var(--text-secondary);
}

.detail-value {
    color: #d2dbea;
    font-weight: 500;
    overflow-wrap: anywhere;
}

.empty-state {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 24px;
    color: var(--text-muted);
    text-align: center;
}

.empty-state strong {
    color: var(--text-primary);
    font-size: 12px;
    font-weight: 600;
}

.empty-state span {
    max-width: 210px;
    font-size: 11px;
    line-height: 1.5;
}

.empty-icon {
    display: grid;
    width: 34px;
    height: 34px;
    margin-bottom: 4px;
    place-items: center;
    border: 1px solid var(--panel-border);
    border-radius: 10px;
    background: var(--panel-subtle);
    color: var(--accent);
    font-size: 17px;
}

</style>