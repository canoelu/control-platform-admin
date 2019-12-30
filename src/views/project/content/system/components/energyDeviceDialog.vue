<!--能源设备管理-->
<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="62.5%"
    :before-close="handleClose"
    append-to-body
  >
    <search-table ref="tblRef" :tableColumns="constant.ENERGY_DEVICE_COLUMN" />
    <div class="flexCenter" slot="footer">
      <el-button size="small" @click="handleAdd">添加</el-button>
      <el-button size="small" type="primary" @click="handleClose" :loading="saving">取消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import { saveProjectSystem, editProjectSystem, getProjectSystem } from "@/api/";
import projectMixin from "../../../mixin/projectMixin";
import systemMixin from "../../../../mixin/systemMixin";

@Component({
  name: "index",
  components: {}
})
export default class extends Mixins(projectMixin, systemMixin) {
  @Ref() formRef: any;
  @Prop({ default: false }) private dialogObj: any;
  uploading: boolean = false;
  loadingCode: boolean = false;
  systemForm: any = {
    codes: ""
  };
  saving: boolean = false;
  loading: boolean = false;
  get constant() {
    return new Const(this).const;
  }
  get isAdd() {
    return this.dialogObj.isAdd;
  }
  handleClose() {
    this.$emit("handleClose");
  }
  handleAdd() {}

  created() {
    this.getMetaDataList();
    this.systemForm.orgId = this.orgId;
    if (!this.isAdd) {
    }
  }
}
</script>

<style scoped lang="scss"></style>
