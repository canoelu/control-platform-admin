<!--项目管理-->
<template>
  <el-card>
    <search-table
      ref="tblRef"
      url="/config/project"
      :searchConfig="constant.PROJECT_SEARCH_CONFIG"
      :tableColumns="constant.PROJECT_COLUMN"
    />
    <project-dialog
      v-if="dialog.show"
      @getTblList="getTblList"
      :dialogObj="dialog"
      @handleClose="handleClose"
    ></project-dialog>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import projectDialog from "./components/projectDialog.vue";
import { deleteProject } from "@/api/";
@Component({
  name: "index",
  components: {
    projectDialog
  }
})
export default class extends Vue {
  @Ref() private tblRef: any;
  dialog: any = {
    show: false,
    title: "添加项目"
  };
  get constant() {
    return new Const(this).const;
  }
  addProject() {
    this.dialog.show = true;
    this.dialog.isAdd = true;
    this.dialog.title = "添加项目";
  }

  edit(row: any) {
    this.dialog.show = true;
    this.dialog.info = row;
    this.dialog.isAdd = false;
    this.dialog.title = "编辑项目";
  }
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteProject(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }
  getTblList() {
    this.tblRef.getList();
  }
  handleClose() {
    this.dialog.show = false;
  }
  handleProContent(row: any) {
    localStorage.setItem("curProject", JSON.stringify(row));
    this.$router.push({
      name: "project-content-region-index",
      query: {
        orgId: row.id
      }
    });
  }
}
</script>

<style scoped lang="scss"></style>
