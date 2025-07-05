import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Inicio from '../views/Inicio.vue';
import Contato from '../views/Contato.vue';

export const router = createRouter({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Inicio,
    },
    {
      path: '/contato',
      component: Contato,
    },
  ],
  history: createWebHistory(),
});
