<!--方法管理-->
<template>
  <el-card>
    <search-table
      ref="tblRef"
      url="config/func/"
      :searchConfig="constant.METHOD_SEARCH_CONFIG"
      :tableColumns="constant.METHOD_COLUMN"
    />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import { deleteMethod } from "@/api";
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
    title: "添加方法"
  };
  get constant() {
    return new Const(this).const;
  }
  addMethod() {
    this.dialog.show = true;
    this.dialog.isAdd = true;
    this.dialog.title = "添加方法";
  }

  edit(row: any) {
    this.dialog.show = true;
    this.dialog.info = row;
    this.dialog.isAdd = false;
    this.dialog.title = "编辑方法";
  }
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteMethod(row.id);
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
  created() {}
}
</script>

<style scoped lang="scss"></style>
