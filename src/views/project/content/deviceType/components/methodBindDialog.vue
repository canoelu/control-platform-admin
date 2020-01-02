<!--子设备或点位添加绑定方法-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <search-table
      url="/config/project/devTypeFunc/list"
      ref="methodTblRef"
      :showPage="false"
      :searchConfig="constant.METHOD_SEARCH_CONFIG"
      :searchParams="searchParams"
      :tableColumns="constant.METHOD_COLUMNS"
    />
    <add-method-dialog
      v-if="addDialog.show"
      @handleClose="closeMethod"
      :devType="dialogObj.info"
      @getTblList="getMethodList"
      :dialogObj="addDialog"
      :devTypeId="devTypeId"
      :type="2"
      :categoryId="categoryId"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import addMethodDialog from "./addMethodDialog.vue";
import { deleteDevTypeFunc } from "@/api";
@Component({
  name: "index",
  components: { addMethodDialog }
})
export default class extends Vue {
  @Ref() methodTblRef: any;
  @Prop({ default: () => {} }) private dialogObj: any;
  @Prop({ default: "" }) private devTypeId?: string | number;

  addDialog: any = {
    show: false,
    title: "添加方法",
    type: 1,
    info: {}
  };
  saving: boolean = false;
  loading: boolean = false;
  get constant() {
    return new Const(this).const;
  }
  get searchParams() {
    return {
      devTypeId: this.devTypeId,
      categoryId: this.categoryId,
      type: 2 // 1：设备类型，2：子设备类型
    };
  }
  get categoryId() {
    return this.dialogObj.info.sysCategoryId;
  }
  addMethod() {
    this.addDialog.show = true;
    this.addDialog.isAdd = true;
    this.addDialog.title = "添加子设备方法";
  }
  deleteMethod(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteDevTypeFunc(row.id);
      this.$message.success("删除成功");
      this.getMethodList();
    });
  }
  editMethod(row: any) {
    this.addDialog.show = true;
    this.addDialog.isAdd = false;
    this.addDialog.title = "编辑设备类别方法";
    this.addDialog.info = row;
  }
  getMethodList() {
    this.methodTblRef.getList();
  }
  closeMethod() {
    this.addDialog.show = false;
  }
  handleClose() {
    this.$emit("handleClose");
  }

  mounted() {}
}
</script>

<style scoped lang="scss"></style>
