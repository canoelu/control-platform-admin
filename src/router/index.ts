import Vue from "vue";
import Router from "vue-router";
import routeAppend from "./route-append";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import VueCookies from "vue-cookies";
const baseModule = require("./base");

let role: string | number = "admin";

Vue.use(Router);

const ROUTER = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [...routeAppend, ...baseModule]
});
function _goLogin(next: any, to: any) {
  next({
    name: "login",
    query: {
      redirect: ""
    }
  });
}
function _validateToken(to: any, from: any, next: any, role: string | number) {
  if (to.path.indexOf("login") > -1) {
    next();
  } else {
    let hasLogin = true;
    if (hasLogin) {
      let { name, query, params } = to;
      if (!query.sysPlat && !name.includes("login")) {
        next();
      } else {
        next();
      }
    } else {
      _goLogin(next, to);
    }
  }
}
ROUTER.beforeEach((to, from, next) => {
  // 进度条
  if (to.name !== from.name) {
    NProgress.start();
  }

  // 非登录页面
  if (!to.meta.withoutAuth) {
    _validateToken(to, from, next, role);
  } else {
    next();
  }
});
ROUTER.afterEach(to => {
  // 进度条
  NProgress.done();
});

export default ROUTER;
