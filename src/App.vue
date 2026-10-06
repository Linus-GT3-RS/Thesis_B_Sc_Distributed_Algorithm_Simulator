<template>
    <div class="app">
        <MainView></MainView>
    </div>
</template>

<script setup>
import MainView from './presentation/views/MainView.vue';

</script>

<style scoped>

.app {
    height: 100dvh;
    width: 100%;
    min-height: 0;
    box-sizing: border-box;
}

:global(*) {
    box-sizing: border-box;
}

:global(html),
:global(body),
:global(#app) {
    width: 100%;
    height: 100%;
    margin: 0;
}

:global(body) {
    min-width: 720px;
    min-height: 480px;
    color: #e5ecf7;
    background: #111827;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 13px;
    -webkit-font-smoothing: antialiased;
}

:global(:root) {
    --app-background: #111827;
    --panel-background: #182233;
    --panel-subtle: #202c3e;
    --panel-border: #2b374a;
    --row-border: #273347;
    --text-primary: #e5ecf7;
    --text-secondary: #a9bad3;
    --text-muted: #8999b1;
    --accent: #9ab6ff;
    --accent-soft: #263a59;
}

:global(button) {
    font: inherit;
}

</style>