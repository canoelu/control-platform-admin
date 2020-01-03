<!--点位绑定-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <div v-loading="loading">
      <div class="dev-type-ite mb-10 mt-10" v-for="dev in subDevTypeList" :key="dev.id">
        <div class="flexBetween mb-10 ">
          <span>{{ dev.categoryName }}</span>
          <el-button type="primary" size="mini" @click="addSubDevice(dev)">添加子设备</el-button>
        </div>
        <search-table
          :data="dev.subdevices"
          ref="tblRef"
          :tableColumns="constant.POINT_COLUMNS"
          :treeProps="{ children: 'children', hasChildren: 'hasChildren' }"
          rowKey="id"
          :showPage="false"
        />
      </div>
    </div>
    <point-list-dialog
      v-if="dialog.show && dialog.type === 'bind'"
      @handleClose="closeDialog"
      :dialogObj="dialog"
      @getTblList="getTblList"
      :deviceId="dialogObj.info.id"
    />
    <add-sub-dialog
      v-if="dialog.show && dialog.type === 'sub'"
      @getTblList="getTblList"
      @handleClose="closeDialog"
      :dialogObj="dialog"
      :deviceId="dialogObj.info.id"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import pointListDialog from "./pointListDialog.vue";
import addSubDialog from "./addSubDialog.vue";
import { getSubDeviceTypeList, bindDevicePoint } from "@/api/";
@Component({
  name: "index",
  components: { pointListDialog, addSubDialog }
})
export default class extends Vue {
  @Ref() tblRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: false }) private dialogObj: any;
  subDevTypeList: any = [];
  loading: boolean = false;
  dialog: any = {
    show: false,
    title: "选择点位",
    info: {}
  };
  get constant() {
    return new Const(this).const;
  }

  handleClose() {
    this.$emit("handleClose");
  }
  bind() {
    this.dialog.show = true;
    this.dialog.title = "选择点位";
    this.dialog.type = "bind";
  }
  async choosePoint(point: any) {
    console.log(point);
    await bindDevicePoint({
      categoryId: 0,
      pointId: point.id,
      subDeviceId: 0
    });
  }
  getTblList() {
    this.tblRef.getList();
  }
  closeDialog() {
    this.dialog.show = false;
    this.dialog.type = "";
  }
  addSubDevice(devType: any) {
    this.dialog.show = true;
    this.dialog.title = "添加子设备";
    this.dialog.isAdd = true;
    this.dialog.type = "sub";
    this.dialog.devType = devType;
  }
  async getSubDeviceTypeList() {
    try {
      this.loading = true;
      let { info } = this.dialogObj;
      let res = await getSubDeviceTypeList({
        page: 1,
        pageSize: 1000,
        deviceTypeId: info.devTypeId,
        deviceId: info.id
      });
      this.loading = false;
      this.subDevTypeList = res.data.list;
    } catch (e) {
      this.loading = false;
    }
  }
  mounted() {
    this.getSubDeviceTypeList();
  }
}
</script>

<style scoped lang="scss"></style>
