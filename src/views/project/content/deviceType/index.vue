<!--设备类型配置-->
<template>
  <div>
    <search-table
      ref="tblRef"
      :searchConfig="constant.DEVICE_TYPE_SEARCH_CONFIG"
      :tableColumns="constant.DEVICE_TYPE_COLUMN"
    />
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
  @Ref() tblRef: any;
  dialog: any = {
    show: false,
    title: "添加设备类型",
    info: {}
  };
  get constant() {
    return new Const(this).const;
  }
  add() {
    this.dialog.title = "添加设备类型";
    this.dialog.show = true;
  }
  handleClose() {
    this.dialog.show = false;
  }
  getTblList() {
    this.tblRef.getList();
  }
  edit(row: any) {
    this.dialog.show = true;
    this.dialog.title = "修改设备类型";
    this.dialog.info = row;
  }
  delete(row: any) {}
  groupSet(row: any) {}
  methodSet(row: any) {}
  created() {}
}
</script>

<style scoped lang="scss"></style>
