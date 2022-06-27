<template>
  <el-dialog title="添加新闻" width="60%" center :model-value="centerDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="120px"
      label-position="left"
      status-icon
    >
      <el-form-item label="新闻ID" prop="newsId">
        <el-input v-model="addForm.newsId"></el-input>
      </el-form-item>
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="addForm.author"></el-input>
      </el-form-item>
      <el-form-item label="作者头像地址" prop="author_img">
        <el-input v-model="addForm.author_img"></el-input>
      </el-form-item>
      <el-form-item label="头像预览">
        <el-image :src="addForm.author_img" style="width: 64px" />
      </el-form-item>
      <el-form-item label="封面图" prop="img">
        <el-input v-model="addForm.img"></el-input>
      </el-form-item>
      <el-form-item label="封面图预览">
        <el-image :src="addForm.img" style="height: 64px" />
      </el-form-item>
      <el-form-item label="新闻内容" prop="content">
        <el-input
          v-model="addForm.content"
          :autosize="{ minRows: 2, maxRows: 10 }"
          type="textarea"
          placeholder="分段内容请以回车分隔"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import { reactive, toRefs, ref } from 'vue'
import api from '@/api/index'
export default {
  props: {
    centerDialogVisible: Boolean
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    // 表单的ref
    const addFormRef = ref()
    const state = reactive({
      centerDialogVisible: props.centerDialogVisible,
      addForm: {
        newsId: 0,
        title: '',
        author: '',
        author_img: '',
        img: '',
        content: ''
      }
    })
    // 校验规则
    const addFormRules = {
      newsId: [
        { required: true, message: '请输入新闻id', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      title: [
        { required: true, message: '请输入新闻标题', trigger: 'blur' },
        { min: 2, max: 24, message: '密码标题在2~24个字符之间', trigger: 'blur' }
      ],
      author: [
        { required: true, message: '请输入作者', trigger: 'blur' },
        { min: 3, max: 10, message: '昵称长度在3~10个字符之间', trigger: 'blur' }
      ],
      author_img: [
        { required: true, message: '请输入作者头像', trigger: 'blur' },
        {
          pattern: /^(http:|https:).*\.(png|jpg)$/,
          message: '请输入正确的地址',
          trigger: 'blur'
        }
      ],
      img: [
        { required: true, message: '请输入封面图', trigger: 'blur' },
        {
          pattern: /^(http:|https:).*\.(png|jpg)$/,
          message: '请输入正确的地址',
          trigger: 'blur'
        }
      ],
      content: [{ required: true, message: '请输入新闻内容', trigger: 'blur' }]
    }
    // 关闭对话框
    const closeDialog = visible => {
      // 重置表单
      addFormRef.value.resetFields()
      emit('onCloseDialog', visible)
    }
    // 处理添加用户
    const submitAdd = () => {
      // 校验表单是否通过
      addFormRef.value.validate(async valid => {
        if (valid) {
          // 发请求
          const { data: res } = await api.addUser(state.addForm)
          if (res.code === 200) {
            // 成功后 发出关闭对话框请求
            emit('onCloseDialog', false, res.count)
            // 重置表单
            addFormRef.value.resetFields()
          } else {
            ElMessage.error('添加失败')
          }
        }
      })
    }
    return {
      ...toRefs(state),
      addFormRules,
      closeDialog,
      addFormRef,
      submitAdd
    }
  }
}
</script>

<style></style>
