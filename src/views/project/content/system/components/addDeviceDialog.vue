<!--添加设备-->
<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="62.5%"
    :before-close="handleClose"
    append-to-body
  >
    <search-table :searchConfig="constant.DEVICE_CHOOSE_SEARCH_CONFIG" :tableColumns="constant.DEVICE_CHOOSE_COLUMN" />
    <div class="flexCenter" slot="footer">
      <el-button size="small" @click="handleClose">关闭</el-button>
      <el-button size="small" type="primary" @click="handleSave">保存</el-button>
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
  choose() {}
  search() {}
  async getDetail() {
    try {
      this.loading = true;
      let { info, type } = this.dialogObj;
      let res = await getProjectSystem(info.id);
      this.loading = false;
      this.systemForm = res.data;
    } catch (e) {
      this.loading = false;
    }
  }

  created() {
    this.getMetaDataList();

    this.systemForm.orgId = this.orgId;
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
