/**
 * 添加设备类别
 * @param vm
 * @constructor
 */
const REGION_PROPS = (vm: any) => {
  return [
    {
      tag: "input",
      prop: "name",
      label: "名称",
      placeholder: "请输入名称"
    },
    {
      tag: "select",
      prop: "type",
      label: "类型",
      placeholder: "请选择类型",
      options: [
        {
          label: "地图",
          value: 2
        },
        {
          label: "背景图",
          value: 1
        }
      ]
    },
    {
      prop: "url",
      label: "背景图上传",
      placeholder: "背景图上传",
      show: `this.form.type===1`
    },
    {
      prop: "center",
      label: "地图中心点",
      placeholder: "地图中心点",
      show: `this.form.type===2`,
      tip: "请拖动中心图标设置地图中心点"
    },
    {
      tag: "input",
      prop: "zoom",
      label: "初始倍数",
      placeholder: "初始倍数",
      show: `this.form.type===2`
    }
  ];
};
const REGION_RULES = (vm: any) => {
  return {
    name: { required: true, trigger: "blur", message: "请输入名称" },
    zoom: { required: true, trigger: "blur", message: "请输入初始倍数" },
    latitude: { required: true, trigger: "change", message: "地图中心" },
    longitude: { required: true, trigger: "change", message: "地图中心" },
    type: { required: true, trigger: "change", message: "请选择类型" },
    bg: { required: true, trigger: "change", message: "请上传背景图" }
  };
};
/**
 * 搜索框
 * @param vm
 * @constructor
 */
const REGION_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加区域",
        handler: () => vm.add()
      }
    ]
  };
};
/**
 * 设备类型表格
 * @param vm
 * @constructor
 */
const REGION_COLUMN = (vm: any) => [
  {
    title: "名称",
    key: "name"
  },
  {
    title: "操作",
    operate: true,
    setBtns: (row: any) => {
      // todo 根据区域来设置按钮
      return [
        {
          label: "修改",
          handler: () => vm.edit(row)
        },
        {
          label: "添加子区域",
          handler: () => vm.addChildRegion(row)
        },
        {
          label: "删除",
          handler: () => vm.delete(row)
        },
        {
          label: "上移",
          handler: () => vm.up(row)
        },
        { label: "下移", handler: () => vm.down(row) }
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
      REGION_PROPS: REGION_PROPS(vm),
      REGION_SEARCH_CONFIG: REGION_SEARCH_CONFIG(vm),
      REGION_COLUMN: REGION_COLUMN(vm),
      REGION_RULES: REGION_RULES(vm)
    };
  }
}
export default ConstConfig;
