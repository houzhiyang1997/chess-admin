<template>
  <el-dialog title="添加职业" width="50%" center :model-value="centerDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="100px"
      label-position="left"
      status-icon
    >
      <el-form-item label="职业ID" prop="raceId">
        <el-input v-model.number="addForm.jobId"></el-input>
      </el-form-item>
      <el-form-item label="职业名称" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduce">
        <el-input v-model="addForm.introduce" :rows="2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="分级介绍" prop="level">
        <el-input v-model="addForm.level" :rows="2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="游戏版本" prop="version">
        <el-select v-model="addForm.version" class="m-2" placeholder="选择游戏版本">
          <el-option label="12.11" value="12.11" />
          <el-option label="12.9" value="12.9" />
        </el-select>
      </el-form-item>
      <el-form-item label="游戏赛季" prop="season">
        <el-input v-model="addForm.season" disabled></el-input>
      </el-form-item>
      <el-form-item label="职业图片" prop="imagePath">
        <el-input v-model="addForm.imagePath"></el-input>
      </el-form-item>
      <el-form-item>
        <el-image :src="addForm.imagePath" style="width: 64px" />
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
    centerDialogVisible: Boolean,
    season: String
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    // 表单的ref
    const addFormRef = ref()
    const state = reactive({
      season: props.season,
      centerDialogVisible: props.centerDialogVisible,
      addForm: {
        jobId: 0,
        name: '',
        introduce: '',
        level: '',
        imagePath: '',
        version: '',
        season: props.season
      }
    })
    // 校验规则
    const addFormRules = {
      jobId: [
        { required: true, message: '请输入职业ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      name: [
        { required: true, message: '请输入职业名称', trigger: 'blur' },
        { min: 2, max: 10, message: '种族名称在2~10个字符之间', trigger: 'blur' }
      ],
      introduce: [
        { required: true, message: '请输入职业简介', trigger: 'blur' },
        { min: 3, max: 255, message: '种族简介在3~255个字符之间', trigger: 'blur' }
      ],
      level: [
        { required: true, message: '请输入职业分级介绍', trigger: 'blur' },
        { min: 3, max: 255, message: '职业分级介绍长度为3-255', trigger: 'blur' },
        {
          pattern: /^(\d:)([\d\w\u4e00-\u9fa5-*\\/【】!！：；。;:%+，.,](&&){0,1})+$/,
          message: '请务必按照‘2:内容&&4:内容’此格式输入',
          trigger: 'blur'
        }
      ],
      version: [{ required: true, message: '请选择游戏版本', trigger: 'blur' }],
      imagePath: [
        { required: true, message: '请输入职业图片地址', trigger: 'blur' },
        {
          pattern: /^(http:|https:).*\.(png|jpg)$/,
          message: '请输入正确的地址',
          trigger: 'blur'
        }
      ]
    }
    // 关闭对话框
    const closeDialog = visible => {
      // 重置表单
      addFormRef.value.resetFields()
      emit('onCloseDialog', visible)
    }
    // 处理添加job
    const submitAdd = () => {
      // 校验表单是否通过
      addFormRef.value.validate(async valid => {
        if (valid) {
          // 发请求
          const { data: res } = await api.addJob(state.addForm)
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
