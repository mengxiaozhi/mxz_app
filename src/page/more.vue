<script setup>
    import { NIcon, NDivider } from "naive-ui";
    import { ArrowForward } from '@vicons/ionicons5'
</script>
<template>
    <div class="text-xl text-md-on-surface-variant dark:text-dark-md-on-surface-variant">
        <button @click="toggleTheme">
            <span>切换主题({{ isDarkMode ? 'Dark' : 'Light' }})</span>
            <n-icon class="pt-1 pl-3">
                <ArrowForward />
            </n-icon>
        </button>
    </div>
    <n-divider />
    <div class="text-md-on-surface-variant dark:text-dark-md-on-surface-variant">
        <a href="https://xiaozhi.moe/tools" class="text-xl">
            <span>工具箱</span>
            <n-icon class="pt-1 pl-3">
                <ArrowForward />
            </n-icon>
        </a>
    </div>
    <n-divider />
    <div class="text-md-on-surface-variant dark:text-dark-md-on-surface-variant">
        <a href="https://xiaozhi.moe/" class="text-xl">
            <span>萌小志Mengxiaozhi Blog</span>
            <n-icon class="pt-1 pl-3">
                <ArrowForward />
            </n-icon>
        </a>
    </div>
    <n-divider />
    <div class="text-md-on-surface-variant dark:text-dark-md-on-surface-variant">
        <p>
            Copyright © 萌小志Mengxiaozhi & Moexiaozhi.<br>
            版本：0.1
        </p>
    </div>
</template>