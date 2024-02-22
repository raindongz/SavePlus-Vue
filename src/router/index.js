import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Visiting from '../views/Visiting.vue';
import Wishlist from '../views/Wishlist.vue';
import MyAccount from '../views/MyAccountpage.vue'
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
  },
  {
    path:'/myaccount',
    name:MyAccount,
    component:MyAccount
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
