<template>
  <el-header class="page-header"> </el-header>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
@Component({
  name: "headerView",
  components: {}
})
export default class App extends Vue {}
</script>

<style lang="scss">
.page-header {
  position: relative;
  @include flexCenter(column);
  @include wh(100%, px2rem(80));
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.21);
  background: #fff;
}
</style>
