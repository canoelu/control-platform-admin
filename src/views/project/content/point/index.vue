<!--点位管理-->
<template>
  <div>
    <search-table
      ref="tblRef"
      url="/config/project/points/"
      :searchConfig="constant.POINT_SEARCH_CONFIG"
      :tableColumns="constant.POINT_COLUMN"
      :searchParams="searchParams"
    />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import { deleteProjectDevType } from "@/api/";
import projectMixin from "../../mixin/projectMixin";
@Component({
  name: "index",
  components: {
    addDialog
  }
})
export default class extends Mixins(projectMixin) {
  @Ref() private tblRef: any;
  dialog: any = {
    show: false,
    title: "添加点位"
  };
  get constant() {
    return new Const(this).const;
  }
  get searchParams() {
    return {
      orgId: this.orgId
    };
  }
  addPoint() {
    this.dialog.show = true;
    this.dialog.isAdd = true;
  }
  getTblList() {
    this.tblRef.getList();
  }
  handleClose() {
    this.dialog.show = false;
  }
  edit(row: any) {
    this.dialog.show = true;

    this.dialog.isAdd = false;
    this.dialog.info = row;
  }
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteProjectDevType(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }
  importPoint() {}
  created() {}
}
</script>

<style scoped lang="scss"></style>
