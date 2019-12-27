<template>
  <div>
    <el-upload
      :action="url"
      :show-file-list="false"
      :on-error="handleError"
      :on-progress="handleProgress"
      :before-upload="beforeUpload"
      accept="image/*"
      :on-success="handleUploadPic"
      :disabled="uploading"
    >
      <el-button size="small" type="primary">选择及上传图片</el-button>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "commonUpload",
  components: {}
})
export default class extends Vue {
  @Prop({ default: "/api/v1/config/picture/upload" }) private url?: string;
  uploading: boolean = false;
  handleProgress() {
    this.uploading = true;
  }
  beforeUpload(file: any) {
    let isImg = false;

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      isImg = true;
    }

    if (!isImg) {
      this.$message.error("上传图片只能是 JPG或PNG 或gif格式!");
    }

    return isImg;
  }
  handleError() {
    this.uploading = false;
    this.$message.error("上传失败");
  }
  handleUploadPic(res: any) {
    this.uploading = false;
    this.$message.success("上传成功");
    this.$emit("handleSuccess", res);
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
