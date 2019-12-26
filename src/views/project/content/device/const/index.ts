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
      prop: "type",
      label: "设备类别",
      placeholder: "请选择设备类别",
      options: []
    }
  ];
};
const DEVICE_RULES = {
  name: { required: true, message: "请输入设备名称", trigger: "blur" },
  type: { required: true, message: "请选择设备类别", trigger: "change" }
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
const POINT_SEARCH_CONFIG=(vm:any)=>{
  return {
    optBtns: [
      {
        label: "添加设备",
        handler: () => vm.addDevice()
      }
    ]
  }
}
const POINT_COLUMNS = (vm: any) => {
  return [
    {
      title: "名称",
      key: "name"
    },
    {
      title: "以绑定点位",
      key: "name"
    },
    {
      title: "操作",
      operate: true,
      setBtns: (row: any) => {
        return [
          {
            label: "绑定",
            handler: () => vm.bind(row)
          }
        ];
      }
    }
  ];
};
class ConstConfig {
  vm: any;
  const: any;
  constructor(vm: any) {
    this.vm = vm;
    this.const = {
      DEVICE_PROPS: DEVICE_PROPS(vm),
      DEVICE_RULES,
      DEVICE_SEARCH_CONFIG: DEVICE_SEARCH_CONFIG(vm),
      DEVICE_COLUMN: DEVICE_COLUMN(vm),
      POINT_COLUMNS: POINT_COLUMNS(vm),
      POINT_SEARCH_CONFIG: POINT_SEARCH_CONFIG(vm),
    };
  }
}
export default ConstConfig;
