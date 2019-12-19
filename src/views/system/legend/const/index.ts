const MAX_LEN = 60;
const LEGEND_PROPS = (vm: any) => {
  return [
    {
      tag: "select",
      prop: "area",
      placeholder: "请选择",
      label: "选择状态",
      options: [
        {
          label: "运行",
          value: 1
        },
        {
          label: "关闭",
          value: 2
        },
        {
          label: "告警",
          value: 3
        },
        {
          label: "异常",
          value: 4
        }
      ]
    },
    {
      tag: "input",
      prop: "name",
      maxLength: MAX_LEN,
      placeholder: "请输入图例名称",
      label: "图例名称"
    },
    {
      prop: "deal"
    },
    {
      tag: "input",
      type: "textarea",
      prop: "code",
      rows: 6,
      label: "图例代码",
      placeholder: "请输入图例代码"
    }
  ];
};
const LEGEND_RULES = {
  area: { required: true, message: "请选择状态", trigger: "change" },
  name: { required: true, message: "请输入图例名称", trigger: "blur" },
  code: { required: true, message: "请输入图例代码", trigger: "blur" }
};
const LEGEND_SEARCH_CONFIG = (vm: any) => {
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
      label: "添加图例",
      handler: () => vm.addLegend()
    }
  };
};
const LEGEND_COLUMN = (vm: any) => [
  {
    title: "id",
    key: "id"
  },
  {
    title: "名称",
    key: "name"
  },
  {
    title: "状态",
    key: "status"
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
      LEGEND_PROPS: LEGEND_PROPS(vm),
      LEGEND_SEARCH_CONFIG: LEGEND_SEARCH_CONFIG(vm),
      LEGEND_COLUMN: LEGEND_COLUMN(vm),
      LEGEND_RULES
    };
  }
}
export default ConstConfig;
