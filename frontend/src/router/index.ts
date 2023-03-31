import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const erro: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  component: () => import('../views/Inicio/Erro.vue'),
};
const inicio: RouteRecordRaw = {
  path: '/',
  name: 'inicio',
  component: () => import('../views/Inicio/Index.vue'),
};

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [erro, inicio],
});

export default router;
