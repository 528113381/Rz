<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <el-form ref="formRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="checkbox">
            <el-checkbox v-model="ruleForm.checkbox">用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    // 在data里面定义一个校验的函数，不在methods里面定义，不需要挂载到this上面去
    // 自定义校验函数第一个参数 不需要使用，但是必须要写，仅仅只是站一个位置，一般使用 下划线作为变量名
    const validatorCheckbox = function(_, value, callback) {
      if (!value) {
        callback(new Error('请勾选用户平台使用协议'))
        return
      }

      // callback是自定义校验的时候，必须执行的一个函数，不写的话，校验就会失败，程序就卡死了
      callback()
    }
    return {
      ruleForm: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        checkbox: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 15, message: '密码长度在5到15个字符', trigger: 'blur' }
        ],
        checkbox: [
          // trigger什么操作触发校验， 一般是 blur 失去焦点，或者change 数据改变
          { validator: validatorCheckbox, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate(async(value) => {
        if (value) {
          console.log('发送请求')
          // 请求写在vuex的actions里
          const res = await this.$store.dispatch('user/loginAction', { mobile: this.ruleForm.mobile, password: this.ruleForm.password })
          console.log(1111)
          if (res) {
            this.$router.push('/')
          }
        }
      })
    },
    resetForm() {}
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
    // 我们想二次修改element-ui的样式，除了深度选择器的问题以外，还有样式层级的问题
    // 解决层级问题：就是多使用嵌套的类名，人为的增加选择器的权重
    .el-button {
      // width: 100%;  calc css原生的计算函数，不同的单位可以相减
      width: calc(350px);
    }
    .el-form-item {
      margin-left: 0;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
