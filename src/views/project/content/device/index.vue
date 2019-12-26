<!--图例管理-->
<template>
  <div>
    <search-table
      :data="[{}]"
      ref="tblRef"
      :searchConfig="constant.DEVICE_SEARCH_CONFIG"
      :tableColumns="constant.DEVICE_COLUMN"
    />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
    <point-bind-dialog
      v-if="pointDialog.show"
      @getTblList="getTblList"
      :dialogObj="pointDialog"
      @handleClose="handleClose"
    ></point-bind-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import pointBindDialog from "./components/pointBindDialog.vue";
@Component({
  name: "index",
  components: {
    addDialog,
    pointBindDialog
  }
})
export default class extends Vue {
  @Ref() private tblRef: any;
  dialog: any = {
    show: false,
    title: "添加图例"
  };
  pointDialog: any = {
    show: false,
    title: "绑定点位"
  };
  get constant() {
    return new Const(this).const;
  }
  addDevice() {
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
    this.dialog.row = true;
    this.dialog.info = row;
  }
  delete() {
    this.$confirm("确定要删除", "提示").then(async () => {
      this.$message.success("删除成功");
      this.getTblList();
    });
  }
  bindPoint(row: any) {
    this.pointDialog.title = "绑定点位";
    this.pointDialog.show = true;
    this.pointDialog.info = row;
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
