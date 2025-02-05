<template>
    <NSpin :show="loading">
        <div class="pb-20">
            <!-- Image Section -->
            <n-skeleton v-if="loading" height="270px"/>
            <div v-else class="relative h-64 mb-4 px-3">
                <img :src="article.imageUrl" :alt="article.title"
                    class="object-cover w-full h-full" />
            </div>
            <br>
            <!-- Article Content -->
            <div class="px-4">
                <n-skeleton v-if="loading" text style="width: 70%" height="30px"/>
                <h1 v-else class="text-2xl font-bold mb-2 text-md-on-surface dark:text-dark-md-on-surface">{{ article?.title }}
                </h1>
                <div
                    class="flex justify-between items-center mb-4 text-sm text-md-on-surface dark:text-dark-md-on-surface">
                    <n-skeleton v-if="loading" text style="width: 50%" />
                    <span v-else>
                        {{ article?.author }} · {{ article?.date }}
                    </span>
                    <n-skeleton v-if="loading" text style="width: 70px" />
                    <a v-else :href="article?.link" class=" text-md-primary dark:text-dark-md-primary py-2 px-5xs">
                        原始頁面
                    </a>
                </div>
                <!-- Content Section -->
                <n-skeleton v-if="loading" text :repeat="30" />
                <div v-html="article?.content" v-else class="text-md-on-surface-variant dark:text-dark-md-on-surface-variant">
                </div>
                <br>
                <Button @click="handleShare"
                    class="border-1 bg-md-primary/100 text-md-on-primary py-2 px-5 rounded-full hover:bg-md-primary/0 dark:bg-dark-md-primary/100 text-dark-md-on-primary hover:text-md-primary hover:border-1 hover: border-md-primary dark:hover:text-dark-md-primary">
                    <n-icon class="pt-0.5 pr-5">
                        <ShareOutline />
                    </n-icon>
                    分享
                </Button>
            </div>
        </div>
    </NSpin>
</template>

<script>
    import { ref, computed, onMounted } from "vue"
    import { useRoute } from "vue-router"
    import { NButton, NIcon, NSpin, NSkeleton } from "naive-ui"
    import { ShareOutline } from '@vicons/ionicons5'


    export default {
        components: {
            NButton,
            NIcon,
            NSpin,
            ShareOutline,
            NSkeleton
        },
        setup() {
            const article = ref(null)
            const route = useRoute()
            const { id } = route.query
            const loading = ref(true);

            // Fetch article from WordPress REST API
            const fetchArticle = async () => {
                try {
                    const response = await fetch(`https://xiaozhi.moe/wp-json/wp/v2/posts/${id}?_embed`)
                    const data = await response.json()

                    article.value = {
                        id: data.id,
                        title: data.title.rendered,
                        content: data.content.rendered, // 直接使用 API 返回的 HTML 内容，包含图片标签
                        imageUrl: data._embedded['wp:featuredmedia']
                            ? data._embedded['wp:featuredmedia'][0].source_url
                            : '',
                        author: data._embedded.author ? data._embedded.author[0].name : '未知作者',
                        date: new Date(data.date).toLocaleDateString("zh-TW"),
                        link: data.link,
                    }
                } catch (error) {
                    console.error("获取文章失败", error)
                } finally {
                    loading.value = false;
                }
            }

            // Split content into paragraphs
            const splitContent = computed(() => {
                const textContent = article.value?.content.replace(/<\/?[^>]+(>|$)/g, "") || ""
                return textContent.split("\n\n")
            })

            // Share functionality
            const handleShare = async () => {
                const shareData = {
                    title: '萌小志Mengxiaozhi Blog',
                    text: '分享一篇文章',
                    url: article.value.link,
                };

                // 判断是否支持 Web Share API
                if (navigator.share) {
                    try {
                        await navigator.share(shareData);
                        //console.log('內容已分享');
                    } catch (err) {
                        alert('分享失敗:', err);
                        //console.error('分享失敗:', err);
                    }
                } else {
                    // 桌面设备复制链接
                    copyToClipboard(shareData.url);
                    alert('連結已複製');
                }
            };

            onMounted(() => {
                fetchArticle()
            })

            return {
                article,
                splitContent,
                handleShare,
                loading,
            }
        }
    }
</script>

<style scoped></style>