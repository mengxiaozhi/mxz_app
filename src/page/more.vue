<script setup>
    import { NIcon, NDivider,NImage } from "naive-ui";
    import { ArrowForward } from '@vicons/ionicons5'
</script>
<template>
    <div>
        <a href="https://xiaozhi.moe/tools" class="text-xl">
            <span>工具箱</span>
            <n-icon class="pt-1 pl-3">
                <ArrowForward />
            </n-icon>
        </a>
    </div>
    <n-divider />
    <div>
        <a href="https://xiaozhi.moe/tools" class="text-xl">
            <span>萌小志Mengxiaozhi Blog</span>
            <n-icon class="pt-1 pl-3">
                <ArrowForward />
            </n-icon>
        </a>
    </div>
    <n-divider />
    <div>
        <p>
            Copyright © 萌小志Mengxiaozhi & Moexiaozhi.<br>
            版本：0.1
        </p>
    </div>
</template>