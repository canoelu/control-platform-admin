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
      label: "名称",
      placeholder: "系统名称"
    },
    {
      tag: "select",
      prop: "type",
      label: "类型",
      placeholder: "系统类别",
      options: []
    }
  ];
};
const SYSTEM_ROOT_NODE_RULES = {
  name: { required: true, message: "请输入名称", trigger: "blur" },
  type: { required: true, message: "请选择类型", trigger: "change" }
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
        label: "添加根节点",
        handler: () => vm.addRootNode()
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
class ConstConfig {
  vm: any;
  const: any;
  constructor(vm: any) {
    this.vm = vm;
    this.const = {
      SYSTEM_ROOT_NODE_PROPS: SYSTEM_ROOT_NODE_PROPS(vm),
      SYSTEM_SEARCH_CONFIG: SYSTEM_SEARCH_CONFIG(vm),
      SYSTEM_COLUMN: SYSTEM_COLUMN(vm),
      SYSTEM_ROOT_NODE_RULES
    };
  }
}
export default ConstConfig;
