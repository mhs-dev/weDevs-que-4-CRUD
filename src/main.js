import FishUI from "fish-ui";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.use(FishUI);
Vue.component("vue-multiselect", window.VueMultiselect.default);
Vue.config.productionTip = false;
window.Vue = Vue;
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
