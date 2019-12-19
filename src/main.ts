import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element-ui";
import "@/assets/style/index.scss";
import searchTable from "@/components/search-table/index.vue";
import commonForm from "@/components/common-form/index.vue";
import "@/directive/index.ts";
import "./assets/iconfont/iconfont.css";

Vue.config.productionTip = false;
Vue.config.productionTip = false;
Vue.component("searchTable", searchTable);
Vue.component("commonForm", commonForm);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
