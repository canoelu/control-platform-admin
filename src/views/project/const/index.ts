const PROJECT_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "proName",
      label: "项目名称",
      placeholder: "请输入项目名称"
    },
    {
      tag: "input",
      prop: "code",
      label: "机构代码",
      placeholder: "请输入机构代码"
    },
    {
      tag: "upload",
      prop: "bgImg",
      action: "",
      label: "背景图",
      placeholder: "背景图"
    }
  ];
};
const PROJECT_RULES = (vm: any) => {
  return {
    proName: { required: true, message: "请输入项目名称", trigger: "blur" },
    code: { required: true, message: "请输入机构代码", trigger: "blur" }
  };
};
const PROJECT_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加项目",
        handler: () => vm.addProject()
      }
    ]
  };
};
const PROJECT_COLUMN = (vm: any) => [
  {
    title: "ID",
    key: "id",
    width: 80
  },
  {
    title: "项目名称",
    key: "proName"
  },
  {
    title: "机构代码",
    key: "code"
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
        },
        {
          label: "项目内容",
          handler: () => vm.handleProContent(row)
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
      PROJECT_PROPS: PROJECT_PROPS(vm),
      PROJECT_RULES: PROJECT_RULES(vm),
      PROJECT_SEARCH_CONFIG: PROJECT_SEARCH_CONFIG(vm),
      PROJECT_COLUMN: PROJECT_COLUMN(vm)
    };
  }
}
export default ConstConfig;
