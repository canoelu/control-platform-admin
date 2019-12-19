const MAX_LEN = 60;
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
      prop: "name",
      maxLength: MAX_LEN,
      placeholder: "请输入系统名称",
      label: "系统名称"
    },
    {
      tag: "input",
      prop: "selfId",
      placeholder: "请输入标识ID",
      label: "标识ID"
    }
  ];
};
const METADATA_SYSTEM_RULES = {
  name: { required: true, message: "请输入系统名称", trigger: "blur" },
  selfId: [
    { required: true, message: "请输入标识ID", trigger: "blur" },
    {
      trigger: "blur",
      validator: (rule: any, value: any, callback: any) => {
        if (/^\+?[1-9][0-9]*$/.test(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      }
    }
  ]
};
const METADATA_DEVICE_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      maxLength: MAX_LEN,
      placeholder: "请输入设备类型名称",
      label: "设备类型名称"
    },
    {
      tag: "input",
      prop: "selfId",
      maxLength: MAX_LEN,
      label: "请输入标识ID",
      placeholder: "标识ID"
    }
  ];
};
const METADATA_DEVICE_RULES = {
  name: { required: true, message: "请输入设备类型名称", trigger: "blur" },
  selfId: [
    { required: true, message: "请输入标识ID", trigger: "blur" },
    {
      trigger: "blur",
      validator: (rule: any, value: any, callback: any) => {
        if (/^\+?[1-9][0-9]*$/.test(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      }
    }
  ]
};
const METADATA_POINT_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      maxLength: MAX_LEN,
      placeholder: "请输入点位名称",
      label: "点位名称"
    },
    {
      tag: "input",
      prop: "selfId",
      maxLength: MAX_LEN,
      label: "标识ID",
      placeholder: "请输入标识ID"
    },
    {
      tag: "select",
      prop: "pointType",
      label: "类型",
      placeholder: "请选择类型",
      options: POINT_TYPES
    }
  ];
};
const METADATA_POINT_RULES = {
  name: { required: true, message: "请输入点位名称", trigger: "blur" },
  selfId: [
    { required: true, message: "请输入标识ID", trigger: "blur" },
    {
      trigger: "blur",
      validator: (rule: any, value: any, callback: any) => {
        if (/^\+?[1-9][0-9]*$/.test(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      }
    }
  ],
  pointType: { required: true, message: "请选择类型", trigger: "change" }
};
const METADATA_SEARCH_CONFIG = (vm: any) => {
  return {
    addBtn: {
      label: "添加系统",
      handler: () => vm.handleShowDialog()
    }
  };
};
const METADATA_COLUMN = (vm: any) => [
  {
    title: "id",
    key: "id",
    width: 80
  },
  {
    title: "名称",
    key: "name"
  },
  {
    title: "标志ID",
    key: "selfId"
  },
  {
    title: "操作",
    operate: true,
    setBtns: (row: any) => {
      let editBtn = { label: "修改", handler: () => vm.edit(row) };
      let deleteBtn = { label: "删除", handler: () => vm.delete(row) };
      let addPointBtn = {
        label: "添加点位类型",
        handler: () => vm.addPoint(row)
      };
      let addDeviceBtn = {
        label: "添加设备类型",
        handler: () => vm.addDevice(row)
      };
      let _arr: any[] = [editBtn, deleteBtn];
      if (row.categoryTypeId === 1) {
        _arr.push(addDeviceBtn);
      } else if (row.categoryTypeId === 2) {
        _arr.push(addPointBtn);
      }

      return _arr;
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
      METADATA_COLUMN: METADATA_COLUMN(vm),
      METADATA_SYSTEM_RULES,
      METADATA_DEVICE_RULES,
      METADATA_POINT_RULES
    };
  }
}
export default ConstConfig;
