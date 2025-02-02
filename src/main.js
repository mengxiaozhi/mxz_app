import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from './router/index.js'

const app = createApp(App)

app.use(routes)

app.mount('#app')
