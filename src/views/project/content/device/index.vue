<!--设备管理-->
<template>
  <div>
    <search-table
      url="/config/project/device/list"
      ref="tblRef"
      :searchConfig="constant.DEVICE_SEARCH_CONFIG"
      :tableColumns="constant.DEVICE_COLUMN"
      :searchParams="searchParams"
    />
    <!--添加设备-->
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
    <!--点位绑定-->
    <point-bind-dialog
      v-if="pointDialog.show"
      @getTblList="getTblList"
      :dialogObj="pointDialog"
      @handleClose="handleClose"
    ></point-bind-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import pointBindDialog from "./components/pointBindDialog.vue";
import projectMixin from "../../mixin/projectMixin";
import { deleteProjectDevice } from "@/api/";
@Component({
  name: "index",
  components: {
    addDialog,
    pointBindDialog
  }
})
export default class extends Mixins(projectMixin) {
  @Ref() private tblRef: any;
  dialog: any = {
    show: false,
    title: "添加设备"
  };
  pointDialog: any = {
    show: false,
    title: "点位绑定"
  };
  get constant() {
    return new Const(this).const;
  }
  get searchParams() {
    return {
      orgId: this.orgId
    };
  }

  /**
   * 添加设备
   */
  private addDevice() {
    this.dialog.show = true;
    this.dialog.isAdd = true;
  }

  /**
   * 获取列表
   */
  getTblList() {
    this.tblRef.getList();
  }

  /**
   * 关闭
   */
  handleClose() {
    this.dialog.show = false;
    this.pointDialog.show = false;
  }

  /**
   * 修改
   * @param row
   */
  edit(row: any) {
    this.dialog.show = true;
    this.dialog.isAdd = false;
    this.dialog.row = true;
    this.dialog.info = row;
  }

  /**
   * 删除
   * @param row
   */
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteProjectDevice(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }

  /**
   * 绑定点位
   * @param row
   */
  bindPoint(row: any) {
    this.pointDialog.title = "绑定点位";
    this.pointDialog.show = true;
    this.pointDialog.info = row;
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
