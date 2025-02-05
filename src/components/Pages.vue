<script setup>
    import { ref, onMounted } from 'vue';
    import { NSpin, NIcon, NDivider, NSkeleton } from "naive-ui";
    import { ArrowForward } from '@vicons/ionicons5';

    const loading = ref(true);
    const pages = ref([]); // 用于存储页面数据

    onMounted(async () => {
        try {
            const response = await fetch('https://xiaozhi.moe/wp-json/wp/v2/pages');
            // 检查响应状态
            if (!response.ok) {
                throw new Error(`网络响应错误: ${response.status}`);
            }
            // 解析 JSON 数据
            const data = await response.json();
            pages.value = data;
        } catch (error) {
            console.error('获取页面数据失败:', error);
        }finally {
            loading.value = false;
        }
    });
</script>

<template>
    <NSpin :show="loading">
        <div class="text-md-on-surface-variant dark:text-dark-md-on-surface-variant">
            <!-- 动态展示获取的页面数据 -->
            <div v-for="page in pages" :key="page.id">
                <a :href="page.link" class="text-xl">
                    <span>{{ page.title.rendered }}</span>
                    <n-icon class="pt-1 pl-3">
                        <ArrowForward />
                    </n-icon>
                </a>
                <n-divider />
            </div>
        </div>
    </NSpin>
</template>