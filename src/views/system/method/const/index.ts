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
      label: "方法名称",
      placeholder: "请输入方法名称"
    },
    {
      tag: "input",
      prop: "identifyId",
      label: "标识ID",
      placeholder: "请输入标识ID"
    },
    {
      tag: "select",
      prop: "area",
      placeholder: "请选择类别",
      label: "类别",
      options: TYPE_ARR
    },
    {
      tag: "textarea",
      prop: "code",
      placeholder: "参数模板"
    }
  ];
};
const METHOD_SEARCH_CONFIG = (vm: any) => {
  return {
    props: [
      {
        tag: "select",
        prop: "area",
        placeholder: "设备类别筛选",
        options: []
      }
    ],
    addBtn: {
      label: "添加方法",
      handler: (vm: any) => vm.addMethod
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
    key: "identify"
  },
  {
    title: "名称",
    key: "name"
  },
  {
    title: "类别",
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
      METHOD_SEARCH_CONFIG: METHOD_SEARCH_CONFIG(vm),
      METHOD_COLUMN: METHOD_COLUMN(vm)
    };
  }
}
export default ConstConfig;
