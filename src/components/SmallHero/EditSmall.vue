<template>
  <el-dialog title="编辑小小英雄信息" width="50%" center :model-value="editDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="120px"
      label-position="left"
      status-icon
    >
      <el-form-item label="小小英雄ID" prop="heroId">
        <el-input v-model.number="editForm.heroId"></el-input>
      </el-form-item>
      <el-form-item label="小小英雄名称" prop="name">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="皮肤类型ID" prop="typeId">
        <el-input v-model.number="editForm.typeId"></el-input>
      </el-form-item>
      <el-form-item label="皮肤类型" prop="type">
        <el-input v-model="editForm.type"></el-input>
      </el-form-item>
      <el-form-item label="英雄种类ID" prop="miniId">
        <el-input v-model.number="editForm.miniId"></el-input>
      </el-form-item>
      <el-form-item label="英雄种类" prop="mini">
        <el-input v-model="editForm.mini"></el-input>
      </el-form-item>
      <el-form-item label="英雄星级" prop="star">
        <el-select v-model="editForm.star" class="m-2" placeholder="选择英雄星级">
          <el-option label="一星级" :value="1" />
          <el-option label="二星级" :value="2" />
          <el-option label="三星级" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="英雄品质" prop="quality">
        <el-select v-model="editForm.quality" class="m-2" placeholder="选择英雄品质">
          <el-option label="传说" value="传说" />
          <el-option label="史诗" value="史诗" />
          <el-option label="稀有" value="稀有" />
        </el-select>
      </el-form-item>
      <el-form-item label="英雄外形" prop="shape">
        <el-select v-model="editForm.shape" class="m-2" placeholder="选择英雄品质">
          <el-option label="紫色一星" value="紫色一星" />
          <el-option label="蓝色一星" value="蓝色一星" />
          <el-option label="蓝色二星" value="蓝色二星" />
          <el-option label="蓝色三星" value="蓝色三星" />
          <el-option label="绿色三星" value="绿色三星" />
          <el-option label="绿色二星" value="绿色二星" />
          <el-option label="绿色一星" value="绿色一星" />
        </el-select>
      </el-form-item>
      <el-form-item label="英雄图片" prop="imagePath">
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
    curID: Number
  },
  emits: ['onCloseEditDialog'],
  setup(props, { emit }) {
    // 表单的ref
    const editFormRef = ref()
    const state = reactive({
      season: props.season,
      formulaEquipList: [],
      editForm: {
        heroId: 0,
        name: '',
        typeId: 0,
        type: '',
        miniId: 0,
        mini: '',
        star: 1,
        quality: '',
        shape: '',
        imagePath: ''
      },
      editDialogVisible: props.editDialogVisible,
      curID: props.curID
    })
    // 校验规则
    const editFormRules = {
      heroId: [
        { required: true, message: '请输入小小英雄ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      name: [
        { required: true, message: '请输入小小英雄名称', trigger: 'blur' },
        { min: 2, max: 10, message: '小小英雄名称在2~10个字符之间', trigger: 'blur' }
      ],
      typeId: [
        { required: true, message: '请输入皮肤种类ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      type: [
        { required: true, message: '请输入皮肤种类', trigger: 'blur' },
        { min: 2, max: 30, message: '皮肤种类名称在2~30个字符之间', trigger: 'blur' }
      ],
      miniId: [
        { required: true, message: '请输入小小英雄种类ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      mini: [
        { required: true, message: '请输入小小英雄种类', trigger: 'blur' },
        { min: 1, max: 10, message: '小小英雄种类长度为1-10', trigger: 'blur' }
      ],
      star: [
        { required: true, message: '请输入英雄星级', trigger: 'blur' },
        {
          pattern: /^[1-3]$/,
          message: '英雄星级只能为1或2或3',
          trigger: 'blur'
        }
      ],
      quality: [{ required: true, message: '请选择英雄品质', trigger: 'blur' }],
      shape: [{ required: true, message: '请输入小小英雄外形', trigger: 'blur' }],
      imagePath: [
        { required: true, message: '请输入小小英雄图片地址', trigger: 'blur' },
        {
          pattern: /^(http:|https:).*\.(png|jpg)$/,
          message: '请输入正确的地址',
          trigger: 'blur'
        }
      ]
    }
    // 根据id查询 小小英雄 信息
    const getHeroById = async () => {
      const { data: res } = await api.getHeroById(state.curID)
      console.log(res)
      state.editForm = res.hero
    }
    // 关闭对话框
    const closeDialog = visible => {
      emit('onCloseEditDialog', visible)
    }
    // 处理修改 小小英雄 信息
    const submitEdit = () => {
      // 校验表单是否通过
      editFormRef.value.validate(async valid => {
        if (valid) {
          // 发请求
          const { data: res } = await api.editHero(state.editForm)
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
      getHeroById()
    })
    return {
      ...toRefs(state),
      editFormRules,
      closeDialog,
      editFormRef,
      getHeroById,
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
