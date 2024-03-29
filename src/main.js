import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import ProduceUp from "./components/ProduceUpded.vue";
import Uploadweb from "./components/uploadPro.vue";
import ProduceIn from "./components/ProduceInfo.vue";
import SignUp from "./components/SignUp.vue";
import SignIn from "./components/SignIn.vue";
import userInf from "./components/userInformation.vue";
import ProduceList from "./components/ProduceList.vue";
import interPro from "./components/InteProduct.vue";
import axios from "axios";

let token = JSON.parse(localStorage.getItem("token"));
if (token) {
  console.log(token);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
axios.defaults.baseURL = "http://api.saveplus.link";

const routes = [
  { path: "/produceUp", component: ProduceUp },
  { path: "/uploadPro", component: Uploadweb },
  { path: "/pro-info", component: ProduceIn },
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn },
  { path: "/p-information", component: userInf },
  { path: "", component: ProduceList },
  { path: "/interest", component: interPro },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");

export default router;
