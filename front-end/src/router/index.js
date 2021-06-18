import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Personal from "../views/Personal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/personal",
    name: 'Personal',
    component: Personal
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
