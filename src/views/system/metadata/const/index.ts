const POINT_TYPES = [
  {
    label: "只读",
    value: 1
  },
  {
    label: "只写",
    value: 2
  },
  {
    label: "可读可写",
    value: 3
  }
];
const METADATA_SYSTEM_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "typeName",
      placeholder: "请输入系统类别",
      label: "系统类别"
    },
    {
      tag: "input",
      prop: "id",
      placeholder: "标识ID"
    }
  ];
};
const METADATA_DEVICE_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "deviceName",
      placeholder: "请输入设备类型名称",
      label: "设备类型名称"
    },
    {
      tag: "input",
      prop: "id",
      placeholder: "标识ID"
    }
  ];
};
const METADATA_POINT_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "pointName",
      placeholder: "请输入点位名称",
      label: "点位名称"
    },
    {
      tag: "input",
      prop: "id",
      label: "标识ID",
      placeholder: "标识ID"
    },
    {
      tag: "select",
      prop: "type",
      label: "类型",
      placeholder: "请选择类型",
      options: POINT_TYPES
    }
  ];
};
const METADATA_SEARCH_CONFIG = (vm: any) => {
  return {
    addBtn: {
      label: "添加系统",
      handler: () => vm.addSystem()
    }
  };
};
const METADATA_COLUMN = (vm: any) => [
  {
    title: "id",
    key: "id"
  },
  {
    title: "名称",
    key: "name"
  },
  {
    title: "标志ID",
    key: "status"
  },
  {
    title: "操作",
    operate: true,
    setBtns: (row: any) => {
      let editBtn = { label: "修改", handler: () => vm.edit(row) };
      let deleteBtn = { label: "删除", handler: () => vm.delete(row) };
      let addDeviceBtn = {
        label: "添加设备类型",
        handler: () => vm.addDevice(row)
      };
      let addPointBtn = {
        label: "添加点位类型",
        handler: () => vm.addPoint(row)
      };
      return [editBtn, deleteBtn, addDeviceBtn, addPointBtn];
    }
  }
];
class ConstConfig {
  vm: any;
  const: any;
  constructor(vm: any) {
    this.vm = vm;
    this.const = {
      METADATA_SYSTEM_PROPS: METADATA_SYSTEM_PROPS(vm),
      METADATA_DEVICE_PROPS: METADATA_DEVICE_PROPS(vm),
      METADATA_SEARCH_CONFIG: METADATA_SEARCH_CONFIG(vm),
      METADATA_POINT_PROPS: METADATA_POINT_PROPS(vm),
      METADATA_COLUMN: METADATA_COLUMN(vm)
    };
  }
}
export default ConstConfig;
