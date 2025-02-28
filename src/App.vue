<script setup>
    import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
    import Nav from './components/Nav.vue'
    import Vue_Header from './components/Header.vue'

    const lightThemeOverrides = {
        common: {
            primaryColor: '#276A49',            // 主色
            primaryColorHover: '#156C46',       // 主色 hover
            primaryColorPressed: '#045233',     // 主色 pressed
            primaryColorSuppl: '#ACF2C8',       // 主色补充色
            infoColor: '#3C6471',               // 信息色
            errorColor: '#BA1A1A',              // 错误色
            bodyColor: '#F6FBF4',               // 背景色
            textColorBase: '#171D19',           // 基本文本颜色
        }
    }

    const darkThemeOverrides = {
        common: {
            primaryColor: '#91D5AD',            // 主色
            primaryColorHover: '#4F7F65',       // 主色 hover
            primaryColorPressed: '#045233',     // 主色 pressed
            primaryColorSuppl: '#ACF2C8',       // 主色补充色
            infoColor: '#A4CDDC',               // 信息色
            errorColor: '#FFB4AB',              // 错误色
            bodyColor: '#0F1511',               // 背景色
            textColorBase: '#DFE4DD',           // 基本文本颜色
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

    .article-content img {
        min-height: 270px;
        min-width: 100%;
        margin-top: 12px;
        margin-bottom: 12px;
        border-radius: 7px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
    }
    .article-content p {
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .article-content div{
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .article-content code{
        background-color: rgb(19, 19, 19);
        color:white;
        padding-left: 7px;
        padding-right: 7px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 5px;
    }
</style>
