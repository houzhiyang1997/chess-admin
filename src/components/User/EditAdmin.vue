<template>
  <el-dialog title="编辑管理员信息" width="30%" center :model-value="editDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="100px"
      label-position="left"
      status-icon
    >
      <el-form-item label="用户名" prop="admin">
        <el-input v-model="editForm.admin" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="editForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="editForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="管理员级别" prop="level">
        <el-input v-model="editForm.level" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="regDate">
        <el-input v-model="editForm.regDate" @focus="getFormDate"></el-input>
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
import { useCheckDate } from '@/hooks/useValidator.js'
import api from '@/api/index'
import myUtil from '@/util/myUtil.js'
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
        admin: '',
        password: '',
        nickName: '',
        level: '',
        regDate: 0,
        imgUrl: ''
      },
      editDialogVisible: props.editDialogVisible,
      curID: props.curID,
      checkDate: useCheckDate()
    })
    // 校验规则
    const editFormRules = {
      admin: [
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
      level: [{ required: true, message: '管理员级别不可更改', trigger: 'blur' }],
      regDate: [
        { required: true, message: '请确认注册时间不为空', trigger: 'blur' },
        { validator: state.checkDate, trigger: 'blur' }
      ],
      imgUrl: [{ required: true, message: '请输入头像地址', trigger: 'blur' }]
    }
    // 根据id查询用户信息
    const getAdminById = async () => {
      const { data: res } = await api.getAdminById(state.curID)
      state.editForm = res.admin
    }
    // 关闭对话框
    const closeDialog = visible => {
      emit('onCloseEditDialog', visible)
    }
    // 实现点击时间框获取当前时间并填充
    const getFormDate = () => {
      state.editForm.regDate = myUtil.formDate()
    }
    // 处理修改用户信息
    const submitEdit = () => {
      // 校验表单是否通过
      editFormRef.value.validate(async valid => {
        if (valid) {
          // 发请求
          const { data: res } = await api.editAdmin(state.editForm)
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
      getAdminById()
    })
    return {
      ...toRefs(state),
      editFormRules,
      closeDialog,
      editFormRef,
      getAdminById,
      getFormDate,
      submitEdit
    }
  }
}
</script>

<style></style>
