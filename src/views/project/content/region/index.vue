<!--区域管理-->
<template>
  <div>
    <search-table ref="tblRef" :searchConfig="constant.REGION_SEARCH_CONFIG" :tableColumns="constant.REGION_COLUMN" />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
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
    title: "添加区域"
  };
  get constant() {
    return new Const(this).const;
  }

  /**
   * 添加区域
   */
  add() {
    this.dialog.show = true;
    this.dialog.type = 1;
    this.dialog.isAdd = true;
  }

  /**
   * 修改区域
   */
  edit(row: any) {
    this.dialog.show = true;
    this.dialog.type = 2;
    this.dialog.info = row;
    this.dialog.isAdd = false;
  }
  /**
   * 删除区域
   */
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      this.$message.success("删除成功");
      this.getTblList();
    });
  }

  /**
   * 添加子区域
   */
  addChildRegion() {
    this.dialog.show = true;
    this.dialog.type = 2;
    this.dialog.isAdd = true;
  }

  /**
   * 下移
   */
  down(row: any) {}

  /**
   * 上移
   * @param row
   */
  up(row: any) {}

  /**
   * 关闭弹框
   */
  handleClose() {
    this.dialog.show = false;
  }

  /**
   * 获取list
   */
  getTblList() {
    this.tblRef.getList();
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
