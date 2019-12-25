export default [
  {
    path: "/home/index",
    name: "home-index",
    component: () => import("@/views/home/index.vue"),
    meta: {
      withMenu: false,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/login/identify",
    name: "login-identify",
    component: () => import("@/views/login/identify.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/content/device/index",
    name: "project-content-device-index",
    component: () => import("@/views/project/content/device/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/content/deviceType/index",
    name: "project-content-deviceType-index",
    component: () => import("@/views/project/content/deviceType/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/content/index",
    name: "project-content-index",
    component: () => import("@/views/project/content/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/content/point/index",
    name: "project-content-point-index",
    component: () => import("@/views/project/content/point/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/content/region/index",
    name: "project-content-region-index",
    component: () => import("@/views/project/content/region/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/content/system/index",
    name: "project-content-system-index",
    component: () => import("@/views/project/content/system/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/index",
    name: "project-index",
    component: () => import("@/views/project/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/system/index",
    name: "system-index",
    component: () => import("@/views/system/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/system/legend/index",
    name: "system-legend-index",
    component: () => import("@/views/system/legend/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/system/metadata/index",
    name: "system-metadata-index",
    component: () => import("@/views/system/metadata/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/system/method/index",
    name: "system-method-index",
    component: () => import("@/views/system/method/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  }
]