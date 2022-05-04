import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '', redirect: '/realToDo' },
      { path: '/realToDo', meta: { name: 'realToDo' }, component: () => import('pages/RealToDo.vue') },
      { path: '/storeToDo', meta: { name: 'storeToDo' }, component: () => import('pages/StoreToDo.vue') },
      { path: '/mongoToDo', meta: { name: 'mongoToDo' }, component: () => import('pages/MongoToDo.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
