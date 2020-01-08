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
          :treeProps="{ children: 'categorys', hasChildren: 'hasChildren' }"
          rowKey="key"
          :border="true"
          :defaultExpandAll="true"
          :showPage="false"
        />
      </div>
    </div>
    <!--绑定点位-->
    <point-list-dialog
      v-if="dialog.show && dialog.type === 'bind'"
      @handleClose="closeDialog"
      @choosePoint="choosePoint"
      :dialogObj="dialog"
      @getTblList="getTblList"
      :deviceId="dialogObj.info.id"
    />
    <!--添加子设备-->
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

  bind(row: any, idx: number) {
    this.dialog.show = true;
    this.dialog.title = "选择点位";
    this.dialog.type = "bind";
    this.dialog.info = row;
  }

  /**
   * 获取列表
   */
  getTblList() {
    this.getSubDeviceTypeList();
  }

  /**
   * 关闭弹框
   */
  closeDialog() {
    this.dialog.show = false;
    this.dialog.type = "";
  }

  /**
   * 添加子设备
   * @param devType
   */
  addSubDevice(devType: any) {
    this.dialog.show = true;
    this.dialog.title = "添加子设备";
    this.dialog.isAdd = true;
    this.dialog.type = "sub";
    this.dialog.devType = devType;
  }

  /**
   * 获取子设备列表
   */
  async getSubDeviceTypeList() {
    try {
      this.loading = true;
      let { info } = this.dialogObj;
      this.subDevTypeList = [];
      let res = await getSubDeviceTypeList({
        page: 1,
        pageSize: 1000,
        deviceTypeId: info.devTypeId,
        deviceId: info.id
      });
      this.loading = false;
      this.subDevTypeList = res.data.list;
      this.subDevTypeList = this.subDevTypeList.map((item: any) => {
        item.key = item.id;
        item.subdevices = item.subdevices.map((sub: any) => {
          sub.key = sub.id;
          sub.categorys = sub.categorys.map((cat: any) => {
            return {
              ...cat,
              subDeviceId: sub.id,
              key: sub.id + cat.id
            };
          });
          return sub;
        });
        return item;
      });
    } catch (e) {
      this.loading = false;
    }
  }

  handleClose() {
    this.$emit("handleClose");
  }
  created() {
    this.getSubDeviceTypeList();
  }
}
</script>

<style scoped lang="scss"></style>
