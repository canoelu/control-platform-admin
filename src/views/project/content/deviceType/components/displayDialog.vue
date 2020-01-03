<!--展示配置弹框-->
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
      <div class="mb-10 mt-10" v-for="(group, idx) in pointGroupList" :key="group.id">
        <div class="flexBetween mb-10">
          <span class="ml-10">{{ group.categoryName }}</span>
          <el-button type="primary" size="mini" @click="addDisplayGroup(group)">添加点位分组</el-button>
        </div>
        <search-table
          :data="group.childrenPointGroup"
          ref="tblRef"
          :showPage="false"
          :border="true"
          :tableColumns="constant.DISPLAY_COLUMNS"
          :treeProps="{ children: 'children', hasChildren: 'hasChildren' }"
          rowKey="id"
          :searchParams="searchParams"
        />
      </div>
      <div class="flexCenter mb-10 mt-10" v-if="pointGroupList.length < 1">暂无数据,请对子设备类别进行配置</div>
    </div>
    <!--添加分组-->
    <add-group-display-dialog
      v-if="groupDialog.show"
      :devTypeId="devTypeId"
      @getTblList="getTblList"
      @handleClose="closeGroupAndPoint"
      :dialogObj="groupDialog"
    />
    <!--点位类别-->
    <choose-point-type-dialog
      v-if="pointDialog.show"
      :devTypeId="devTypeId"
      @getTblList="getTblList"
      @handleClose="closeGroupAndPoint"
      :dialogObj="pointDialog"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import { getPointGroupList, deletePointGroup, unBindPointAndMetadata } from "@/api/";
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

  loading: boolean = false;
  pointGroupList: any[] = [];
  get constant() {
    return new Const(this).const;
  }
  get isAdd() {
    return this.dialogObj.isAdd;
  }
  get devTypeId() {
    return this.dialogObj.info.id;
  }
  get searchParams() {
    return {
      devTypeId: this.devTypeId
    };
  }
  handleClose() {
    this.$emit("handleClose");
  }
  addDisplayGroup(group: any) {
    this.groupDialog.show = true;
    this.groupDialog.isAdd = true;
    this.groupDialog.title = "添加展示分组";
    this.groupDialog.info = group;
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
    this.pointDialog.parent = row;
    this.pointDialog.title = "点位类型选择";
  }
  editPointType(row: any) {
    this.pointDialog.show = true;
    this.pointDialog.isAdd = false;
    this.pointDialog.title = "修改点位类型";
    this.pointDialog.info = row;
  }
  deletePointType(row: any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await unBindPointAndMetadata(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }
  deleteGroup(row: any,idx:any) {
    this.$confirm("确定要删除", "提示").then(async () => {
      await deletePointGroup(row.id);
      this.$message.success("删除成功");
      this.getTblList();
    });
  }
  getTblList() {
    this.getPointGroupList();
  }

  closeGroupAndPoint() {
    this.pointDialog.show = false;
    this.groupDialog.show = false;
  }
  async getPointGroupList() {
    this.pointGroupList=[]
    try {
      this.loading = true;
      let res = await getPointGroupList({
        page: 1,
        pageSize: 100,
        devTypeId: this.devTypeId
      });
      this.loading = false;
      this.pointGroupList = res.data.list;

    } catch (e) {
      this.loading = false;
    }
  }
  mounted() {
    this.getPointGroupList();
  }
}
</script>

<style scoped lang="scss"></style>
