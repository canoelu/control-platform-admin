const DEVICE_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "identify",
      label: "标识",
      placeholder: "请输入标识"
    },
    {
      tag: "input",
      prop: "name",
      label: "名称",
      placeholder: "请输入名称"
    },
    {
      tag: "input",
      prop: "value",
      placeholder: "当前值"
    }
  ];
};
const DEVICE_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加点位",
        handler: (vm: any) => vm.addDEVICE
      },
      {
        label: "导入点位",
        handler: (vm: any) => vm.importDEVICE
      }
    ]
  };
};
const DEVICE_COLUMN = (vm: any) => [
  {
    title: "id",
    key: "id"
  },
  {
    title: "设备名称",
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
          label: "点位绑定",
          handler: () => vm.bindPoint(row)
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
      DEVICE_PROPS: DEVICE_PROPS(vm),
      DEVICE_SEARCH_CONFIG: DEVICE_SEARCH_CONFIG(vm),
      DEVICE_COLUMN: DEVICE_COLUMN(vm)
    };
  }
}
export default ConstConfig;
