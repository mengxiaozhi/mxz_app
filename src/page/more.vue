<script setup>
    import Pages from '../components/Pages.vue'
    import config from '../config.js';
</script>
<template>
    <Pages />
    <div class="text-md-on-surface-variant dark:text-dark-md-on-surface-variant">
        <p>
            Copyright © {{config.copyright}}<br>
            版本：{{config.version}}
        </p>
    </div>
</template>