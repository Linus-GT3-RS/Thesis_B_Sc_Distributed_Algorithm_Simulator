<script setup lang="ts">
import { useStore } from '../stores/Store';
import { storeToRefs } from 'pinia';

const store = useStore();
const {speedSliderSettings, sliderValue} = storeToRefs(store);

</script>


<template>
<div class="speed-slider" v-if="speedSliderSettings !== null">
    <input
    :type="'range'"
    :min="speedSliderSettings.min" 
    :max="speedSliderSettings.max" 
    :step="speedSliderSettings.stepsize"
    :v-model.number="sliderValue" 
    @input="(payload) => sliderValue = Number((payload.target as HTMLInputElement).value)"
    />
    
    <div> 
        {{ sliderValue }}{{ speedSliderSettings.metric }}
    </div>    
</div>

<div v-else>no slider sad boi</div>

</template>