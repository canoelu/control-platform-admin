<!--方法管理-->
<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <div v-loading="loading">
      <common-form ref="formRef" :form="methodForm" :rules="constant.METHOD_RULES" :props="constant.METHOD_PROPS">
        <template v-slot:deal>
          <div class="flexRow">
            <el-select class="mr-10" style="width:200px" size="small" placeholder="所在区域名称">
              <el-option></el-option>
            </el-select>
            <el-select class="mr-10" style="width:200px" size="small" placeholder="点位替换代码">
              <el-option></el-option>
            </el-select>
            <el-upload action="">
              <el-button size="small" type="primary">选择及上传图片</el-button>
            </el-upload>
          </div>
        </template>
      </common-form>
      <div class="flexCenter">
        <el-button size="small" @click="handleClose">关闭</el-button>
        <el-button size="small" type="primary" @click="handleSave" :loading="saving">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "../const/";
import { saveMethod, getMethod, editMethod } from "@/api/";
@Component({
  name: "index",
  components: {}
})
export default class extends Vue {
  @Ref() formRef: any;
  @Prop({ default: false }) private dialogObj: any;
  methodForm: any = {};
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
      let _data = this.methodForm;
      if (this.isAdd) {
        await saveMethod(_data);
      } else {
        await editMethod({
          ..._data,
          id: this.dialogObj.info.id
        });
      }
      this.saving = false;
      this.$message.success("保存方法成功");
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
      let res = await getMethod(info.id);
      this.loading = false;
      this.methodForm = res.data;
    } catch (e) {
      this.loading = false;
    }
  }
  created() {
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
