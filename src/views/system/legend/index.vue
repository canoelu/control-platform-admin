<!--图例管理-->
<template>
  <el-card>
    <search-table
      ref="tblRef"
      :data="[{}]"
      :searchConfig="constant.LEGEND_SEARCH_CONFIG"
      :tableColumns="constant.LEGEND_COLUMN"
    />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import { deleteLegend } from "@/api/";
@Component({
  name: "index",
  components: {
    addDialog
  }
})
export default class extends Vue {
  @Ref() private tblRef: any;
  dialog: any = {
    show: false,
    title: "添加图例"
  };
  get constant() {
    return new Const(this).const;
  }
  addLegend() {
    this.dialog.show = true;
    this.dialog.isAdd = true;
    this.dialog.title = "添加图例";
  }
  handleClose() {
    this.dialog.show = false;
  }
  edit(row: any) {
    this.dialog.show = true;
    this.dialog.isAdd = false;
    this.dialog.title = "编辑图例";
    this.dialog.info = row;
  }
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteLegend(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }
  getTblList() {
    this.tblRef.getList();
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
