import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { name: '我的文章', path: '/', component: () => import('../page/home.vue') },
    { name: '書籤', path: '/bookmark', component: () => import('../page/bookmark.vue') },
    { name: '更多', path: '/more', component: () => import('../page/more.vue') },
    { name: 'NotFound', path: '/404', component: () => import('../page/404.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
    history: createWebHistory(),
    routes,//路由表
    mode: 'history' // history 改为 hash
})
export default router