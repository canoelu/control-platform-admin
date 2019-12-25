const DEVICE_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      label: "设备名称",
      placeholder: "请输入设备名称"
    },
    {
      tag: "select",
      prop: "value",
      label: "设备类型",
      placeholder: "请选择设备类型",
      options: []
    }
  ];
};
const DEVICE_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加设备",
        handler: () => vm.addDevice()
      }
    ]
  };
};
const DEVICE_COLUMN = (vm: any) => [
  {
    title: "Id",
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
