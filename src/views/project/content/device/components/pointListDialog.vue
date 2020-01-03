<!--点位列表-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <search-table
      url="config/project/points/"
      :searchParams="searchParams"
      :tableColumns="constant.POINT_LIST_COLUMNS"
      :searchConfig="constant.POINT_SEARCH_CONFIG"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import projectMixin from "../../../mixin/projectMixin";
@Component({
  name: "index",
  components: {}
})
export default class extends Mixins(projectMixin) {
  @Ref() formRef: any;
  @Ref() groupTbl: any;
  @Prop({ default: false }) private dialogObj: any;
  get constant() {
    return new Const(this).const;
  }
  get searchParams() {
    return {
      orgId: this.orgId
    };
  }
  handleClose() {
    this.$emit("handleClose");
  }
  choose(row: any) {
    this.$emit("choosePoint", row);
    this.handleClose();
  }
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
