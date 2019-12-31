const MAX_LEN = 60;
const TYPE_ARR = [
  {
    label: "设备类别",
    value: 1
  },
  {
    label: "点位类别",
    value: 2
  }
];
const METHOD_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      maxLength: MAX_LEN,
      label: "方法名称",
      placeholder: "请输入方法名称"
    },
    {
      tag: "input",
      prop: "code",
      maxLength: MAX_LEN,
      label: "标识ID",
      placeholder: "请输入标识ID"
    },
    {
      tag: "select",
      prop: "type",
      placeholder: "请选择类别",
      label: "类别",
      options: TYPE_ARR
    },
    {
      tag: "input",
      type: "textarea",
      rows: 5,
      prop: "paramsTemplate",
      placeholder: "请输入参数模板",
      label: "参数模板"
    }
  ];
};
const METHOD_RULES = (vm: any) => {
  return {
    name: { required: true, message: "请输入点位名称", trigger: "blur" },
    type: { required: true, message: "请选择类别", trigger: "change" },
    paramsTemplate: { required: true, message: "请输入参数模板", trigger: "blur" },
    code: [
      { required: true, message: "请输入标识ID", trigger: "blur" },
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
    ]
  };
};
const METHOD_SEARCH_CONFIG = (vm: any) => {
  return {
    addBtn: {
      label: "添加方法",
      handler: () => vm.addMethod()
    }
  };
};
const METHOD_COLUMN = (vm: any) => [
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
    title: "类别",
    key: "type",
    formatter(val: any) {
      return val === 1 ? "设备类别" : "点位类别";
    }
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
      METHOD_PROPS: METHOD_PROPS(vm),
      METHOD_RULES: METHOD_RULES(vm),
      METHOD_SEARCH_CONFIG: METHOD_SEARCH_CONFIG(vm),
      METHOD_COLUMN: METHOD_COLUMN(vm)
    };
  }
}
export default ConstConfig;
