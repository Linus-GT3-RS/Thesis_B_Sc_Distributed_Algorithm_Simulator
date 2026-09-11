<script setup lang="ts">
import { usePiniaStore } from '@/presentation/stores/PiniaStore';
import { storeToRefs } from 'pinia';


const piniastore = usePiniaStore();
const {detailsSelectedEntity} = storeToRefs(piniastore);

</script>


<template>
<div class="detail-view" v-if="detailsSelectedEntity !== null">

    <div class="entity-infos">
        Selected entity 
        is of type {{ detailsSelectedEntity.selected.entityType }}
         and has id {{ detailsSelectedEntity.selected.entityId }} 
    </div>

    <div class="details">
        <span>The details of the entity are:</span>
        <div 
            class="detail"
            v-for="detailPair of detailsSelectedEntity.details.entries()">
            {{ detailPair[0] }} : {{ detailPair[1] }}
        </div>
    </div>
</div>

<div class="detail-view" v-else>
    No Entity Selected
</div>
</template>


<style scoped>

.detail-view{
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    background: #FFFFFF;
    color: #0F172A;

    font-family: Inter, sans-serif;
    font-size: 13px;
}

.entity-infos {
    padding: 14px 16px;

    background: #F8FAFC;
    border-bottom: 1px solid #E2E8F0;

    color: #475569;
    line-height: 1.5;
}


.details {
    height: 100%;
    width: 100%;
    overflow: auto;

    padding: 16px;
}

.detail {
    padding: 9px 10px;

    color: #334155;

    border-bottom: 1px solid #F1F5F9;

    line-height: 1.4;
}

.details > span {
    display: block;

    margin-bottom: 10px;

    color: #64748B;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
}

</style>