<!--子弹管理-->
<template>
  <el-card>
    <search-table
      ref="tblRef"
      url="config/category/"
      :searchConfig="constant.METADATA_SEARCH_CONFIG"
      :tableColumns="constant.METADATA_COLUMN"
    />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import { deleteMetadata } from "@/api/";
import ro from "element-ui/src/locale/lang/ro";
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
  type: string | number = 1;
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
  handleShowDialog(row?: any = {}) {
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
   * 添加点位
   */
  addSystem() {
    this.type = 1;
    this.isAdd = true;
    this.handleShowDialog();
  }
  addPoint() {
    this.isAdd = true;
    this.type = 3;
    this.handleShowDialog();
  }
  addDevice() {
    this.isAdd = true;
    this.type = 2;
    this.handleShowDialog();
  }

  /**
   * 关闭弹框
   */
  handleClose() {
    this.dialog.show = false;
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
   * 修改
   * @param row
   */
  edit(row: any) {
    this.isAdd = false;
    this.handleShowDialog(row);
  }
  getTblList() {
    this.tblRef.getList();
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
