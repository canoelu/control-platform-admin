<!--图例管理-->
<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <div v-loading="loading">
      <common-form ref="formRef" :form="legendForm" :rules="constant.LEGEND_RULES" :props="constant.LEGEND_PROPS">
        <template v-slot:deal>
          <div class="flexRow mb-10" style="width: 90%">
            <el-select
              class="mr-10"
              v-model="areaName"
              style="width:45%"
              size="small"
              :loading="loadingCode"
              placeholder="插入替换代码"
            >
              <el-option v-for="item in replaceArr" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
            <el-cascader
              style="width:55%"
              v-model="pointId"
              :options="pointCategory"
              :props="{ label: 'name', value: 'id' }"
              @change="changePoint"
              placeholder="点位替换代码"
            ></el-cascader>
          </div>
          <common-upload @handleSuccess="handleSuccess" />
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
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import { saveLegend, getLegend, editLegend, getStatusArr, getPlaceCode, getLegendCode } from "@/api/";
import systemMixin from "../../../mixin/systemMixin";
import commonUpload from "@/components/common-upload/index.vue";
@Component({
  name: "index",
  components: { commonUpload }
})
export default class extends Mixins(systemMixin) {
  @Ref() formRef: any;
  @Prop({ default: false }) private dialogObj: any;
  private statusArr: any[] = []; // 状态
  private replaceArr: any[] = []; // 替换
  uploading: boolean = false;
  loadingCode: boolean = false;
  legendForm: any = {
    codes: ""
  };
  areaName: string = "";
  pointId: string | number = "";
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
  async getLegendCode(id: number | string) {}
  async changePoint(val: any) {
    let _pointId = val[2];
    let res = await getLegendCode(_pointId);
    this.legendForm.codes = res.data;
  }
  async save() {
    this.saving = true;
    try {
      let _data = this.legendForm;
      if (this.isAdd) {
        await saveLegend(_data);
      } else {
        await editLegend({
          ..._data,
          id: this.dialogObj.info.id
        });
      }
      this.saving = false;
      this.$message.success("保存图例成功");
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

  handleSuccess(res: any) {
    this.legendForm.codes += `<img :src="${res.url}"/>`;
  }
  async getDetail() {
    try {
      this.loading = true;
      let { info, type } = this.dialogObj;
      let res = await getLegend(info.id);
      this.loading = false;
      this.legendForm = res.data;
    } catch (e) {
      this.loading = false;
    }
  }
  async getStatusArr() {
    this.loadingCode = true;
    let res = await getStatusArr();
    this.statusArr = res.data;
    this.loadingCode = false;
  }
  async getPlaceCode() {
    let res = await getPlaceCode();
    this.replaceArr = res.data;
  }
  created() {
    this.getPlaceCode();
    this.getStatusArr();
    this.getMetaDataList();
    if (!this.isAdd) {
      this.getDetail();
    }
  }
}
</script>

<style scoped lang="scss"></style>
