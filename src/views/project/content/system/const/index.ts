const MAX_LEN = 60;

/**
 * 添加根节点
 * @param vm
 * @constructor
 */
const SYSTEM_ROOT_NODE_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      label: "系统名称",
      maxLength: MAX_LEN,
      placeholder: "请选择系统名称"
    },
    {
      tag: "select",
      prop: "categoryId",
      label: "系统类别",
      placeholder: "请选择系统类别",
      options: vm.systemCategory,
      keyProp: {
        value: "id",
        label: "name"
      }
    }
  ];
};
const SYSTEM_ROOT_NODE_RULES = {
  name: { required: true, message: "请输入名称", trigger: "blur" },
  categoryId: { required: true, message: "请选择类型", trigger: "change" }
};
/**
 * 搜索框
 * @param vm
 * @constructor
 */
const SYSTEM_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加系统",
        handler: () => vm.addSystem()
      }
    ]
  };
};
/**
 * 系统类型表格
 * @param vm
 * @constructor
 */
const SYSTEM_COLUMN = (vm: any) => [
  {
    title: "Id",
    key: "id"
  },
  {
    title: "名称",
    key: "name"
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
        },
        {
          label: "描点",
          handler: () => vm.drawPoint(row)
        }
      ];
    }
  }
];
const ENERGY_DEVICE_COLUMN = (vm: any) => [
  {
    title: "名称",
    key: "name"
  },
  {
    title: "能耗计算公式",
    key: "energyCal"
  },
  {
    title: "关联设备",
    key: "relateDevice"
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
const DEVICE_CHOOSE_SEARCH_CONFIG = (vm: any) => {
  return {
    props: [
      {
        tag: "input",
        prop: "name",
        placeholder: "设备名称"
      }
    ],
    optBtns: [
      {
        label: "搜索",
        handler: () => vm.search()
      }
    ]
  };
};
const DEVICE_CHOOSE_COLUMN = (vm: any) => [
  {
    title: "ID",
    key: "id"
  },
  {
    title: "设备名称",
    key: "name"
  },
  {
    title: "设备类别",
    key: "devTypeName"
  },
  {
    title: "操作",
    operate: true,
    setBtns: (row: any) => {
      return [
        {
          label: "选用",
          handler: () => vm.choose(row)
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
      SYSTEM_ROOT_NODE_PROPS: SYSTEM_ROOT_NODE_PROPS(vm),
      SYSTEM_SEARCH_CONFIG: SYSTEM_SEARCH_CONFIG(vm),
      SYSTEM_COLUMN: SYSTEM_COLUMN(vm),
      ENERGY_DEVICE_COLUMN: ENERGY_DEVICE_COLUMN(vm),
      DEVICE_CHOOSE_SEARCH_CONFIG: DEVICE_CHOOSE_SEARCH_CONFIG(vm),

      DEVICE_CHOOSE_COLUMN: DEVICE_CHOOSE_COLUMN(vm),
      SYSTEM_ROOT_NODE_RULES
    };
  }
}
export default ConstConfig;
