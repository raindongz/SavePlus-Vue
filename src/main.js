import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ProduceUp from './components/ProduceUpded.vue';
import Uploadweb from './components/uploadPro.vue';
import ProduceIn from './components/ProduceInfo.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'

const routes = [
  { path: '', component: ProduceUp },
  { path: '/uploadPro', component: Uploadweb },
  { path: '/pro-info', component:ProduceIn},
  { path: '/signup', component:SignUp},
  { path: '/signin', component:SignIn}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
