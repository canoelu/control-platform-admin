const menuList: any = [
  {
    name: "系统",
    path: "",
    children: [
      {
        name: "字典管理",
        path: "/system/metadata/index"
      },
      {
        name: "图例管理",
        path: "/system/legend/index"
      },
      {
        name: "方法管理",
        path: "/system/method/index"
      }
    ]
  },
  {
    name: "项目",
    children: [
      {
        name: "项目管理",
        path: "/system/system/index"
      }
    ]
  }
];

export { menuList };
