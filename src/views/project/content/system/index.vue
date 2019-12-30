<!--系统管理-->
<template>
  <div>
    <search-table
      ref="tblRef"
      url="/config/project/system/list"
      :searchConfig="constant.SYSTEM_SEARCH_CONFIG"
      :tableColumns="constant.SYSTEM_COLUMN"
      :searchParams="searchParams"
    />
    <!--添加系统-->
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose" />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Mixins } from "vue-property-decorator";
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

  /**
   * 添加系统
   */
  private addSystem() {
    this.dialog.show = true;
    this.dialog.isAdd = true;
  }

  /**
   * 描点
   * @param row
   */
  private drawPoint(row: any) {
    this.$router.push({
      path: "/project/content/system/drawPoint",
      query: {
        orgId: this.orgId,
        id: row.id
      }
    });
  }

  /**
   * 关闭弹框
   */
  handleClose() {
    this.dialog.show = false;
  }

  /**
   * 获取列表
   */
  getTblList() {
    this.tblRef.getList();
  }

  /**
   * 修改
   * @param row
   */
  edit(row: any) {
    this.dialog.show = true;
    this.dialog.isAdd = false;
    this.dialog.info = row;
  }

  /**
   * 删除
   * @param row
   */
  delete(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      this.$message.success("删除成功");
      await deleteProjectSystem(row.id);
      this.getTblList();
    });
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
