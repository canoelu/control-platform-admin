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
          label: "背景图",
          value: 1
        },
        {
          label: "地图",
          value: 2
        }
      ]
    },
    {
      tag: "upload",
      prop: "bg",
      label: "背景图上传",
      placeholder: "背景图上传",
      show: `this.form.type===1`
    },
    {
      prop: "center",
      label: "地图中心点",
      placeholder: "地图中心点",
      show: `this.form.type===2`
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
/**
 * 搜索框
 * @param vm
 * @constructor
 */
const REGION_SEARCH_CONFIG = (vm: any) => {
  return {
    optBtns: [
      {
        label: "添加设备类别",
        handler: (vm: any) => vm.add
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
      REGION_COLUMN: REGION_COLUMN(vm)
    };
  }
}
export default ConstConfig;
