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
      :searchConfig="constant.METHOD_SEARCH_CONFIG"
      :searchParams="searchParams"
      :tableColumns="constant.METHOD_COLUMNS"
    ></search-table>
    <p class="mt-10 mb-10">分组点位方法配置</p>
    <search-table
      url="/config/project/devTypeFunc/categorys"
      ref="categoryTbl"
      :searchParams="searchParams"
      :showPage="false"
      :tableColumns="constant.GROUP_POINT_METHOD_COLUMNS"
    ></search-table>
    <add-method-dialog
      v-if="addDialog.show"
      @handleClose="closeAddMethod"
      :devType="dialogObj.info"
      @getTblList="getMethodList"
      :dialogObj="addDialog"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import {} from "@/api/";
import addMethodDialog from "./addMethodDialog.vue";
@Component({
  name: "index",
  components: { addMethodDialog }
})
export default class extends Vue {
  @Ref() private methodTblRef: any;
  @Prop({ default: () => {} }) private dialogObj: any;
  loading: boolean = false;
  addDialog: any = {
    show: false,
    title: "添加方法",
    info: {}
  };
  get constant() {
    return new Const(this).const;
  }
  get searchParams() {
    return {
      devTypeId: this.dialogObj.info.id,
      type: 1, // 1：设备类型，2：子设备类型
      categoryId: 1
    };
  }
  addMethod() {
    this.addDialog.show = true;
    this.addDialog.isAdd = true;
    this.addDialog.title = "添加方法";
  }
  editMethod() {
    this.addDialog.show = true;
    this.addDialog.isAdd = false;
    this.addDialog.title = "编辑方法";
  }
  closeAddMethod() {
    this.addDialog.show = false;
  }
  methodBind() {}
  getMethodList() {
    this.methodTblRef.getList();
  }
  handleClose() {
    this.$emit("handleClose");
  }
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
