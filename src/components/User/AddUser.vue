<template>
  <el-dialog title="添加用户" width="30%" center :model-value="centerDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="90px"
      label-position="left"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="addForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-input v-model="addForm.level" disabled></el-input>
      </el-form-item>
      <el-form-item label="经验" prop="exp">
        <el-input v-model="addForm.exp" disabled></el-input>
      </el-form-item>
      <el-form-item label="积分" prop="score">
        <el-input v-model="addForm.score" disabled></el-input>
      </el-form-item>
      <el-form-item label="头像地址" prop="imgUrl">
        <el-input v-model="addForm.imgUrl"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: {
    centerDialogVisible: Boolean
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const state = reactive({
      centerDialogVisible: props.centerDialogVisible,
      addForm: {
        username: '',
        password: '',
        nickName: '',
        level: 'LV1',
        exp: 0,
        score: 0,
        imgUrl: ''
      }
    })
    // 校验规则
    const addFormRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度在3~10个字符之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '密码长度在6~15个字符之间', trigger: 'blur' }
      ],
      nickName: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 3, max: 10, message: '昵称长度在3~10个字符之间', trigger: 'blur' }
      ],
      level: [
        { required: true, message: '请输入等级', trigger: 'blur' },
        { min: 3, max: 4, message: '等级格式为LV1-10', trigger: 'blur' }
      ],
      exp: [{ required: true, message: '请输入经验值默认为0', trigger: 'blur' }],
      score: [{ required: true, message: '请输入积分默认为0', trigger: 'blur' }],
      imgUrl: [
        { required: true, message: '请输入头像地址', trigger: 'blur' },
        { min: 1, max: 10, message: '请输入头像地址', trigger: 'blur' }
      ]
    }
    const closeDialog = visible => {
      emit('onCloseDialog', visible)
    }
    return {
      ...toRefs(state),
      addFormRules,
      closeDialog
    }
  }
}
</script>

<style></style>
