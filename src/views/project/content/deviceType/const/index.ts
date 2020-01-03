const MAX_LEN = 60;

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
      maxLength: MAX_LEN,
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
    width: 120
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
          label: "子设备类别配置",
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
    key: "categoryName"
  },
  {
    title: "图标",
    key: "url",
    render(h: any, row: any) {
      return h("img", { attrs: { src: row.url } });
    }
  },
  {
    operate: true,
    title: "操作",
    setBtns: (row: any) => {
      return [
        {
          label: "修改",
          handler: () => vm.editMethod(row)
        },
        {
          label: "删除",
          handler: () => vm.deleteMethod(row)
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
      prop: "sysCategoryId",
      label: "设备类型",
      placeholder: "请选择设备类型",
      options: vm.deviceCategory,
      keyProp: {
        value: "id",
        label: "name"
      }
    },
    {
      tag: "select",
      prop: "url",
      label: "分组图标",
      placeholder: "请选择分组图标",
      options: vm.iconArr,
      keyProp: {
        value: "url",
        label: "name"
      }
    }
  ];
};
const GROUP_FORM_RULES = {
  sysCategoryId: { required: true, message: "请选择设备类型", trigger: "change" },
  url: { required: true, message: "请选择分组图标", trigger: "change" }
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
          handler: () => vm.editMethod(row)
        },
        {
          label: "删除",
          handler: () => vm.deleteMethod(row)
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
    key: "categoryName",
    formatter(val: any, idx: number, row: any) {
      return row.categoryName || row.name;
    }
  },
  {
    operate: true,
    title: "操作",
    setBtns: (row: any) => {
      return [
        {
          label: "方法绑定",
          handler: () => vm.methodBind(row)
        }
      ];
    }
  }
];
const DISPLAY_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加点位分组",
        handler: () => vm.addDisplayGroup()
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
      let _editGroup = { label: "修改分组", handler: () => vm.editDisplay(row) };
      let _editPoint = { label: "修改点位类别", handler: () => vm.editPointType(row) };
      let _addPoint = { label: "添加点位类别", handler: () => vm.addPointType(row) };
      let _delGroup = { label: "删除分组", handler: () => vm.deleteGroup(row) };
      let _delPoint = { label: "解绑", handler: () => vm.deletePointType(row) };
      let _arr = [];
      if (row.children) {
        _arr = [_editGroup, _addPoint, _delGroup];
      } else {
        return [_editPoint, _delPoint];
      }
      return _arr;
    }
  }
];
const DISPLAY_GROUP_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      label: "显示名称",
      placeholder: "请输入显示名称"
    },
    {
      tag: "select",
      prop: "styleType",
      label: "显示类别",
      placeholder: "请选择显示类别",
      options: vm.styleList,
      keyProp: {
        label: "name",
        value: "id"
      }
    }
  ];
};
const DISPLAY_GROUP_RULES = {
  name: { required: true, message: "请输入显示名称", trigger: "blur" },
  style: { required: true, message: "请选择显示类别", trigger: "change" }
};
const DISPLAY_POINT_PROPS = (vm: any) => {
  return [
    {
      tag: "select",
      prop: "categoryTypeId",
      label: "点位类型",
      placeholder: "请选择点位类型",
      options: vm.pointCategory,
      keyProp: {
        label: "name",
        value: "id"
      }
    }
  ];
};
const DISPLAY_POINT_RULES = {
  categoryTypeId: { required: true, message: "请选择点位类型", trigger: "change" }
};
const METHOD_FORM_PROPS = (vm: any) => {
  return [
    {
      tag: "select",
      prop: "funcId",
      label: "系统方法",
      placeholder: "请选择系统方法",
      options: vm.methodList,
      keyProp: {
        value: "id",
        label: "name"
      },
      change: vm.changeSysFunc
    },
    {
      tag: "input",
      prop: "name",
      label: "名称",
      placeholder: "请输入方法名称"
    },
    {
      tag: "input",
      prop: "params",
      label: "参数",
      placeholder: "请输入参数"
    }
  ];
};
const METHOD_FORM_RULES = {
  params: { required: true, message: "请输入参数", trigger: "blur" },
  name: { required: true, message: "请输入方法名称", trigger: "blur" },
  funcId: { required: true, message: "请选择方法名称", trigger: "change" }
};
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
      GROUP_FORM_RULES,
      DISPLAY_GROUP_PROPS: DISPLAY_GROUP_PROPS(vm),
      DISPLAY_GROUP_RULES,
      DISPLAY_POINT_PROPS: DISPLAY_POINT_PROPS(vm),
      DISPLAY_POINT_RULES,
      METHOD_FORM_PROPS: METHOD_FORM_PROPS(vm),
      METHOD_FORM_RULES
    };
  }
}
export default ConstConfig;
