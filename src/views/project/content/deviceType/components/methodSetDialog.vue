<!--方法配置-->
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
      :border="true"
      :searchConfig="constant.METHOD_SEARCH_CONFIG"
      :searchParams="searchParams"
      :tableColumns="constant.METHOD_COLUMNS"
    />
    <p class="mt-10 mb-10">子设备点位方法配置</p>
    <search-table
      url="/config/project/devTypeFunc/categorys"
      ref="categoryTbl"
      :searchParams="searchParams"
      :showPage="false"
      :border="true"
      :tableColumns="constant.GROUP_POINT_METHOD_COLUMNS"
      :treeProps="{ children: 'children', hasChildren: 'hasChildren' }"
      rowKey="id"
    />
    <add-method-dialog
      v-if="addDialog.show && addDialog.type === 1"
      @handleClose="closeAddMethod"
      :devType="dialogObj.info"
      @getTblList="getMethodList"
      :dialogObj="addDialog"
      :devTypeId="devTypeId"
      :type="1"
    />
    <method-bind-dialog
      v-if="addDialog.show && addDialog.type === 2"
      @handleClose="closeAddMethod"
      :devType="dialogObj.info"
      @getTblList="getMethodList"
      :dialogObj="addDialog"
      :devTypeId="devTypeId"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import {} from "@/api/";
import addMethodDialog from "./addMethodDialog.vue";
import methodBindDialog from "./methodBindDialog.vue";
import { deleteDevTypeFunc } from "@/api/";
@Component({
  name: "index",
  components: { addMethodDialog, methodBindDialog }
})
export default class extends Vue {
  @Ref() private methodTblRef: any;
  @Ref() private categoryTbl: any;
  @Prop({ default: () => {} }) private dialogObj: any;
  loading: boolean = false;
  addDialog: any = {
    show: false,
    title: "添加方法",
    type: 1,
    info: {}
  };
  get constant() {
    return new Const(this).const;
  }
  get devTypeId() {
    return this.dialogObj.info.id;
  }
  get searchParams() {
    return {
      devTypeId: this.devTypeId,
      type: 1 // 1：设备类型，2：子设备类型
    };
  }
  addMethod() {
    this.addDialog.show = true;
    this.addDialog.isAdd = true;
    this.addDialog.type = 1; // 添加方法
    this.addDialog.title = "添加设备类别方法";
  }
  editMethod(row: any) {
    this.addDialog.show = true;
    this.addDialog.isAdd = false;
    this.addDialog.type = 1; // 编辑方法
    this.addDialog.title = "编辑设备类别方法";
    this.addDialog.info = row;
  }
  deleteMethod(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteDevTypeFunc(row.id);
      this.$message.success("删除成功");
      this.getMethodList();
    });
  }
  closeAddMethod() {
    this.addDialog.show = false;
  }
  methodBind(row: any) {
    this.addDialog.show = true;
    this.addDialog.isAdd = true;
    this.addDialog.type = 2; // 绑定方法
    this.addDialog.info = row;
    this.addDialog.title = "绑定子设备类别方法";
  }
  getMethodList() {
    this.methodTblRef.getList();
  }
  getCategoryList() {
    this.categoryTbl.getList();
  }
  handleClose() {
    this.$emit("handleClose");
  }
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
