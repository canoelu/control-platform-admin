<!--图例管理-->
<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <common-form :form="legendForm" :rules="constant.LEGEND_RULES" :props="constant.LEGEND_PROPS" />
    <div class="flexCenter">
      <el-button size="small">关闭</el-button>
      <el-button size="small" type="primary">保存</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Const from "../const/";
@Component({
  name: "index",
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) private dialogObj: any;
  legendForm: any = {};
  get constant() {
    return new Const(this).const;
  }
  handleClose() {
    this.$emit("handleClose");
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
