<!--区域管理-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="62.5%"
    :before-close="handleClose"
    append-to-body
  >
    <div v-loading="loading">
      <common-form ref="formRef" :form="regionForm" :rules="constant.REGION_RULES" :props="constant.REGION_PROPS">
        <!--地图中心-->
        <template v-slot:center>
          <div id="mapBox" class="map-box"></div>
        </template>
        <template v-slot:url>
          <common-upload @handleSuccess="handleSuccess"></common-upload>
        </template>
      </common-form>
      <div class="flexCenter">
        <el-button size="small" @click="handleClose">关闭</el-button>
        <el-button size="small" type="primary" @click="handleSave" :loading="saving">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins, Watch } from "vue-property-decorator";
import Const from "../const/";
import { saveProjectRegion, getProjectRegion, editProjectRegion } from "@/api/";
import BMap from "BMap";
import commonUpload from "@/components/common-upload/index.vue";
import projectMixin from "../../../mixin/projectMixin";

@Component({
  name: "index",
  components: { commonUpload }
})
export default class extends Mixins(projectMixin) {
  @Ref() formRef: any;
  @Prop({ default: false }) private dialogObj: any;
  uploading: boolean = false;
  map: any;
  initPoint: any[] = [104.067923463, 30.6799428454];
  regionForm: any = {
    name: "",
    type: 2,
    zoom: 16,
    longitude: null,
    latitude: null
  };
  saving: boolean = false;
  loading: boolean = false;
  get constant() {
    return new Const(this).const;
  }
  get isAdd() {
    return this.dialogObj.isAdd;
  }
  handleClose() {
    this.$emit("handleClose");
  }
  async save() {
    this.saving = true;
    try {
      let _data = this.regionForm;
      if (this.isAdd) {
        await saveProjectRegion(_data);
      } else {
        await editProjectRegion({
          ..._data,
          id: this.dialogObj.info.id
        });
      }
      this.saving = false;
      this.$message.success("保存系统成功");
      this.$emit("handleClose");
      this.$emit("getTblList");
    } catch (e) {
      this.saving = false;
    }
  }
  handleSave() {
    let _formRef: any = this.formRef.$refs.formRef;
    _formRef.validate((valid: boolean) => {
      if (valid) {
        this.save();
      }
    });
  }
  async getDetail() {
    try {
      this.loading = true;
      let { info, type } = this.dialogObj;
      let res = await getProjectRegion(info.id);
      this.loading = false;
      this.regionForm = res.data;

      this.initPoint = [res.data.longitude, res.data.latitude];
    } catch (e) {
      this.loading = false;
    }
  }
  handleSuccess(res: any) {
    this.regionForm.url = res.url;
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
      this.regionForm.latitude = lat;
      this.regionForm.longitude = lng;
    });
  }
  mounted() {
    let { info, type } = this.dialogObj;
    // 机构ID
    this.regionForm.orgId = this.orgId;
    if (info) {
      console.log(info.id);
      // 父ID
      this.regionForm.parentId = info.id;
    }

    if (!this.isAdd) {
      this.getDetail();
    }
    this.$nextTick(() => {
      this.map = new BMap.Map("mapBox");
      this.renderMap();
    });
  }
  @Watch("initPoint", { deep: true })
  onInitPoint() {
    this.$nextTick(() => {
      // this.map.clearOverlays();
      this.renderMap();
    });
  }
}
</script>

<style scoped lang="scss">
.region-add-dialog {
  .map-box {
    width: 100%;
    height: 300px;
  }
}
.anchorBL {
  display: none;
}
</style>
