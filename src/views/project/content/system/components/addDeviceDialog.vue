<!--添加设备-->
<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="62.5%"
    :before-close="handleClose"
    append-to-body
  >
    <common-form ref="formRef" v-if="showLegend" :form="legendFrom" :props="constant.LEGEND_PROPS" />
    <search-table
      url="/config/project/device/list"
      :searchParams="searchParams"
      :searchConfig="constant.DEVICE_CHOOSE_SEARCH_CONFIG"
      :tableColumns="constant.DEVICE_CHOOSE_COLUMN"
      v-else
    />
    <div slot="footer">
      <el-button type="primary" size="small" @click="handleSure" v-if="showLegend">确定</el-button>
      <el-button type="primary" size="small" @click="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import { getLegendList, addProSystemDevice } from "@/api/";
import projectMixin from "../../../mixin/projectMixin";
import systemMixin from "../../../../mixin/systemMixin";

@Component({
  name: "index",
  components: {}
})
export default class extends Mixins(projectMixin, systemMixin) {
  @Ref() formRef: any;
  @Prop({ default: false }) private dialogObj: any;
  @Prop({ default: "" }) private systemId?: string | number;
  showLegend: boolean = false;
  legendFrom: any = {
    devPicId: ""
  };
  selectedDevice: any = {};
  legendList: any[] = [];
  get constant() {
    return new Const(this).const;
  }
  get searchParams() {
    return {
      orgId: this.orgId
    };
  }
  async getLegendList() {
    let res = await getLegendList({
      page: 1,
      pageSize: 1000
    });
    this.legendList = res.data.list;
  }
  /**
   * 选用
   * @param device
   */
  choose(device: any) {
    this.showLegend = true;
    this.selectedDevice = device;
  }
  async addProDevice() {
    await addProSystemDevice({
      devPicId: this.legendFrom.devPicId,
      deviceId: this.selectedDevice.id,
      regionId: 0,
      systemId: this.systemId
    });
    this.$message.success("添加设备成功");
    this.handleClose();
  }
  handleSure() {
    let _formRef: any = this.formRef.$refs.formRef;
    _formRef.validate((valid: boolean) => {
      if (valid) {
        this.addProDevice();
      }
    });
  }
  handleClose() {
    this.$emit("handleClose");
  }
  created() {
    this.getLegendList();
  }
}
</script>

<style scoped lang="scss"></style>
