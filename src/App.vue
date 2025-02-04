<script setup>
    import { NConfigProvider, NMessageProvider } from 'naive-ui'
    import Nav from './components/Nav.vue'
    import Vue_Header from './components/Header.vue'

    const lightThemeOverrides = {
        common: {
            primaryColor: '#276A49',
            primaryColorHover: '#156C46',   // 可對應 palette.primary.40
            primaryColorPressed: '#045233', // 可對應 palette.primary.30
            primaryColorSuppl: '#ACF2C8',   // primaryContainer
            infoColor: '#3C6471',          // 這裡可以用作 tertiary，也可自行調整
            errorColor: '#BA1A1A',
            bodyColor: '#F6FBF4',     // background、surface
            textColorBase: '#171D19', // onBackground、onSurface
        }
    }
</script>

<template>
    <n-config-provider :theme-overrides="lightThemeOverrides">
        <n-message-provider>
            <Vue_Header />
            <main class="px-3 py-5">
                <router-view />
            </main>
            <Nav />
            <content />
        </n-message-provider>
    </n-config-provider>
</template>

<style>
    mark {
        color: var(--textColor);
        background: none;
        box-shadow: inset 0 -0.6em rgb(255 255 000 / 80%);
        padding: 0 0.1em;
    }
</style>
