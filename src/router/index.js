import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Visiting from '../views/Visiting.vue';
import Wishlist from '../views/Wishlist.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/visiting',
    name: 'Visiting',
    component: Visiting
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
