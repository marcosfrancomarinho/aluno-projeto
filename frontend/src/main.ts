import { createApp } from 'vue';
import App from './presentation/App.vue';
import './presentation/styles/global.css';
import { router } from './presentation/router';
import { Container } from './shared/container/Container';

const container = Container.getInstance();
const app = createApp(App);
container.injection(app);
app.use(router).mount('#app');
