<!--图例管理-->
<template>
  <el-dialog :before-close="handleClose" :title="dialogObj.title" :visible.sync="dialogObj.show" width="50%">
    <div v-loading="loading">
      <!--添加系统-->
      <common-form
        ref="formRef"
        v-if="dialogObj.type === 1"
        :form="systemForm"
        :rules="constant.METADATA_SYSTEM_RULES"
        :props="constant.METADATA_SYSTEM_PROPS"
      />
      <!--添加设备-->
      <common-form
        ref="formRef"
        v-if="dialogObj.type === 2"
        :form="deviceForm"
        :rules="constant.METADATA_DEVICE_RULES"
        :props="constant.METADATA_DEVICE_PROPS"
      />
      <!--添加点位-->
      <common-form
        ref="formRef"
        v-if="dialogObj.type === 3"
        :form="pointForm"
        :rules="constant.METADATA_POINT_RULES"
        :props="constant.METADATA_POINT_PROPS"
      />
      <div class="flexCenter" slot="footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="handleSave" :loading="saving">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "../const/";
import { saveMetadata, editMetadata, getMetadata } from "@/api/";
@Component({
  name: "index",
  components: {}
})
export default class extends Vue {
  @Prop({ default: false }) private dialogObj: any;
  @Ref() private formRef: any;

  saving: boolean = false;
  loading: boolean = false;
  systemForm: any = {};
  deviceForm: any = {};
  pointForm: any = {};
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
    try {
      let { type, info } = this.dialogObj;
      this.saving = true;
      let _formData: any = {};
      switch (type) {
        case 1:
          // 系统
          _formData = this.systemForm;
          break;
        case 2:
          // 设备
          _formData = this.deviceForm;
          _formData.parentId = info.parentId;
          break;
        case 3:
          // 点位
          _formData = this.pointForm;
          _formData.parentId = info.parentId;
          break;
      }
      if (this.isAdd) {
        await saveMetadata({
          ..._formData,
          categoryType: type
        });
      } else {
        await editMetadata({
          id: info.id,
          ..._formData,
          categoryType: type
        });
      }

      this.$emit("getTblList");
      this.saving = false;
      this.$message.success("保存成功");
      this.handleClose();
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
      let res = await getMetadata(info.id);
      this.loading = false;
      switch (res.data.categoryTypeId) {
        case 1:
          this.systemForm = res.data;
          break;
        case 2:
          this.deviceForm = res.data;
          break;
        case 3:
          this.pointForm = res.data;
          break;
      }
    } catch (e) {
      this.loading = false;
    }
  }
  mounted() {
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
