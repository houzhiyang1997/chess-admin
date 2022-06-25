<template>
  <el-dialog title="编辑种族信息" width="50%" center :model-value="editDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="100px"
      label-position="left"
      status-icon
    >
      <el-form-item label="种族ID" prop="raceId">
        <el-input v-model.number="editForm.raceId"></el-input>
      </el-form-item>
      <el-form-item label="种族名称" prop="name">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduce">
        <el-input v-model="editForm.introduce" :rows="2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="分级介绍" prop="level">
        <el-input v-model="editForm.level" :rows="2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="游戏版本" prop="version">
        <el-select v-model="editForm.version" class="m-2" placeholder="选择游戏版本">
          <el-option label="12.11" value="12.11" />
          <el-option label="12.9" value="12.9" />
        </el-select>
      </el-form-item>
      <el-form-item label="游戏赛季" prop="season">
        <el-input v-model="editForm.season" disabled></el-input>
      </el-form-item>
      <el-form-item label="种族图片" prop="imagePath">
        <el-input v-model="editForm.imagePath"></el-input>
      </el-form-item>
      <el-form-item>
        <el-image :src="editForm.imagePath" style="width: 64px" />
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
    curID: Number,
    season: String
  },
  emits: ['onCloseEditDialog'],
  setup(props, { emit }) {
    // 表单的ref
    const editFormRef = ref()
    const state = reactive({
      season: props.season,
      editForm: {
        raceId: 0,
        name: '',
        introduce: '',
        level: '',
        imagePath: '',
        version: '',
        season: props.season
      },
      editDialogVisible: props.editDialogVisible,
      curID: props.curID
    })
    // 校验规则
    const editFormRules = {
      raceId: [
        { required: true, message: '请输入种族ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      name: [
        { required: true, message: '请输入种族名称', trigger: 'blur' },
        { min: 2, max: 10, message: '种族名称在2~10个字符之间', trigger: 'blur' }
      ],
      introduce: [
        { required: true, message: '请输入种族简介', trigger: 'blur' },
        { min: 3, max: 255, message: '种族简介在3~255个字符之间', trigger: 'blur' }
      ],
      level: [
        { required: true, message: '请输入种族分级介绍', trigger: 'blur' },
        { min: 3, max: 255, message: '种族分级介绍长度为3-255', trigger: 'blur' },
        {
          pattern: /^(\d:)([\d\w\u4e00-\u9fa5-*\\/【】!！：；;:%+，,](&&){0,1})+$/,
          message: '请务必按照‘2:内容&&4:内容’此格式输入',
          trigger: 'blur'
        }
      ],
      version: [{ required: true, message: '请选择游戏版本', trigger: 'blur' }],
      imagePath: [
        { required: true, message: '请输入种族图片地址', trigger: 'blur' },
        {
          pattern: /^(http:|https:).*\.(png|jpg)$/,
          message: '请输入正确的地址',
          trigger: 'blur'
        }
      ]
    }
    // 根据id查询 英雄棋子 信息
    const getRaceById = async () => {
      const { data: res } = await api.getRaceById(state.curID)
      console.log(res)
      state.editForm = res.race
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
          const { data: res } = await api.editRace(state.editForm)
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
      getRaceById()
    })
    return {
      ...toRefs(state),
      editFormRules,
      closeDialog,
      editFormRef,
      getRaceById,
      submitEdit
    }
  }
}
</script>

<style lang="less" scoped>
.pre-img {
  display: flex;
  align-items: center;
  .el-image {
    width: 64px;
  }
  div {
    text-align: center;
    margin: 0 15px;
  }
}
</style>
