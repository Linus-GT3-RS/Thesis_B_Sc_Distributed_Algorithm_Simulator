<script setup lang="ts">
import { useStore } from '../stores/Store';
import { storeToRefs } from 'pinia';

const store = useStore();
const {speedSliderSettings} = storeToRefs(store);

let val = speedSliderSettings.value.currentValue;

</script>


<template>
<div class="speed-slider" v-if="speedSliderSettings !== null">
    <input
    type="range"
    min="speedSliderSettings.min" 
    max="speedSliderSettings.max" 
    step="speedSliderSettings.stepsize"
    v-model.number="val"
    />
    
    <div> 
        {{ val }}{{ val }}
    </div>    
</div>

<div v-else>no slider sad boi</div>

</template>