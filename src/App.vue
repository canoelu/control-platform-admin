<template>
  <div id="app">
    <con-layout v-if="$route.meta.withMenu"></con-layout>
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import conLayout from "@/components/layout/index.vue";

@Component({
  components: { conLayout }
})
export default class App extends Vue {
  /**
   * 计算REM
   */
  calSize() {
    let designSize = 1920; // 设计图尺寸
    let html = document.documentElement;
    let cW = html.clientWidth; // 窗口宽度
    let rem = (cW * 100) / designSize;
    document.documentElement.style.fontSize = rem + "px";
  }
  mounted() {
    window.onresize = (e: any) => {
      this.calSize();
    };
    this.calSize();
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
