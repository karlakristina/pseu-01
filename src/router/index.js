import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/korisnici',
    name: 'Korisnici',
    component: () => import('@/views/KorisniciView.vue'),
  },
  {
    path: '/skripte',
    name: 'Skripte',
    component: () => import('@/views/SkripteView.vue'),
  },
  {
    path: '/ocjene',
    name: 'Ocjene',
    component: () => import('@/views/OcjeneView.vue'),
  },
  {
    path: '/kategorijeskripti',
    name: '/KategorijeSkripti',
    component: () => import('@/views/KategorijeSkriptiView.vue'),
  },
  // Dodajte ovdje rute za ostale view-ove prema potrebi
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

