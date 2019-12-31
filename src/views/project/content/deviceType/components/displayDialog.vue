<!--展示配置-->
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
      <search-table
        :data="[{}]"
        ref="tblRef"
        :showPage="false"
        :searchConfig="constant.DISPLAY_SEARCH_CONFIG"
        :tableColumns="constant.DISPLAY_COLUMNS"
      ></search-table>
    </div>
    <!--添加分组-->
    <add-group-display-dialog v-if="groupDialog.show" @handleClose="closeGroupAndPoint" :dialogObj="groupDialog" />
    <!--点位类别-->
    <choose-point-type-dialog v-if="pointDialog.show" @handleClose="closeGroupAndPoint" :dialogObj="pointDialog" />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import { saveProjectDevType, editProjectDevType, getProjectDevType, deleteProjectDevType } from "@/api/";
import addGroupDisplayDialog from "./addGroupDisplayDialog.vue";
import choosePointTypeDialog from "./choosePointTypeDialog.vue";
@Component({
  name: "index",
  components: { addGroupDisplayDialog, choosePointTypeDialog }
})
export default class extends Vue {
  @Ref() formRef: any;
  @Ref() tblRef: any;
  @Prop({ default: () => {} }) private dialogObj: any;
  uploading: boolean = false;
  map: any;
  groupDialog: any = {
    show: false,
    title: "添加展示分组",
    info: {},
    isAdd: false
  };
  pointDialog: any = {
    show: false,
    title: "点位类型选择",
    info: {},
    isAdd: false
  };
  deviceTypeForm: any = {
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
  addDisplayGroup() {
    this.groupDialog.show = true;
    this.groupDialog.isAdd = true;
    this.groupDialog.title = "添加展示分组";
  }
  editDisplay(row: any) {
    this.groupDialog.show = true;
    this.groupDialog.isAdd = false;
    this.groupDialog.title = "编辑展示分组";
    this.groupDialog.info = row;
  }
  addPointType(row: any) {
    this.pointDialog.show = true;
    this.pointDialog.isAdd = true;
    this.pointDialog.title = "点位类型选择";
  }
  editPointType(row: any) {
    this.pointDialog.show = true;
    this.pointDialog.isAdd = false;
    this.pointDialog.title = "修改点位类型";
    this.pointDialog.info = row;
  }
  deletePoint(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteProjectDevType(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }
  deleteGroup(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deleteProjectDevType(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }
  getTblList() {
    this.tblRef.getList();
  }
  async save() {
    this.saving = true;
    try {
      let _data = this.deviceTypeForm;
      if (this.isAdd) {
        await saveProjectDeviceType(_data);
      } else {
        await editProjectDeviceType({
          ..._data,
          id: this.dialogObj.info.id
        });
      }
      this.saving = false;
      this.$message.success("保存设备类别成功");
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
      let res = await getProjectDeviceType(info.id);
      this.loading = false;
      this.deviceTypeForm = res.data;
    } catch (e) {
      this.loading = false;
    }
  }
  closeGroupAndPoint() {
    this.pointDialog.show = false;
    this.groupDialog.show = false;
  }
  mounted() {
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
