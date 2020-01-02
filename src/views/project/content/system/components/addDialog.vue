<!--添加系统-->
<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <div v-loading="loading">
      <common-form
        ref="formRef"
        :form="systemForm"
        :rules="constant.SYSTEM_ROOT_NODE_RULES"
        :props="constant.SYSTEM_ROOT_NODE_PROPS"
      >
      </common-form>
      <div class="flexCenter">
        <el-button size="small" @click="handleClose">关闭</el-button>
        <el-button size="small" type="primary" @click="handleSave" :loading="saving">保存</el-button>
      </div>
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
  async save() {
    this.saving = true;
    try {
      let _data = this.systemForm;
      if (this.isAdd) {
        await saveProjectSystem(_data);
      } else {
        await editProjectSystem({
          ..._data,
          id: this.dialogObj.info.id
        });
      }
      this.saving = false;
      this.$message.success("保存系统成功");
      this.$emit("handleClose");
      this.$emit("getTblList");
    } catch (e) {
      this.saving = false;
    }
  }
  handleSave() {
    let _formRef: any = this.formRef.$refs.formRef;
    _formRef.validate((valid: boolean) => {
      if (valid) {
        this.save();
      }
    });
  }
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
    this.getMetaDataSystem();

    this.systemForm.orgId = this.orgId;
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
