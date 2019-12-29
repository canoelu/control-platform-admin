<!--设备类型管理-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="62.5%"
    :before-close="handleClose"
    append-to-body
  >
    <div v-loading="loading">
      <common-form ref="formRef" :form="pointsForm" :rules="constant.POINT_RULES" :props="constant.POINT_PROPS">
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
import { saveProjectPoints, editProjectPoints, getProjectPoints } from "@/api/";
import projectMixin from "../../../mixin/projectMixin";

@Component({
  name: "index",
  components: {}
})
export default class extends Mixins(projectMixin) {
  @Ref() formRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: false }) private dialogObj: any;
  pointsForm: any = {
    name: "",
    code: "",
    value: ""
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
      let _data = this.pointsForm;
      if (this.isAdd) {
        await saveProjectPoints(_data);
      } else {
        await editProjectPoints({
          ..._data,
          id: this.dialogObj.info.id
        });
      }
      this.saving = false;
      this.$message.success("保存设备类别成功");
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
      let res = await getProjectPoints(info.id);
      this.loading = false;
      this.pointsForm = res.data;
    } catch (e) {
      this.loading = false;
    }
  }
  mounted() {
    this.pointsForm.orgId = this.orgId;
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
