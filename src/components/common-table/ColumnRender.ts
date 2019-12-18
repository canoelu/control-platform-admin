export default {
  functional: true,
  inheritAttrs: false,
  props: {
    prop: String,
    row: Object,
    index: Number,
    column: {
      type: Object,
      default: null
    },
    render: Function
  },
  render: (h: any, ctx: any) => {
    return ctx.props.render(h, ctx.props.row, ctx.props.index);
  }
};
