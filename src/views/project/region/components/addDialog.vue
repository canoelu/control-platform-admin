<!--图例管理-->
<template>
  <el-dialog>
    <!--添加设备类型-->
    <common-form :props="constant.REGION_PROPS" />
    <div class="">
      <el-button size="small">关闭</el-button>
      <el-button size="small" type="primary">保存</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Const from "../const";
@Component({
  name: "index",
  components: {}
})
export default class extends Vue {
  get constant() {
    return new Const(this).const;
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
