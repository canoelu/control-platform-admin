<template>
  <div class="common-form" v-if="props.length > 0">
    <el-form
      :size="size"
      :inline="inline"
      ref="formRef"
      :model="form"
      label-position="right"
      :label-width="formLabelWidth"
      :rules="rules"
      @submit.native.prevent
    >
      <template v-for="item in props">
        <el-form-item :label="item.label" :prop="item.prop" :key="item.prop" v-if="showFormItem(item)">
          <el-input
            v-if="isShow(item, 'input')"
            v-model="form[item.prop]"
            :placeholder="item.placeholder ? item.placeholder : `请输入`"
            :disabled="item.disabled"
            autocomplete="off"
            :suffix-icon="item.sIcon"
            :prefix-icon="item.pIcon"
            :maxlength="item.maxLength"
            :rows="item.rows"
            :type="item.type ? item.type : 'text'"
            clearable
            show-word-limit
          >
            <slot name="append"></slot>
          </el-input>

          <el-select
            v-else-if="isShow(item, 'select')"
            v-model="form[item.prop]"
            @change="val => changeSelect(val, item)"
            :filterable="item.filterable"
            :remote="item.remoteMethod ? true : false"
            :remote-method="item.remoteMethod"
            :disabled="item.disabled"
            :clearable="item.clearable || true"
            :placeholder="item.placeholder ? item.placeholder : `请选择`"
            :multiple="item.multiple"
          >
            <el-option
              v-for="option in item.options"
              :key="option[item.keyProp ? item.keyProp.value : 'value']"
              :label="option[item.keyProp ? item.keyProp.label : 'label']"
              :value="option[item.keyProp ? item.keyProp.value : 'value']"
            ></el-option>
          </el-select>
          <el-cascader
            v-else-if="isShow(item, 'cascader')"
            :disabled="item.disabled"
            expand-trigger="hover"
            :placeholder="item.placeholder ? item.placeholder : `请输入${item.label}`"
            :options="item.options"
            :props="item.optionProps"
            v-model="form[item.prop]"
          ></el-cascader>
          <el-date-picker
            v-else-if="isShow(item, 'datePicker')"
            :disabled="item.disabled"
            v-model="form[item.prop]"
            :type="item.type || 'datetime'"
            :picker-options="item.pickerOptions"
            range-separator="至"
            value-format="timestamp"
            @change="val => changeTime(val, item)"
            :start-placeholder="item.startPlaceholder ? item.startPlaceholder : '开始时间'"
            :end-placeholder="item.endPlaceholder ? item.startPlaceholder : '结束时间'"
          ></el-date-picker>

          <el-checkbox-group
            v-else-if="isShow(item, 'checkbox')"
            :disabled="item.disabled"
            v-model="form[item.prop]"
            :min="item.min ? item.min : 0"
            :max="item.max ? item.max : 1000"
          >
            <el-checkbox
              v-for="opt in item.options"
              :label="opt.value"
              :disabled="opt.disabled"
              :key="opt.value"
              :value="opt.value"
              >{{ opt.label }}</el-checkbox
            >
          </el-checkbox-group>

          <el-radio-group v-else-if="isShow(item, 'radio')" v-model="form[item.prop]">
            <el-radio
              :disabled="item.disabled"
              v-for="radio in item.options"
              :key="radio.label"
              :label="radio.value"
              :value="radio.value"
              >{{ radio.label }}</el-radio
            >
          </el-radio-group>
          <el-radio-group v-else-if="isShow(item, 'radioButton')" v-model="form[item.prop]">
            <el-radio-button
              :disabled="item.disabled"
              v-for="radio in item.options"
              :key="radio.label"
              :label="radio.value"
              >{{ radio.label }}</el-radio-button
            >
          </el-radio-group>
          <el-switch v-else-if="isShow(item, 'switch')" v-model="form[item.prop]"> </el-switch>
          <el-upload
            v-else-if="isShow(item, 'upload')"
            class="form-upload"
            :action="item.action"
            :size="item.size"
            :accept="item.accept"
            :disabled="item.disabled"
            v-model="form[item.prop]"
          ></el-upload>
          <span
            v-else-if="isShow(item, 'text')"
            class="text-info"
            :title="item.formatter ? item.formatter(form[item.prop], form) : form[item.prop]"
          >
            {{ item.formatter ? item.formatter(form[item.prop], form) : form[item.prop] }}
          </span>
          <slot :name="item.prop || 'item'"></slot>
          <div v-if="item.tip" :class="['common_tip', item.inlineTip && 'inline-tip']">
            {{ item.tip }}
          </div>
          <form-render v-if="item.render" :prop="item.prop" :row="form" :render="item.render"></form-render>
        </el-form-item>
      </template>
      <slot name="item"></slot>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import FormRender from "./FormRender";

@Component({
  name: "commonSearch",
  components: {
    FormRender
  }
})
export default class extends Vue {
  @Prop({ required: true }) private props!: Array<[]>;
  @Prop({ required: true }) private form!: any;
  @Prop({ default: () => {} }) private rules!: Object;
  @Prop({ default: false }) private inline!: Boolean;
  @Prop({ default: "small" }) private size!: String;
  @Prop({ default: "140px" }) private formLabelWidth!: String;
  isShow(item: any, tag: string): boolean {
    return item.tag === tag;
  }
  changeTime(val: any, item: any) {
    if (item && item.changeTime) {
      item.changeTime(val, item);
    }
  }
  changeSelect(val: any, item: any) {
    if (item.change) {
      item.change(val);
    }
  }
  showFormItem(item: any): boolean {
    if (item.show) {
      return eval(item.show);
    } else {
      return true;
    }
  }
}
</script>

<style>
.text-info {
  display: inline-block;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
