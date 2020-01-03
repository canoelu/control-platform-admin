<!--描点-->
<template>
  <div class="draw-point">
    <div class="draw-point-head">
      <el-cascader
        :props="{
          lazy: true,
          label: 'name',
          value: 'id',
          lazyLoad: getRegion
        }"
        placeholder="请选择区域"
        v-model="area"
        size="small"
      ></el-cascader>
      <div class="right">
        <el-button type="primary" size="small" @click="handleShowEnergy">能源设备管理</el-button>
        <el-button type="primary" size="small" @click="handleAddDevice">添加设备</el-button>
      </div>
    </div>
    <div class="draw-point-content">
      <div class="map-container" id="drawMapContent"></div>
    </div>
    <!--能耗设备管理-->
    <energy-device-dialog
      v-if="energyDialog.show"
      :dialogObj="energyDialog"
      :systemId="systemId"
      @handleClose="handleClose"
    ></energy-device-dialog>
    <!--添加设备-->
    <add-device-dialog
      v-if="deviceDialog.show"
      :dialogObj="deviceDialog"
      :systemId="systemId"
      @handleClose="handleClose"
    ></add-device-dialog>
    <device-set-dialog />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import BMap from "BMap";
import projectMixin from "../../mixin/projectMixin";
import energyDeviceDialog from "./components/energyDeviceDialog.vue";
import addDeviceDialog from "./components/addDeviceDialog.vue";
import deviceSetDialog from "./components/deviceSetDialog.vue";
@Component({
  name: "drawPoint",
  components: { energyDeviceDialog, addDeviceDialog, deviceSetDialog }
})
export default class extends Mixins(projectMixin) {
  area: string = ""; // 选择区域
  energyDialog: any = {
    show: false,
    title: "区域设备能耗配置"
  };
  deviceDialog: any = {
    show: false,
    title: "设备选择"
  };
  devSetDialog: any = {
    show: false,
    title: "设备设置"
  };
  map: any;
  initPoint: any[] = [104.067923463, 30.6799428454];
  get systemId() {
    return <any>this.$route.query.id;
  }
  renderMap() {
    let point = new BMap.Point(this.initPoint[0], this.initPoint[1]);
    this.map.centerAndZoom(point, 16);
    this.map.enableScrollWheelZoom(false);
    var marker = new BMap.Marker(point); // 创建标注
    this.map.addOverlay(marker); // 将标注添加到地图中
    marker.enableDragging(); // 不可拖拽
    marker.addEventListener("dragend", (e: any) => {
      let { lng, lat } = e.point;
    });
  }

  /**
   *
   * 设备选择
   */
  handleAddDevice() {
    this.deviceDialog.show = true;
  }

  /**
   * 能源设备管理
   */
  handleShowEnergy() {
    this.energyDialog.show = true;
  }

  /**
   * 关闭弹框
   */
  handleClose() {
    this.deviceDialog.show = false;
    this.energyDialog.show = false;
  }

  /**
   * 获取区域
   * @param node
   * @param resolve
   */
  async getRegion(node: any, resolve: any) {
    console.log(node);
    this.loadRegion({
      page: 1,
      size: 1000,
      orgId: this.orgId,
      parentId: node.level && node.data.id
    }).then(res => {
      resolve(res.data.list);
    });
  }
  showDevSet() {
    this.devSetDialog.show = true;
    this.devSetDialog.title = "设备设置";
  }
  mounted() {
    this.$nextTick(() => {
      this.map = new BMap.Map("drawMapContent");
      this.renderMap();
    });
  }
}
</script>

<style scoped lang="scss">
.draw-point {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .draw-point-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .draw-point-content {
    display: flex;
    flex: 1;
    .map-container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
