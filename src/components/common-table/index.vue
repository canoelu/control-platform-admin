<template>
  <div class="common-table">
    <slot></slot>
    <el-table
      :data="data"
      v-loading="loading"
      tooltip-effect="light"
      size="small"
      ref="tableRef"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      :span-method="spanMethod"
      :highlight-current-row="false"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      @current-change="singleSelectChange"
      :row-key="rowKey"
      :tree-props="treeProps"
      :lazy="lazy"
      v-bind="$attrs"
    >
      <el-table-column type="selection" width="55" v-if="tableColumns && tableColumns[0].type === 'selection'">
      </el-table-column>
      <el-table-column
        :prop="column.key"
        :label="column.title"
        :type="column.type"
        :width="column.width"
        :sortable="column.sortable"
        :show-overflow-tooltip="column.operate ? false : column.showTooltip === false ? false : true"
        v-for="column in tableColumns"
        v-if="column.type !== 'selection'"
        :key="column.key"
      >
        <!--eslint-enable-->
        <template slot-scope="{ row, $index }">
          <!-- 列的slot -->
          <slot :name="column.slotName" v-if="column.slot" :row="row" :index="$index"></slot>

          <column-render v-else-if="column.render" :row="row" :render="column.render" :index="$index"></column-render>
          <span v-else-if="!column.operate && column.key">{{
            column.formatter ? column.formatter(row[column.key], $index, row) : row[column.key]
          }}</span>
          <div v-else-if="column.operate">
            <span style="margin: 0 2px" v-for="(item, idx) in column.setBtns(row, $index)" :key="idx">
              <el-button
                class="deal-btn"
                :disabled="item.disabled"
                :class="item.color"
                v-if="!item.hide"
                :type="item.type || 'text'"
                :size="item.size || 'medium'"
                @click="e => item.handler(row, $index, e)"
                v-bind="$attrs"
                >{{ item.label }}</el-button
              >
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager" v-if="showPage">
      <el-pagination
        :layout="layoutSet"
        :page-size="filter.size"
        :page-sizes="[5, 10, 20, 30]"
        :pager-count="5"
        :current-page="filter.page"
        @current-change="currentChange"
        @size-change="sizeChange"
        background
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import ColumnRender from "./ColumnRender";
@Component({
  name: "commonTable",
  components: {
    ColumnRender
  }
})
export default class CommonTable extends Vue {
  @Ref() readonly tableRef!: any;
  @Prop({ required: true }) private data!: Array<[]>;
  @Prop({ default: 0 }) private total!: number;
  @Prop({ default: false }) private loading!: boolean;
  @Prop({ default: () => {} }) private filter!: any;
  @Prop({ required: true }) private tableColumns!: Array<[]>;
  @Prop({ default: undefined }) private spanMethod?: Function;
  @Prop({ default: undefined }) private summaryMethod?: Function;
  @Prop({ default: true }) private showPage!: boolean;
  @Prop({ default: false }) private lazy?: boolean;
  @Prop({ default: "" }) private rowKey?: string;
  @Prop({ default: () => {} }) private treeProps!: any;
  @Prop({ default: false }) private showSummary!: boolean;
  @Prop({ default: "prev, pager, next, sizes, jumper,total" })
  private layout!: string;

  get layoutSet() {
    return this.layout;
  }

  private singleSelectChange(val: any) {
    this.$emit("singleSelectChange", val);
  }
  private currentChange(val: number) {
    this.$emit("currentChange", val);
  }
  private sizeChange(val: number) {
    this.$emit("sizeChange", val);
  }
  private handleSelectionChange(val: any) {
    this.$emit("selectionChange", val);
  }
  getSummaries(params: any) {
    let _arr: any = this.summaryMethod ? this.summaryMethod(params) : [];
    return _arr;
  }
  clearSelection() {
    this.tableRef.clearSelection();
  }
  toggleRowSelection(row: any, selected: boolean = true) {
    this.$nextTick(() => {
      this.tableRef.toggleRowSelection(row, selected);
    });
  }
  toggleAllSelection() {
    this.$nextTick(() => {
      this.tableRef.toggleAllSelection();
    });
  }
}
</script>

<style lang="scss">
.common-table {
  .filter-header {
    .el-form {
      float: left;
    }
  }
  .deal-btn {
    margin-right: 20px;
    &.write {
      color: #fff;
    }
    &.grey {
      color: #add8ff;
    }
    .pagination {
      float: right;
      margin-top: 15px;
    }
  }
  .pager {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
