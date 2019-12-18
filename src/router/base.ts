// separated from auto ROUTE
module.exports = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      label: "登录",
      withMenu: false,
      withoutAuth: true
    }
  },
  // 让地址为 login 和 没有地址
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/home",
    redirect: "/home/index"
  },
  {
    path: "*",
    name: "notFound",
    component: () => import("@/views/notFound.vue"),
    meta: {
      withMenu: false
    }
  }
];
