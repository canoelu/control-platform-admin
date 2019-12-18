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
    path: "/project/device/index",
    name: "project-device-index",
    component: () => import("@/views/project/device/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/deviceType/index",
    name: "project-deviceType-index",
    component: () => import("@/views/project/deviceType/index.vue"),
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
    path: "/project/point/index",
    name: "project-point-index",
    component: () => import("@/views/project/point/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{
    path: "/project/region/index",
    name: "project-region-index",
    component: () => import("@/views/project/region/index.vue"),
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