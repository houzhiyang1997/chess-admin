<template>
  <el-dialog title="编辑用户" width="30%" center :model-value="editDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="90px"
      label-position="left"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="editForm.password" type="password" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="editForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-input v-model="editForm.level"></el-input>
      </el-form-item>
      <el-form-item label="经验" prop="exp">
        <el-input v-model="editForm.exp"></el-input>
      </el-form-item>
      <el-form-item label="积分" prop="score">
        <el-input v-model="editForm.score"></el-input>
      </el-form-item>
      <el-form-item label="头像地址" prop="imgUrl">
        <el-input v-model="editForm.imgUrl"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import { reactive, toRefs, ref, onMounted } from 'vue'
import api from '@/api/index'
export default {
  props: {
    editDialogVisible: Boolean,
    curID: Number
  },
  emits: ['onCloseEditDialog'],
  setup(props, { emit }) {
    // 表单的ref
    const editFormRef = ref()
    const state = reactive({
      editForm: {
        username: '',
        password: '',
        nickName: '',
        level: '',
        exp: 0,
        score: 0,
        imgUrl: ''
      },
      editDialogVisible: props.editDialogVisible,
      curID: props.curID
    })
    // 校验规则
    const editFormRules = {
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
      imgUrl: [{ required: true, message: '请输入头像地址', trigger: 'blur' }]
    }
    // 根据id查询用户信息
    const getUserById = async () => {
      const { data: res } = await api.getUserById(state.curID)
      state.editForm = res.user
    }
    // 关闭对话框
    const closeDialog = visible => {
      emit('onCloseEditDialog', visible)
    }
    // 处理修改用户信息
    const submitEdit = () => {
      // 校验表单是否通过
      editFormRef.value.validate(async valid => {
        if (valid) {
          // 发请求
          const { data: res } = await api.editUser(state.editForm)
          if (res.code === 200) {
            // 成功后 发出关闭对话框请求
            emit('onCloseEditDialog', false, res.count)
            // 重置表单
            editFormRef.value.resetFields()
          } else {
            ElMessage.error('修改失败')
          }
        }
      })
    }
    onMounted(() => {
      getUserById()
    })
    return {
      ...toRefs(state),
      editFormRules,
      closeDialog,
      editFormRef,
      getUserById,
      submitEdit
    }
  }
}
</script>

<style></style>
