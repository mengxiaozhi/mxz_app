<!-- BookmarksPage.vue -->
<script setup>
    import { ref, onMounted } from 'vue'
    import { useMessage, NDivider, NIcon, NEllipsis } from 'naive-ui'
    import { ArrowForward } from '@vicons/ionicons5'

    const message = useMessage()
    const bookmarks = ref([])

    /**
     * 從 localStorage 載入書籤清單
     */
    function loadBookmarks() {
        try {
            const data = localStorage.getItem('bookmarks') || '[]'
            bookmarks.value = JSON.parse(data)
        } catch (err) {
            console.error('讀取書籤失敗:', err)
            bookmarks.value = []
        }
    }

    /**
     * 移除單一書籤（依文章ID判斷）
     */
    function removeBookmark(bookmarkId) {
        bookmarks.value = bookmarks.value.filter((b) => b.id !== bookmarkId)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
        message.success('已成功移除書籤')
    }

    onMounted(() => {
        loadBookmarks()
    })
</script>

<template>
    <div class="p-4 space-y-4">
        <!-- 如果沒有任何書籤，顯示提示訊息 -->
        <div v-if="bookmarks.length === 0">
            <p class="text-md-primary dark:text-dark-md-primary">目前還沒有任何書籤！</p>
        </div>

        <!-- 有書籤時，逐項顯示 -->
        <div v-else>
            <NSpin :show="loading">
                <Card v-for="bookmark in bookmarks" :key="bookmark.id" class="flex space-x-4 py-4 rounded-lg">
                    <div class="flex flex-col justify-between flex-grow">
                        <div>
                            <h2 class="text-lg font-semibold">
                                <router-link :to="`/reader?id=${bookmark.id}`"
                                    class="text-md-on-surface dark:text-dark-md-on-surface-variant hover:underline">
                                    <n-ellipsis :line-clamp="1">
                                        {{ bookmark.title }}
                                    </n-ellipsis>
                                </router-link>
                            </h2>
                            <n-ellipsis :line-clamp="3"
                                class="text-md-on-surface-variant dark:text-dark-md-on-surface-variant">{{
                                    bookmark.excerpt }}</n-ellipsis>
                        </div>
                        &nbsp;
                        <div>
                            <!--<a :href="bookmark.link" target="_self">
                            <Button
                                class="border-1 bg-md-primary/100 text-md-on-primary py-2 px-5 rounded-full hover:bg-md-primary/0 hover:text-md-primary hover:border-1 hover: border-md-primary">
                                <n-icon class="pt-0.5 pr-5">
                                    <ArrowForward />
                                </n-icon>
                                查看文章
                            </Button>
                        </a>-->
                            <router-link :to="`/reader?id=${bookmark.id}`">
                                <Button
                                    class="border-1 bg-md-primary/100 text-md-on-primary py-2 px-5 rounded-full hover:bg-md-primary/0 dark:bg-dark-md-primary/100 text-dark-md-on-primary hover:text-md-primary hover:border-1 hover: border-md-primary dark:hover:text-dark-md-primary">
                                    <n-icon class="pt-0.5 pr-5">
                                        <ArrowForward />
                                    </n-icon>
                                    閱讀更多
                                </Button>
                            </router-link>
                            <Button class=" text-md-primary dark:text-dark-md-primary py-2 px-5"
                                @click="removeBookmark(bookmark.id)">
                                移除書籤
                            </Button>
                        </div>
                        <n-divider />
                    </div>
                </Card>
            </NSpin>
        </div>
    </div>
</template>
