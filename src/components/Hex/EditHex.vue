<template>
  <el-dialog title="编辑海克斯" width="50%" center :model-value="editDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="100px"
      label-position="left"
      status-icon
    >
      <el-form-item label="海克斯ID" prop="hexId">
        <el-input v-model.number="editForm.hexId"></el-input>
      </el-form-item>
      <el-form-item label="海克斯名" prop="name">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="海克斯等级" prop="type">
        <el-select v-model="editForm.type" class="m-2" placeholder="选择技能类型">
          <el-option label="白银" :value="1" />
          <el-option label="黄金" :value="2" />
          <el-option label="彩金" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="海克斯效果" prop="description">
        <el-input v-model="editForm.description" :rows="2" type="textarea"></el-input>
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
      <el-form-item label="图片地址" prop="imgUrl">
        <el-input v-model="editForm.imgUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-image :src="editForm.imgUrl" style="width: 64px" />
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
        hexId: 0,
        name: '',
        type: 1,
        description: '',
        imgUrl: '',
        version: '',
        season: props.season
      },
      editDialogVisible: props.editDialogVisible,
      curID: props.curID
    })
    // 校验规则
    const editFormRules = {
      hexId: [
        { required: true, message: '请输入海克斯ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      name: [
        { required: true, message: '请输入海克斯名称', trigger: 'blur' },
        { min: 2, max: 10, message: '海克斯名称在2~10个字符之间', trigger: 'blur' }
      ],
      type: [{ required: true, message: '请选择海克斯类型', trigger: 'blur' }],
      description: [
        { required: true, message: '请输入海克斯详细属性', trigger: 'blur' },
        { min: 3, max: 255, message: '海克斯详细属性长度为3-255', trigger: 'blur' }
      ],
      version: [{ required: true, message: '请选择游戏版本', trigger: 'blur' }],
      imgUrl: [
        { required: true, message: '请输入海克斯图片地址', trigger: 'blur' },
        {
          pattern: /^(http:|https:).*\.(png|jpg|PNG|JPG)$/,
          message: '请输入正确的地址',
          trigger: 'blur'
        }
      ]
    }
    // 根据id查询 hex 信息
    const getHexById = async () => {
      const { data: res } = await api.getHexById(state.curID)
      console.log(res)
      state.editForm = res.hex
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
          const { data: res } = await api.editHex(state.editForm)
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
      getHexById()
    })
    return {
      ...toRefs(state),
      editFormRules,
      closeDialog,
      editFormRef,
      getHexById,
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
