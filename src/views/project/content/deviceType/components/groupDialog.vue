<!--子设备类别设置-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="62.5%"
    :before-close="handleClose"
    append-to-body
  >
    <search-table
      url="config/project/devGroup/list"
      :searchParams="searchParams"
      ref="groupTbl"
      :showPage="false"
      :searchConfig="constant.GROUP_SEARCH_CONFIG"
      :tableColumns="constant.GROUP_COLUMNS"
    />
    <!--添加子设备类别-->
    <add-group-device-dialog
      v-if="dialog.show"
      :devType="dialogObj.info"
      @getTblList="getTblList"
      @handleClose="closeGroupDevice"
      :dialogObj="dialog"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import addGroupDeviceDialog from "./addGroupDeviceDialog.vue";
import { deleteGroupDevType } from "@/api/";
@Component({
  name: "index",
  components: { addGroupDeviceDialog }
})
export default class extends Vue {
  @Ref() formRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: () => {} }) private dialogObj: any;
  showAdd: boolean = false;
  dialog: any = {
    title: "添加子设备类别",
    show: false
  };
  map: any;
  deviceTypeForm: any = {
    name: ""
  };
  saving: boolean = false;
  loading: boolean = false;
  get constant() {
    return new Const(this).const;
  }

  get searchParams() {
    return {
      devTypeId: this.dialogObj.info.id
    };
  }

  getTblList() {
    this.groupTbl.getList();
  }

  addGroupSet() {
    this.dialog.show = true;
    this.dialog.isAdd = true;
  }
  editGroup(row: any) {
    this.dialog.show = true;
    this.dialog.isAdd = false;
    this.dialog.info = row;
  }
  deleteGroup(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      this.$message.success("删除成功");
      await deleteGroupDevType(row.id);
      this.getTblList();
    });
  }
  handleClose() {
    this.$emit("handleClose");
  }
  closeGroupDevice() {
    this.dialog.show = false;
  }
  closeAdd() {
    this.showAdd = false;
  }
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
