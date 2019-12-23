<!--字典管理-->
<template>
  <el-card>
    <search-table
      ref="tblRef"
      url="config/category/"
      :searchConfig="constant.METADATA_SEARCH_CONFIG"
      :tableColumns="constant.METADATA_COLUMN"
      :treeProps="{ children: 'children', hasChildren: 'hasChildren' }"
      rowKey="id"
      :showPage="false"
    />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import { deleteMetadata } from "@/api/";
@Component({
  name: "index",
  components: {
    addDialog
  }
})
export default class extends Vue {
  @Ref() private tblRef: any;
  isAdd: boolean = true;
  showDialog: boolean = false;
  title: string = "添加系统";
  type: string | number = 1; // 1系统，2：设备，3：点位
  info: any = {};
  get constant() {
    return new Const(this).const;
  }
  get dialog() {
    return {
      show: this.showDialog,
      title: this.title,
      type: this.type,
      isAdd: this.isAdd,
      info: this.info
    };
  }

  /**
   * 展示弹框
   * @param row
   */
  handleShowDialog(row: any = {}) {
    let { categoryTypeId } = row;
    let txtMap: any = {
      1: "系统",
      2: "设备",
      3: "点位"
    };
    this.showDialog = true;
    this.info = row;
    this.type = this.isAdd ? this.type : categoryTypeId;
    this.title = this.isAdd ? "添加" : "编辑" + txtMap[this.type];
  }

  /**
   * 新增系统
   */
  addSystem() {
    this.isAdd = true;
    this.type = 1;
    this.handleShowDialog();
  }

  /**
   * 添加设备
   */
  addDevice(row: any) {
    this.isAdd = true;
    this.type = 2;
    this.handleShowDialog(row);
  }
  /**
   * 添加点位
   */
  addPoint(row: any) {
    this.isAdd = true;
    this.type = 3;
    this.handleShowDialog(row);
  }

  /**
   * 删除
   * @param row
   */
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteMetadata(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }

  /**
   * 编辑
   * @param row
   */
  edit(row: any) {
    this.isAdd = false;
    this.handleShowDialog(row);
  }

  /**
   * 获取表格数据
   */
  getTblList() {
    this.tblRef.getList();
  }
  handleClose() {
    this.showDialog = false;
  }
}
</script>

<style scoped lang="scss"></style>
