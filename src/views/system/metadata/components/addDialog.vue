<!--图例管理-->
<template>
  <el-dialog
    class="goods-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="80%"
    :before-close="handleClose"
    append-to-body
  >
    <!--添加系统-->
    <common-form :props="constant.METADATA_SYSTEM_PROPS" />
    <!--添加设备-->
    <common-form :props="constant.METADATA_DEVICE_PROPS" />
    <!--添加点位-->
    <common-form :props="constant.METADATA_POINT_PROPS" />
    <div class="">
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
