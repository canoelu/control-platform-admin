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
        handler: (vm: any) => vm.add
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
    title: "id",
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
          label: "设备分组配置",
          handler: () => vm.groupSet(row)
        },
        {
          label: "方法配置",
          handler: () => vm.methodSet(row)
        },
        {
          label: "展示配置",
          handler: () => vm.delete(row)
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
class ConstConfig {
  vm: any;
  const: any;
  constructor(vm: any) {
    this.vm = vm;
    this.const = {
      DEVICE_TYPE_PROPS: DEVICE_TYPE_PROPS(vm),
      DEVICE_TYPE_SEARCH_CONFIG: DEVICE_TYPE_SEARCH_CONFIG(vm),
      DEVICE_TYPE_COLUMN: DEVICE_TYPE_COLUMN(vm),
      DEVICE_GROUP_SET_COLUMN: DEVICE_GROUP_SET_COLUMN(vm)
    };
  }
}
export default ConstConfig;
