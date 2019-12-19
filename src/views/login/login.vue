<template>
  <login-container>
    <el-form @submit.native.prevent :rules="rules" :model="formLogin" ref="ruleForm" class="form">
      <span class="title"></span>
      <el-form-item prop="username">
        <input class="form-ipt" placeholder="请输入账号" v-model.trim="formLogin.username" maxlength="20">
        </input>
      </el-form-item>
      <el-form-item prop="password">
        <input
          class="form-ipt"
          placeholder="请输入密码"
          v-model.trim="formLogin.password"
          v-formatNotTxt="formLogin.password"
          @keypress.enter="login"
          :type="pwdVisible ? 'text' : 'password'"
          maxlength="20"
        >
        </input>
      </el-form-item>
      <el-form-item prop="codeValue">
        <div class="flexBetween code-wrap">
          <input class="form-ipt code-ipt"
                 placeholder="请输入验证码"
                 v-model.trim="formLogin.codeValue"
                 v-formatNotTxt="formLogin.codeValue"
                 @keypress.enter="login"
                 maxlength="4"
          >

          </input>
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </el-form-item>
      <button class="login-btn"  @click="login" :loading="submitLoading">登录</button>
    </el-form>
  </login-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import LoginContainer from "@/components/login-container/index.vue";
import SIdentify from './identify.vue'
 const IDENTIFYCODES = '1234567890abcdefghijklmnopqrstuvwxyz'

interface UserRoleConfigVal {
  key: string;
  value: string;
  routerName: string;
}
interface LoginInfo {
  username: string | (string | null)[];
  password: string;
  codeValue: string;
  codeId?: string;
}
interface Rules {
  username: any;
  password: any;
  codeValue: any;
}
interface LoginSucUserInfo {
  tenantId: number;
  token: string;
  userId: number;
}

@Component({
  components: {
    LoginContainer,
    SIdentify
  }
})
export default class App extends Vue {
  private pwdVisible: boolean = false;
  private codeImg: string = "";
 private identifyCode:string='';
 private identifyCodes:string=IDENTIFYCODES;
  private submitLoading: boolean = false;
  private loadingCode: boolean = false;
  private role: number | string = 1;
  private rules: Rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    codeValue: [{ required: true, message: "请输入验证码", trigger: "blur" }]
  };
  private formLogin: LoginInfo = {
    username: "",
    password: "",
    codeValue: ""
  };

  @Ref() readonly ruleForm: any;

  /**
   * @description 显示密码
   */
  private showPwd() {
    this.pwdVisible = !this.pwdVisible;
  }
  /**
   * @description 获取验证码
   * @description 第一次请求是为了生成图形验证码，第二次请求是获取验证码地址
   */
  private async getLoginCode() {
    this.loadingCode = true;
  }

  /**
   * @description 登录
   */
  // 点击登录按钮
  private login() {
    this.ruleForm.validate((valid: boolean) => {
      if (valid) {
        this._submitLoginApi();
      }
    });
  }
  // 请求登录api
  private async _submitLoginApi() {
    this.submitLoading = true;
    const {
      formLogin: { username, password, codeId, codeValue },
      role
    } = this;
    this.$router.push({
      path: "/system/metadata/index"
    });
  }
  // 登录成功
  _loginSuccess(data: any) {}
  randomNum(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  refreshCode() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  }
  makeCode(o:any, l:any) {
    for (let i = 0; i < l; i++) {
      let codes = this.randomNum(0, this.identifyCodes.length)
      this.identifyCode += this.identifyCodes[codes]
    }
  }
  /**
   * @description 根据不同路径判断不同的值
   */
  mounted() {
    this.formLogin.username = this.$route.query.username || "";
    this.getLoginCode();
    this.makeCode(this.identifyCodes, 4)
  }
}
</script>
<style lang="scss" scoped>
.login {
  .form {
    padding-left: 8%;
    margin-top: -10px;
  }
  .form-ipt {
    background: none;
    display: block;
    border: 2px solid #3498db;
    padding: 14px 10px;
    text-align: center;
    width: 90%;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    transform-origin: center center;
    &:focus {
      width: 95%;
      border-color: #2ecc71;
    }
  }
  .code-wrap{
    width: 90%;
  }
  .code-ipt{
    width: 50%;
    &:focus{
      width: 55%;
    }

  }
}


.title {
  color: rgba(4, 104, 179, 1);
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 25px;
  display: inline-block;
}
.copy {
  font-size: 12px;
  color: #ccc;
}
.icon {
  width: 17px;
  vertical-align: sub;
}
.icon-code-suffix {
  cursor: pointer;
  width: 150px;
  position: relative;
  top: -10px;
  vertical-align: sub;
  font-size: 10px;
}
.icon-code {
  width: 15px;
  vertical-align: sub;
}
.refresh {
  font-size: 10px;
  color: #358bd4;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
}
.icon-lock {
  width: 13px;
  vertical-align: sub;
  height: 18px;
}
.icon-eye {
  width: 14px;
  height: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.icon-eye:nth-of-type(1) {
  margin-right: 5px;
}
.login-btn{
   background: none;
  display: block;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 14px 10px;
  width: 90%;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
  &:hover{
    background: #2ecc71;
  }
}
</style>
