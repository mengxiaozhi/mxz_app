<script setup>
    import { ref, onMounted, watch } from "vue";
    import {  NSpin, useMessage, NIcon, NPagination, NDivider } from "naive-ui";
    import { ArrowForward } from '@vicons/ionicons5'

    const articles = ref([]);
    const loading = ref(true);
    const message = useMessage();

    //页面
    const perPage = 5;
    const currentPage = ref(1);
    const totalPages = ref(1);

    //书签
    const addBookmark = (article) => {
        try {
            // 1. 從 localStorage 取出現有的書籤清單（若沒有則使用空陣列）
            let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

            // 2. 檢查是否已經存在相同文章 (以文章ID判斷)
            const exists = bookmarks.some(b => b.id === article.id);
            if (exists) {
                message.warning("此文章已在書籤中");
                return;
            }
            bookmarks.push({
                id: article.id,
                title: article.title,
                link: article.link,
                excerpt: article.excerpt
            });
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

            message.success("成功加入書籤！");
        } catch (err) {
            console.error("加入書籤失敗：", err);
            message.error("加入書籤時發生錯誤");
        }
    };

    const fetchArticles = async () => {
        try {
            const response = await fetch(
                `https://xiaozhi.moe/wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage.value}`
            );
            const posts = await response.json();

            // 獲取文章縮略圖
            const articlesWithImages = await Promise.all(
                posts.map(async (post) => {
                    let imageUrl = "/placeholder.svg";
                    if (post.featured_media) {
                        const mediaResponse = await fetch(`https://xiaozhi.moe/wp-json/wp/v2/media/${post.featured_media}`);
                        const mediaData = await mediaResponse.json();
                        imageUrl = mediaData.source_url || "/placeholder.svg";
                    }

                    return {
                        id: post.id,
                        title: post.title.rendered,
                        excerpt: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""), // 去除 HTML 標籤
                        imageUrl,
                        link: post.link,
                    };
                })
            );

            articles.value = articlesWithImages;
            //讀取 x-wp-totalpages 以取得總頁數
            const total = response.headers.get("x-wp-totalpages");
            if (total) {
                totalPages.value = parseInt(total, 10);
            } else {
                totalPages.value = 1;
            }
        } catch (error) {
            message.error("無法載入文章");
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchArticles);

    watch(currentPage, () => {
        loading.value = true;
        fetchArticles();
    });
</script>

<template>
    <div class="space-y-4 pb-20">
        <NSpin :show="loading">
            <Card v-for="article in articles" :key="article.id" class="flex space-x-4 py-4 rounded-lg">
                <img :src="article.imageUrl" :alt="article.title"
                    class="rounded-2xl w-[120px] h-[120px] object-cover" />
                <div class="flex flex-col justify-between flex-grow">
                    <div>
                        <h2 class="text-lg font-semibold">
                            <a :href="article.link" target="_blank" class="text-md-on-surface hover:underline">
                                {{ article.title }}
                            </a>
                        </h2>
                        <p class="text-md-on-surface-variant">{{ article.excerpt }}</p>
                    </div>
                    &nbsp;
                    <div>
                        <!--<a :href="article.link" target="_self">
                            <Button
                                class="border-1 bg-md-primary/100 text-md-on-primary py-2 px-5 rounded-full hover:bg-md-primary/0 hover:text-md-primary hover:border-1 hover: border-md-primary">
                                <n-icon class="pt-0.5 pr-5">
                                    <ArrowForward />
                                </n-icon>
                                閱讀更多
                            </Button>
                        </a>-->
                        <router-link :to="`/reader?id=${article.id}`">
                            <Button
                                class="border-1 bg-md-primary/100 text-md-on-primary py-2 px-5 rounded-full hover:bg-md-primary/0 hover:text-md-primary hover:border-1 hover: border-md-primary">
                                <n-icon class="pt-0.5 pr-5">
                                    <ArrowForward />
                                </n-icon>
                                閱讀更多
                            </Button>
                        </router-link>
                        <Button class=" text-md-primary py-2 px-5" @click="addBookmark(article)">
                            加入書籤
                        </Button>
                    </div>
                    <n-divider />
                </div>
            </Card>
        </NSpin>

        <div v-if="!loading" class="mt-4 flex justify-center">
            <n-pagination v-model:page="currentPage" :page-count="totalPages">
                <template #prev>
                    <span class="font-bold">
                        往回走
                    </span>
                </template>
                <template #next>
                    <span class="font-bold">
                        繼續走
                    </span>
                </template>
            </n-pagination>
        </div>
    </div>
</template>
