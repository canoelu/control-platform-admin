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
    <div>
      <search-table :tableColumns="constant.POINT_COLUMNS" :searchConfig="constant.POINT_SEARCH_CONFIG"></search-table>
      <div class="flexCenter">
        <el-button size="small" @click="handleClose">关闭</el-button>
        <el-button size="small" type="primary" @click="handleSave" :loading="saving">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import { saveProjectDeviceType, editProjectDeviceType, getProjectDeviceType } from "@/api/";
@Component({
  name: "index",
  components: {}
})
export default class extends Vue {
  @Ref() formRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: false }) private dialogObj: any;
  uploading: boolean = false;
  map: any;
  deviceForm: any = {
    name: ""
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
  bind() {}
  addDevice() {}
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
