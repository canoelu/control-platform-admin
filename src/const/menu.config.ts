const menuList: any = [
  {
    name: "系统",
    path: "",
    icon: "iconfont icon-xitong",
    children: [
      {
        name: "字典管理",
        icon: "iconfont icon-zidianguanli",
        path: "/system/metadata/index"
      },
      {
        name: "图例管理",
        icon: "iconfont icon-tuliguanli",
        path: "/system/legend/index"
      },
      {
        name: "方法管理",
        icon: "iconfont icon-lilunfangfaguanli",
        path: "/system/method/index"
      }
    ]
  },
  {
    name: "项目",
    icon: "iconfont icon-xiangmu1",
    children: [
      {
        name: "项目管理",
        icon: "iconfont icon-xiangmu1",
        path: "/project/index"
      }
    ]
  }
];
const proMenuList: any = [
  {
    name: "系统管理",
    component: "systemManage",
    path: "/project/content/system/index"
  },
  {
    name: "设备管理",
    component: "deviceManage",
    path: "/project/content/device/index"
  },
  {
    name: "点位管理",
    component: "pointManage",
    path: "/project/content/point/index"
  },
  {
    name: "设备类别配置",
    component: "deviceTypeManage",
    path: "/project/content/deviceType/index"
  },
  {
    name: "区域管理",
    component: "areaManage",
    path: "/project/content/region/index"
  }
];
export { menuList, proMenuList };
