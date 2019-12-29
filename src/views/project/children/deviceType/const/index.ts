/**
 * 添加设备类别
 * @param vm
 * @constructor
 */
const DEVICE_TYPE_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      label: "名称",
      placeholder: "请输入名称"
    }
  ];
};
const DEVICE_TYPE_RULES = {
  name: { required: true, message: "请输入名称", trigger: "blur" }
};
/**
 * 搜索框
 * @param vm
 * @constructor
 */
const DEVICE_TYPE_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加设备类别",
        handler: () => vm.add()
      }
    ]
  };
};
/**
 * 设备类型表格
 * @param vm
 * @constructor
 */
const DEVICE_TYPE_COLUMN = (vm: any) => [
  {
    title: "Id",
    key: "id",
    width: 80
  },
  {
    title: "名称",
    key: "name",
    width: 200
  },
  {
    title: "操作",
    operate: true,
    setBtns: (row: any) => {
      return [
        {
          label: "修改",
          handler: () => vm.edit(row)
        },
        {
          label: "设备分组配置",
          handler: () => vm.groupSet(row)
        },
        {
          label: "方法配置",
          handler: () => vm.methodSet(row)
        },
        {
          label: "展示配置",
          handler: () => vm.showDisplaySet(row)
        }
      ];
    }
  }
];
const DEVICE_GROUP_SET_COLUMN = (vm: any) => [
  {
    title: "字典类别",
    key: "type"
  },
  {
    title: "图标",
    key: "icon"
  },
  {
    title: "操作",
    operate: true,
    setBtns: (row: any) => {
      return [
        {
          label: "修改",
          handler: () => vm.edit(row)
        },
        {
          label: "删除",
          handler: () => vm.delete(row)
        }
      ];
    }
  }
];
/**
 * 分组配置
 */
const GROUP_COLUMNS = (vm: any) => [
  {
    title: "字典类别",
    key: "type"
  },
  {
    title: "图标",
    key: "icon"
  },
  {
    operate: true,
    title: "操作",
    setBtns: (row: any) => {
      return [
        {
          label: "修改",
          handler: () => vm.editGroup(row)
        },
        {
          label: "删除",
          handler: () => vm.deleteGroup(row)
        }
      ];
    }
  }
];
const GROUP_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加",
        handler: () => vm.addGroupSet()
      }
    ]
  };
};
/**
 * 分组FORM
 * @param vm
 * @constructor
 */
const GROUP_FORM_PROPS = (vm: any) => {
  return [
    {
      tag: "select",
      prop: "type",
      label: "设备类型",
      placeholder: "请选择设备类型",
      options: []
    },
    {
      tag: "select",
      prop: "icon",
      label: "分组图标",
      placeholder: "请选择分组图标",
      options: []
    }
  ];
};
const GROUP_FORM_RULES = {
  type: { required: true, message: "请选择设备类型", trigger: "change" },
  icon: { required: true, message: "请选择分组图标", trigger: "change" }
};
const METHOD_COLUMNS = (vm: any) => [
  {
    title: "方法名称",
    key: "name"
  },
  {
    title: "参数",
    key: "params"
  },
  {
    operate: true,
    title: "操作",
    setBtns: (row: any) => {
      return [
        {
          label: "修改",
          handler: () => vm.editGroup(row)
        },
        {
          label: "删除",
          handler: () => vm.deleteGroup(row)
        }
      ];
    }
  }
];
const METHOD_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加方法",
        handler: () => vm.addMethod()
      }
    ]
  };
};

/**
 * 分组点位方法
 * @param vm
 * @constructor
 */
const GROUP_POINT_METHOD_COLUMNS = (vm: any) => [
  {
    title: "名称",
    key: "name"
  },

  {
    operate: true,
    title: "操作",
    setBtns: (row: any) => {
      return [
        {
          label: "方法绑定",
          handler: () => vm.methodBind(row)
        },
        {
          label: "上移",
          handler: () => vm.up(row)
        },
        {
          label: "下移",
          handler: () => vm.down(row)
        }
      ];
    }
  }
];
const DISPLAY_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加分组",
        handler: () => vm.addMethod()
      }
    ]
  };
};
/**
 * 展示
 * @param vm
 * @constructor
 */
const DISPLAY_COLUMNS = (vm: any) => [
  {
    title: "显示名称",
    key: "name"
  },

  {
    operate: true,
    title: "操作",
    setBtns: (row: any) => {
      return [
        {
          label: "修改",
          handler: () => vm.editDisplay(row)
        },
        {
          label: "添加点位类别",
          handler: () => vm.addPointType(row)
        },
        {
          label: "删除",
          handler: () => vm.deleteDisplay(row)
        }
      ];
    }
  }
];

class ConstConfig {
  vm: any;
  const: any;
  constructor(vm: any) {
    this.vm = vm;
    this.const = {
      DEVICE_TYPE_PROPS: DEVICE_TYPE_PROPS(vm),
      DEVICE_TYPE_RULES,
      DEVICE_TYPE_SEARCH_CONFIG: DEVICE_TYPE_SEARCH_CONFIG(vm),
      DEVICE_TYPE_COLUMN: DEVICE_TYPE_COLUMN(vm),
      GROUP_COLUMNS: GROUP_COLUMNS(vm),
      GROUP_SEARCH_CONFIG: GROUP_SEARCH_CONFIG(vm),
      METHOD_SEARCH_CONFIG: METHOD_SEARCH_CONFIG(vm),
      DEVICE_GROUP_SET_COLUMN: DEVICE_GROUP_SET_COLUMN(vm),
      GROUP_FORM_PROPS: GROUP_FORM_PROPS(vm),
      METHOD_COLUMNS: METHOD_COLUMNS(vm),
      GROUP_POINT_METHOD_COLUMNS: GROUP_POINT_METHOD_COLUMNS(vm),
      DISPLAY_COLUMNS: DISPLAY_COLUMNS(vm),
      DISPLAY_SEARCH_CONFIG: DISPLAY_SEARCH_CONFIG(vm),
      GROUP_FORM_RULES
    };
  }
}
export default ConstConfig;
