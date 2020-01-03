const MAX_LEN = 60;

const DEVICE_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      maxLength: MAX_LEN,
      label: "设备名称",
      placeholder: "请输入设备名称"
    },
    {
      tag: "select",
      prop: "devTypeId",
      label: "设备类别",
      placeholder: "请选择设备类别",
      options: vm.deviceTypeList,
      keyProp: {
        value: "id",
        label: "name"
      }
    }
  ];
};
const DEVICE_RULES = {
  name: { required: true, message: "请输入设备名称", trigger: "blur" },
  devTypeId: { required: true, message: "请选择设备类别", trigger: "change" }
};
const SUB_DEVICE_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      maxLength: MAX_LEN,
      label: "子设备名称",
      placeholder: "请输入子设备名称"
    }
  ];
};
const SUB_DEVICE_RULES = {
  name: { required: true, message: "请输入子设备名称", trigger: "blur" }
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

const POINT_COLUMNS = (vm: any) => {
  return [
    {
      title: "名称",
      key: "name"
    },
    {
      title: "以绑定点位",
      key: "pointName"
    },
    {
      title: "操作",
      operate: true,
      setBtns: (row: any, idx: number) => {
        if (!row.devTypeId) {
          return [
            {
              label: "绑定",
              handler: () => vm.bind(row)
            }
          ];
        } else {
          return [];
        }
      }
    }
  ];
};
const POINT_LIST_SEARCH_CONFIG = (vm: any) => {
  return {
    props: [
      {
        tag: "input",
        prop: "keyWord",
        placeholder: "请输入ID或点位名称"
      }
    ]
  };
};
const POINT_LIST_COLUMNS = (vm: any) => {
  return [
    {
      title: "ID",
      key: "id"
    },
    {
      title: "标识",
      key: "code"
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
            label: "选择",
            handler: () => vm.choose(row)
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
      POINT_LIST_SEARCH_CONFIG: POINT_LIST_SEARCH_CONFIG(vm),
      POINT_LIST_COLUMNS: POINT_LIST_COLUMNS(vm),
      SUB_DEVICE_PROPS: SUB_DEVICE_PROPS(vm),
      SUB_DEVICE_RULES
    };
  }
}
export default ConstConfig;
