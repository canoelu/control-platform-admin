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
      <common-form
        ref="formRef"
        :form="deviceTypeForm"
        :rules="constant.DEVICE_TYPE_RULES"
        :props="constant.DEVICE_TYPE_PROPS"
        v-if="dialogObj.type === 'deviceType'"
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
import { saveProjectDevType, editProjectDevType, getProjectDevType, deleteProjectDevType } from "@/api/";
import groupDialog from "./groupDialog.vue";
import methodBindDialog from "./methodBindDialog.vue";
import projectMixin from "../../../mixin/projectMixin";
@Component({
  name: "index",
  components: { groupDialog, methodBindDialog }
})
export default class extends Mixins(projectMixin) {
  @Ref() formRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: false }) private dialogObj: any;
  deviceTypeForm: any = {
    name: ""
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
      let _data = this.deviceTypeForm;

      if (this.isAdd) {
        await saveProjectDevType(_data);
      } else {
        await editProjectDevType({
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
      let res = await getProjectDevType(info.id);
      this.loading = false;
      this.deviceTypeForm = res.data;
    } catch (e) {
      this.loading = false;
    }
  }

  methodBind() {}
  down() {}
  up() {}
  mounted() {
    let { info, type } = this.dialogObj;
    // 机构ID
    this.deviceTypeForm.orgId = this.orgId;
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
