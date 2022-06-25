<template>
  <el-dialog title="添加小小英雄" width="50%" center :model-value="centerDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="120px"
      label-position="left"
      status-icon
    >
      <el-form-item label="小小英雄ID" prop="heroId">
        <el-input v-model.number="addForm.heroId"></el-input>
      </el-form-item>
      <el-form-item label="小小英雄名称" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="皮肤类型ID" prop="typeId">
        <el-input v-model="addForm.typeId"></el-input>
      </el-form-item>
      <el-form-item label="皮肤类型" prop="type">
        <el-input v-model="addForm.type"></el-input>
      </el-form-item>
      <el-form-item label="英雄种类ID" prop="miniId">
        <el-input v-model="addForm.miniId"></el-input>
      </el-form-item>
      <el-form-item label="英雄种类" prop="mini">
        <el-input v-model="addForm.mini"></el-input>
      </el-form-item>
      <el-form-item label="英雄星级" prop="star">
        <el-select v-model="addForm.star" class="m-2" placeholder="选择英雄星级">
          <el-option label="一星级" :value="1" />
          <el-option label="二星级" :value="2" />
          <el-option label="三星级" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="英雄品质" prop="quality">
        <el-select v-model="addForm.quality" class="m-2" placeholder="选择英雄品质">
          <el-option label="传说" value="传说" />
          <el-option label="史诗" value="史诗" />
          <el-option label="稀有" value="稀有" />
        </el-select>
      </el-form-item>
      <el-form-item label="英雄外形" prop="shape">
        <el-select v-model="addForm.shape" class="m-2" placeholder="选择英雄品质">
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
    centerDialogVisible: Boolean
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    // 表单的ref
    const addFormRef = ref()
    const state = reactive({
      season: props.season,
      centerDialogVisible: props.centerDialogVisible,
      addForm: {
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
      }
    })
    // 校验规则
    const addFormRules = {
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
    // 关闭对话框
    const closeDialog = visible => {
      // 重置表单
      addFormRef.value.resetFields()
      emit('onCloseDialog', visible)
    }
    // 处理添加装备
    const submitAdd = () => {
      // 校验表单是否通过
      addFormRef.value.validate(async valid => {
        if (valid) {
          // 发请求
          const { data: res } = await api.addHero(state.addForm)
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
