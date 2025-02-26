# WordPress mxz_app

**WordPress mxz_app** 是一个现代化的网页应用，专为手机浏览优化设计，能够抓取 WordPress 网站的内容（文章和页面），并以简洁、易用的界面呈现给用户。该应用支持将内容打包成静态网页，随后可进一步封装成手机 App，为用户提供便捷的移动端阅读体验。此外，它还提供了 WordPress 原生所没有的书签功能，增强了用户体验。

## 功能亮点

- **文章列表**：展示 WordPress 网站的最新文章，支持分页加载。
- **文章阅读**：提供清晰、易读的文章页面，支持书签添加。
- **页面列表**：列出 WordPress 网站的所有页面，便于用户导航。
- **书签功能**：允许用户将喜欢的文章加入书签并随时查看（WordPress 原生不支持此功能）。
- **手机优化**：响应式设计，确保在移动设备上的流畅体验。

## 技术栈

- **前端框架**：Vue 3（使用 Composition API）
- **UI 库**：Naive UI
- **路由管理**：Vue Router
- **构建工具**：Vite
- **API 集成**：WordPress REST API
- **本地存储**：使用 `localStorage` 实现书签功能

## 开始使用

### 环境要求

- **Node.js**：版本 16 或以上（建议使用最新稳定版）
- **包管理器**：推荐使用 `pnpm`，也可以使用 `npm`

### 安装步骤

1. **克隆仓库**：
   ```
   bash
   git clone https://github.com/mengxiaozhi/mxz_app.git
   cd wordpress-mobile-viewer
    ```
    注：请将 your-repo 替换为你的实际 GitHub 仓库名称。
2. **安装依赖**:
    ```bash
    pnpm install
    ```
    或
    ```bash
    npm install
    ```
3. **配置 WordPress API**：
    编辑 src/config.js 文件，确保 apiUrl 指向你的 WordPress 网站地址。例如：
    
    ```javascript  
    export default {
        apiUrl: 'https://xiaozhi.moe',  // WordPress 网站地址
        version: '1.0',
        copyright: '萌小志Mengxiaozhi & Moexiaozhi.'
    };
    ```
### 运行应用
1. **启动开发服务器**：
    ```bash
    pnpm run dev
    ```
    或
    ```bash
    npm run dev
    ```
    访问应用： 在浏览器中打开 http://localhost:3000（具体端口以终端提示为准）。
    构建静态网站
2. **构建项目**：
    ```bash
    pnpm run build
    ```
    或
    ```bash
    npm run build
    ```
    输出结果： 构建完成后，静态文件将生成在 dist 目录中，可部署到任何静态托管服务（如 GitHub Pages、Netlify 等）。
### 开发指南
1. **项目结构**
    ```text
    src/
    ├── assets/          # 静态资源（如图片、样式等）
    ├── components/      # 可复用组件
    ├── views/           # 页面组件
    ├── router/          # Vue Router 路由配置
    ├── config.js        # 全局配置文件（API URL 等）
    └── main.js          # 项目入口文件
    ```
2. **核心组件**
    - 文章列表：src/views/ArticleList.vue
    - 文章阅读：src/views/ArticleReader.vue
    - 页面列表：src/views/PageList.vue
    - 书签管理：src/components/BookmarkManager.vue
3. **API 集成**
    应用通过 WordPress REST API 获取数据，API 地址在 src/config.js 中定义。主要接口包括：
    - 文章列表：GET /wp-json/wp/v2/posts
    - 文章详情：GET /wp-json/wp/v2/posts/:id
    - 页面列表：GET /wp-json/wp/v2/pages
4. **书签功能实现**
    书签数据存储在浏览器 localStorage 中，确保用户在关闭应用后仍能保留。
    用户可通过文章阅读页面添加或移除书签，并随时查看已保存的内容。
    打包成手机 App
    你可以通过以下工具将应用打包为手机 App：
    - Capacitor：
    将 Vue 项目转换为原生应用，支持 iOS 和 Android。
    参考：Capacitor 官方文档
    - Cordova：
    类似 Capacitor，提供跨平台打包功能。
    参考：Cordova 官方文档
    - WebView 封装：
    将静态文件部署后，通过简单的 WebView 应用加载网页内容。

### 使用说明

1. **替换仓库 URL**：
   在“克隆仓库”部分，将 `https://github.com/mengxiaozhi/mxz_app.git` 替换为你的实际 GitHub 仓库地址。

2. **调整配置**：
   确保 `src/config.js` 中的 `apiUrl` 已正确设置为你的 WordPress 网站地址（如 `https://xiaozhi.moe`）。

3. **许可文件**：
   本项目采用 MIT 许可 - 详情请见 LICENSE 文件。