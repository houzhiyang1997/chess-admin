<template>
  <el-dialog title="添加装备" width="50%" center :model-value="centerDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="100px"
      label-position="left"
      status-icon
    >
      <el-form-item label="装备ID" prop="equipId">
        <el-input v-model.number="addForm.equipId"></el-input>
      </el-form-item>
      <el-form-item label="装备名称" prop="name">
        <el-input v-model="addForm.name" type="password"></el-input>
      </el-form-item>
      <el-form-item label="装备类型" prop="type">
        <el-select v-model="addForm.type" class="m-2" placeholder="选择技能类型">
          <el-option label="散件或特装" :value="1" />
          <el-option label="成装" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="装备效果" prop="effect">
        <el-input v-model="addForm.effect" :rows="2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="addForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="合成路径" prop="formula">
        <el-select multiple :multiple-limit="2" v-model="addForm.formula" class="m-2" placeholder="选择装备">
          <el-option v-for="item in formulaEquipList" :key="item.id" :label="item.name" :value="item.equipId" />
        </el-select>
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
      <el-form-item label="装备图片" prop="imagePath">
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
import { reactive, toRefs, ref, onMounted } from 'vue'
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
      formulaEquipList: [],
      addForm: {
        equipId: 0,
        name: '',
        type: 1,
        effect: '',
        keywords: '',
        formula: '',
        imagePath: '',
        version: '',
        season: props.season
      }
    })
    // 校验规则
    const addFormRules = {
      equipId: [
        { required: true, message: '请输入装备ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      name: [
        { required: true, message: '请输入装备名称', trigger: 'blur' },
        { min: 2, max: 10, message: '装备名称在2~10个字符之间', trigger: 'blur' }
      ],
      type: [{ required: true, message: '请选择装备类型', trigger: 'blur' }],
      effect: [
        { required: true, message: '请输入装备详细属性', trigger: 'blur' },
        { min: 3, max: 255, message: '装备详细属性长度为3-255', trigger: 'blur' }
      ],
      keywords: [
        { required: true, message: '请输入装备关键词', trigger: 'blur' },
        { min: 3, max: 100, message: '装备关键词长度为3-100', trigger: 'blur' }
      ],
      formula: [{ required: true, message: '请选择合成装备', trigger: 'blur' }],
      version: [{ required: true, message: '请选择游戏版本', trigger: 'blur' }],
      imagePath: [
        { required: true, message: '请输入装备图片地址', trigger: 'blur' },
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

    // 获取合成路径装备列表用于下拉选择
    const getFormulaEquips = async () => {
      // 设置该分页和裁切是为了获得501-509的标准散件 后期删除装备后，再写一个专门查散件的api
      const { data: res } = await api.getEquips(9, 11, '', state.season)
      state.formulaEquipList = res.equips.slice(1, 10)
    }
    onMounted(() => {
      getFormulaEquips()
    })
    return {
      ...toRefs(state),
      addFormRules,
      closeDialog,
      addFormRef,
      submitAdd,
      getFormulaEquips
    }
  }
}
</script>

<style></style>
