<template>
  <div>
    <div class="left pro-menu">
      <el-menu>
        <el-menu-item>
          <router-link to="/project/content/deviceType/index">设备类型配置</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right pro-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "proContent",
  components: {}
})
export default class extends Vue {
  created() {}
}
</script>

<style scoped lang="scss"></style>
