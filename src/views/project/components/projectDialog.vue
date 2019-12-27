<!--项目管理-->
<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
    class="project-manage"
  >
    <div v-loading="loading">
      <common-form ref="formRef" :form="projectForm" :rules="constant.PROJECT_RULES" :props="constant.PROJECT_PROPS">
        <template v-slot:url>
          <common-upload @handleSuccess="handleSuccess" />
          <img class="bg-img" alt="背景图" v-if="projectForm.url" :src="projectForm.url" />
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
import { saveProject, getProject, editProject } from "@/api/";
import commonUpload from "@/components/common-upload/index.vue";
import { ProjectForm } from "../const/types";

@Component({
  name: "index",
  components: { commonUpload }
})
export default class extends Vue {
  @Ref() formRef: any;
  @Prop({ default: false }) private dialogObj: any;
  projectForm: ProjectForm = {
    name: "",
    code: "",
    url: ""
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
      let _data = this.projectForm;
      if (this.isAdd) {
        await saveProject(_data);
      } else {
        await editProject({
          ..._data,
          id: this.dialogObj.info.id
        });
      }
      this.saving = false;
      this.$message.success("保存项目成功");
      this.$emit("handleClose");
      this.$emit("getTblList");
    } catch (e) {
      this.saving = false;
    }
  }
  handleSuccess(res: any) {
    this.projectForm.url = res.url;
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
      let res = await getProject(info.id);
      this.loading = false;
      this.projectForm = res.data;
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

<style scoped lang="scss">
.project-manage {
  .bg-img {
    display: inline-block;
    width: 80%;
    height: 200px;
    border: 1px solid #f5f5f5;
    padding: 20px;
    margin-top: 20px;
  }
}
</style>
