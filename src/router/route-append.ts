export default [
       {path: "/home/index",
    name: "home-index",
    component: () => import("@/views/home/index.vue"),
    meta: {
      withMenu: false,
      ignoreCollapseMenu: false,
    }
  },{path: "/login/identify",
    name: "login-identify",
    component: () => import("@/views/login/identify.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/device/index",
    name: "project-children-device-index",
    component: () => import("@/views/project/children/device/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/deviceType/index",
    name: "project-children-deviceType-index",
    component: () => import("@/views/project/children/deviceType/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/index",
    name: "project-children-index",
    component: () => import("@/views/project/children/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/point/index",
    name: "project-children-point-index",
    component: () => import("@/views/project/children/point/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/region/index",
    name: "project-children-region-index",
    component: () => import("@/views/project/children/region/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/system/index",
    name: "project-children-system-index",
    component: () => import("@/views/project/children/system/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/index",name: "project-index",
    component: () => import("@/views/project/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    },
    children:[{path: "/project/children/device/index",
    name: "project-children-device-index",
    component: () => import("@/views/project/children/device/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/deviceType/index",
    name: "project-children-deviceType-index",
    component: () => import("@/views/project/children/deviceType/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/index",
    name: "project-children-index",
    component: () => import("@/views/project/children/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/point/index",
    name: "project-children-point-index",
    component: () => import("@/views/project/children/point/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/region/index",
    name: "project-children-region-index",
    component: () => import("@/views/project/children/region/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/project/children/system/index",
    name: "project-children-system-index",
    component: () => import("@/views/project/children/system/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  }]
  },{path: "/system/index",
    name: "system-index",
    component: () => import("@/views/system/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/system/legend/index",
    name: "system-legend-index",
    component: () => import("@/views/system/legend/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/system/metadata/index",
    name: "system-metadata-index",
    component: () => import("@/views/system/metadata/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  },{path: "/system/method/index",
    name: "system-method-index",
    component: () => import("@/views/system/method/index.vue"),
    meta: {
      withMenu: true,
      ignoreCollapseMenu: false,
    }
  }
]