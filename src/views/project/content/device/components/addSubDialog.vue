<!--添加子设备-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <div v-loading="loading">
      <common-form
        ref="formRef"
        :form="subDeviceForm"
        :rules="constant.SUB_DEVICE_RULES"
        :props="constant.SUB_DEVICE_PROPS"
      >
      </common-form>
      <div class="flexCenter" slot="footer">
        <el-button size="small" @click="handleClose">关闭</el-button>
        <el-button size="small" type="primary" @click="handleSave" :loading="saving">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import { addSubDevice, editProjectDevice, getProjectDevice } from "@/api/";
import projectMixin from "../../../mixin/projectMixin";

@Component({
  name: "index",
  components: {}
})
export default class extends Mixins(projectMixin) {
  @Ref() formRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: "" }) private deviceId?: number | string;
  @Prop({ default: false }) private dialogObj: any;
  uploading: boolean = false;
  map: any;
  subDeviceForm: any = {
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
      let _data = this.subDeviceForm;
      if (this.isAdd) {
        await addSubDevice(_data);
      } else {
        await editProjectDevice({
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
      let res = await getProjectDevice(info.id);
      this.loading = false;
      this.subDeviceForm = res.data;
    } catch (e) {
      this.loading = false;
    }
  }

  deleteGroup(row: any) {}
  mounted() {
    let { devType } = this.dialogObj;
    this.subDeviceForm.orgId = this.orgId;
    this.subDeviceForm.devTypeId = devType.id;
    this.subDeviceForm.deviceId = this.deviceId;
    this.loadDeviceType({
      page: 1,
      pageSize: 1000,
      orgId: this.orgId
    });
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
