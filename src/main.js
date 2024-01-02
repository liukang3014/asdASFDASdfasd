import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pdfjs from 'pdfjs-dist';



createApp(App).use(store).use(pdfjs).use(router).mount('#app')
