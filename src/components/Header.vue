<script setup>
    import { NIcon } from 'naive-ui'
    import { useRoute } from 'vue-router'
    import { BookmarkSharp } from '@vicons/ionicons5'

    const route = useRoute()
</script>
<template>
    <header class="py-7 px-5 flex justify-between">
        <div  >
            <H1 class="font-blod text-4xl text-md-on-secondary-container dark:text-dark-md-on-secondary-container">{{ route.name }}</H1>
        </div>
        <router-link to="/bookmark">
            <button class="hover:font-medium text-md-on-surface-variant dark:text-dark-md-on-surface-variant">
                <n-icon size="30px" class="pt-2.5 text-md-primary dark:text-dark-md-primary">
                    <BookmarkSharp />
                </n-icon>
                書籤
            </button>
        </router-link>
    </header>
</template>