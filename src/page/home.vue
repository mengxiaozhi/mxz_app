<script setup>
    import { NImage } from 'naive-ui'
    import ArticleList from '../components/ArticleList.vue'
</script>
<template>
    <div class="flex justify-center pb-7">
        <n-image width="185" src="/logo.png" preview-disabled />
    </div>
    <ArticleList />
</template>