<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-content">
        <div class="content-left">
          <div>
            <img src="" alt="" class="logo" />
          </div>
          <slot></slot>
        </div>
        <div class="content-right"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  .login-wrapper {
    position: relative;
    width: 70%;
    height: 80%;
    min-width: 800px;
    min-height: 400px;
    max-width: 1024px;
    max-height: 600px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 9px 35px 0px rgba(20, 94, 132, 0.1);
    border-radius: 10px;
    .login-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      // padding-right: 5%;
    }
    .content-left {
      width: 35%;
      text-align: left;
      .logo {
        width: 65%;
      }
    }

    .content-right {
      text-align: left;
      width: 40%;
      height: 66%;
      background-size: 100% 100%;
    }
  }
}
</style>
