import Catagories from "@/components/Catagories.vue";
import Home from "@/components/Home.vue";
import Posts from "@/components/Posts.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/posts",
      name: "Posts",
      component: Posts,
    },
    {
      path: "/catagories",
      name: "Catagories",
      component: Catagories,
    },
  ],
});
