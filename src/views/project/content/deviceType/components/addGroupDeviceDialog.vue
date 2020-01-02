<!--添加子设备类别-->
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
        :form="groupDevTypeForm"
        :rules="constant.GROUP_FORM_RULES"
        :props="constant.GROUP_FORM_PROPS"
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
import { saveGroupDevType, editGroupDevType, getPicList, getGroupDevType } from "@/api/";
import projectMixin from "../../../mixin/projectMixin";
import systemMixin from "../../../../mixin/systemMixin";
@Component({
  name: "index",
  components: {}
})
export default class extends Mixins(projectMixin, systemMixin) {
  @Ref() formRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: false }) private dialogObj!: any;
  @Prop({ default: () => {} }) private devType!: any;
  groupDevTypeForm: any = {};
  picList: any[] = [];
  saving: boolean = false;
  loading: boolean = false;
  get constant() {
    return new Const(this).const;
  }
  get isAdd() {
    return this.dialogObj.isAdd;
  }
  get iconArr() {
    return this.picList;
  }
  handleClose() {
    this.$emit("handleClose");
  }
  async save() {
    this.saving = true;
    try {
      let _data = this.groupDevTypeForm;

      if (this.isAdd) {
        await saveGroupDevType(_data);
      } else {
        await editGroupDevType({
          ..._data,
          id: this.dialogObj.info.id
        });
      }
      this.saving = false;
      this.$message.success("保存子设备类别成功");
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
  addMethod() {}
  methodBind() {}
  async getDetail() {
    try {
      this.loading = true;
      let { info, type } = this.dialogObj;
      let res = await getGroupDevType(info.id);
      this.loading = false;
      this.groupDevTypeForm = res.data;
    } catch (e) {
      this.loading = false;
    }
  }
  async getPicList() {
    let res = await getPicList();
    this.picList = res.data;
  }
  mounted() {
    let { info, type } = this.dialogObj;
    // 机构ID
    this.groupDevTypeForm.orgId = this.orgId;
    this.groupDevTypeForm.devTypeId = this.devType.id; // 设备类别ID
    this.getMetaDataDevice();
    this.getPicList();
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
