<script setup>
  import { ref, onMounted } from 'vue'
  import { NIcon } from 'naive-ui'
  import { Home, Menu } from '@vicons/ionicons5'
  import { useRouter, useRoute } from 'vue-router'

  // 建立一個 isIphonePWA 的狀態
  const isIphonePWA = ref(false)

  // 檢查是否為 iOS PWA 的函式
  function checkIfIphonePWA() {
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIos = /iphone|ipad|ipod/.test(userAgent)
    const isInStandaloneMode =
      'standalone' in window.navigator && window.navigator.standalone

    if (isIos && isInStandaloneMode) {
      isIphonePWA.value = true
    }
  }

  // 在 onMounted 生命週期中呼叫這個檢查函式
  onMounted(() => {
    checkIfIphonePWA()
  })

  //路由
  const router = useRouter()
  const route = useRoute()

  const navigateTo = (path) => {
    router.push(path)
  }

  // 簡易判斷目前路由是否為指定 path
  const isActive = (path) => {
    return route.path === path
  }

</script>

<template>
  <nav
    :class="['fixed bottom-0 left-0 right-0 bg-md-surface-container dark:bg-dark-md-surface-container', { 'pb-5': isIphonePWA }]">
    <div class="flex justify-around items-center h-16">
      <!-- 首頁按鈕 -->
      <button @click="navigateTo('/')" :class="[
        'flex flex-col items-center',
        isActive('/')
          ? 'text-md-on-secondary-container dark:text-dark-md-on-secondary-container'
          : 'text-md-on-surface-variant dark:text-dark-md-on-surface-variant hover:font-medium'
      ]">
        <div :class="[
          'pt-1 px-5 rounded-2xl',
          isActive('/')
            ? 'bg-md-secondary-container dark:bg-dark-md-secondary-container'
            : 'hover:bg-md-on-surface/12 dark:bg-dark-md-on-surface/12'
        ]">
          <NIcon size="24px">
            <Home />
          </NIcon>
        </div>
        <span class="text-xs mt-1" :class="isActive('/') ? 'font-medium' : ''">
          首頁
        </span>
      </button>

      <!-- 搜尋按鈕 
      <button
        @click="navigateTo('/search')"
        :class="[
          'flex flex-col items-center',
          isActive('/search') 
            ? 'text-md-on-secondary-container'
            : 'text-md-on-surface-variant hover:font-medium'
        ]"
      >
        <div
          :class="[
            'pt-1 px-5 rounded-2xl',
            isActive('/search') 
              ? 'bg-md-secondary-container'
              : 'hover:bg-md-on-surface/12'
          ]"
        >
          <NIcon>
            <Search />
          </NIcon>
        </div>
        <span class="text-xs mt-1" :class="isActive('/search') ? 'font-medium' : ''">
          搜尋
        </span>
      </button>
      -->

      <!-- 工具按鈕 -->
      <button @click="navigateTo('/more')" :class="[
        'flex flex-col items-center',
        isActive('/more')
          ? 'text-md-on-secondary-container dark:text-dark-md-on-secondary-container'
          : 'text-md-on-surface-variant dark:text-dark-md-on-surface-variant hover:font-medium'
      ]">
        <div :class="[
          'pt-1 px-5 rounded-2xl',
          isActive('/more')
            ? 'bg-md-secondary-container dark:bg-dark-md-secondary-container'
            : 'hover:bg-md-on-surface/12 dark:bg-dark-md-on-surface/12'
        ]">
          <NIcon size="24px">
            <Menu />
          </NIcon>
        </div>
        <span class="text-xs mt-1" :class="isActive('/more') ? 'font-medium' : ''">
          更多
        </span>
      </button>
    </div>
  </nav>
</template>