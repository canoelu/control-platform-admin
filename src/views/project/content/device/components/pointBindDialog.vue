<!--点位绑定-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <search-table :tableColumns="constant.POINT_COLUMNS" :searchConfig="constant.POINT_SEARCH_CONFIG"></search-table>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
@Component({
  name: "index",
  components: {}
})
export default class extends Vue {
  @Ref() formRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: false }) private dialogObj: any;
  get constant() {
    return new Const(this).const;
  }
  handleClose() {
    this.$emit("handleClose");
  }
  bind() {}
  addDevice() {}
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
