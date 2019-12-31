const MAX_LEN = 60;
const POINT_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "code",
      label: "标识",
      maxLength: MAX_LEN,
      placeholder: "请输入标识"
    },
    {
      tag: "input",
      prop: "name",
      label: "名称",
      maxLength: MAX_LEN,
      placeholder: "请输入名称"
    },
    {
      tag: "input",
      prop: "value",
      label: "当前值",
      maxLength: MAX_LEN,
      placeholder: "请输入当前值"
    }
  ];
};
const POINT_RULES = {
  name: { required: true, message: "请输入名称", trigger: "blur" },
  code: [
    { required: true, message: "请输入标识", trigger: "blur" },
    {
      trigger: "blur",
      validator: (rule: any, value: any, callback: any) => {
        if (/^\+?[1-9][0-9]*$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));
        }
      }
    }
  ],
  value: { required: true, message: "请输入当前值", trigger: "blur" }
};
const POINT_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加点位",
        handler: () => vm.addPoint()
      },
      {
        label: "导入点位",
        handler: () => vm.importPoint()
      }
    ]
  };
};
const POINT_COLUMN = (vm: any) => [
  {
    title: "id",
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
    title: "当前值",
    key: "value"
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
      POINT_PROPS: POINT_PROPS(vm),
      POINT_SEARCH_CONFIG: POINT_SEARCH_CONFIG(vm),
      POINT_COLUMN: POINT_COLUMN(vm),
      POINT_RULES
    };
  }
}
export default ConstConfig;
