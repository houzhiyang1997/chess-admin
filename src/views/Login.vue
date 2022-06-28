<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="login-from">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" :prefix-icon="UserFilled"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" :prefix-icon="Lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button type="info" @click="loginFormRef.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { reactive, toRefs, ref } from 'vue'
import { ElMessage } from 'element-plus'
import api from '@/api/index'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const loginFormRef = ref()
    const state = reactive({
      loginForm: {
        username: '',
        password: ''
      }
    })
    const loginFormRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 12, message: '用户名长度在3-10', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '密码长度在6-15', trigger: 'blur' }
      ]
    }
    const handleLogin = async () => {
      // 校验表单是否通过
      loginFormRef.value.validate(async valid => {
        if (valid) {
          // 发请求
          const { data: res } = await api.login(state.loginForm)
          if (res.code === 200) {
            ElMessage({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
          }
          if (res.code === 401) {
            return ElMessage({
              showClose: true,
              message: '用户名或密码错误',
              type: 'error'
            })
          }
          if (res.code === 402) {
            return ElMessage({
              showClose: true,
              message: '登录失败',
              type: 'error'
            })
          }
          loginFormRef.value.resetFields()
          // 1、将登陆成功之后的token和username，保存到客户端的sessionStorage中,进行身份验证
          window.sessionStorage.setItem('token', res.token)
          window.sessionStorage.setItem('username', res.data.admin)
          // 2、管理员信息存入vuex
          store.commit('setAdminInfo', res.data)
          // 2、通过编程式导航跳转到home
          router.replace('/home')
        }
      })
    }
    return { Lock, UserFilled, ...toRefs(state), loginFormRules, loginFormRef, handleLogin }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 450px;
  height: 300px;
  border-radius: 30px;
  margin: 0 auto;
  .login-form {
    padding: 10px 0;
  }
}
</style>
