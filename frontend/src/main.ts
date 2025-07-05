import { createApp } from 'vue';
import App from './presentation/App.vue';
import './presentation/styles/global.css';
import { router } from './presentation/router';

createApp(App).use(router).mount('#app');
