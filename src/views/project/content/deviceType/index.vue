<!--设备类型配置-->
<template>
  <div>
    <search-table
      :data="[{}]"
      ref="tblRef"
      :searchConfig="constant.DEVICE_TYPE_SEARCH_CONFIG"
      :tableColumns="constant.DEVICE_TYPE_COLUMN"
    />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
    <!--设备分组配置-->
    <group-dialog
      v-if="gDialog.show"
      @getTblList="getTblList"
      :dialogObj="gDialog"
      @handleClose="handleClose"
    ></group-dialog>
    <!--展示配置-->
    <display-dialog v-if="dDialog.show" :dialogObj="dDialog" @handleClose="handleClose"></display-dialog>
    <method-set-dialog v-if="mDialog.show" :dialogObj="mDialog" @handleClose="handleClose"></method-set-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
import displayDialog from "./components/displayDialog.vue";
import groupDialog from "./components/groupDialog.vue";
import methodSetDialog from "./components/methodSetDialog.vue";
@Component({
  name: "deviceType",
  components: {
    addDialog,
    displayDialog,
    groupDialog,
    methodSetDialog
  }
})
export default class extends Vue {
  @Ref() tblRef: any;
  dialog: any = {
    show: false,
    title: "添加设备类型",
    info: {}
  };
  dDialog: any = {
    show: false,
    title: "展示设备",
    info: {}
  };
  gDialog: any = {
    show: false,
    title: "设备分组配置"
  };
  mDialog: any = {
    show: false,
    title: "方法配置"
  };
  get constant() {
    return new Const(this).const;
  }
  add() {
    this.dialog.title = "添加设备类型";
    this.dialog.show = true;
    this.dialog.isAdd = true;
    this.dialog.type = "deviceType";
  }
  handleClose() {
    this.dialog.show = false;
    this.dDialog.show = false;
    this.gDialog.show = false;
    this.mDialog.show = false;
  }
  getTblList() {
    this.tblRef.getList();
  }
  edit(row: any) {
    this.dialog.show = true;
    this.dialog.title = "修改设备类型";
    this.dialog.info = row;
    this.dialog.isAdd = false;
    this.dialog.type = "deviceType";
  }

  delete(row: any) {}

  methodSet(row: any) {
    this.mDialog.show = true;
    this.mDialog.title = "添加设备分组";
    this.mDialog.isAdd = true;
  }
  showDisplaySet(row: any) {
    this.dDialog.title = "展示配置";
    this.dDialog.show = true;
    this.dDialog.info = row;
  }
  groupSet(row: any) {
    this.gDialog.title = "设备分组配置";
    this.gDialog.show = true;
    this.gDialog.info = row;
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
