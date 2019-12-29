<!--区域管理-->
<template>
  <div>
    <search-table
      ref="tblRef"
      url="/config/project/system/list"
      :searchConfig="constant.SYSTEM_SEARCH_CONFIG"
      :tableColumns="constant.SYSTEM_COLUMN"
      :searchParams="searchParams"
    />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import projectMixin from "../../mixin/projectMixin";
import systemMixin from "../../../mixin/systemMixin";
import { deleteProjectSystem } from "@/api/";
@Component({
  name: "systemManage",
  components: {
    addDialog
  }
})
export default class extends Mixins(projectMixin, systemMixin) {
  @Ref() private tblRef: any;
  dialog: any = {
    show: false,
    title: "添加系统",
    info: {}
  };
  get constant() {
    return new Const(this).const;
  }
  addRootNode() {
    this.dialog.show = true;
    this.dialog.isAdd = true;
  }
  drawPoint() {}
  handleClose() {
    this.dialog.show = false;
  }
  getTblList() {
    this.tblRef.getList();
  }
  edit(row: any) {
    this.dialog.show = true;
    this.dialog.isAdd = false;
    this.dialog.info = row;
  }
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      this.$message.success("删除成功");
      await deleteProjectSystem(row.id);
      this.getTblList();
    });
  }
  addChildRegion(row: any) {}

  created() {
  }
}
</script>

<style scoped lang="scss"></style>
