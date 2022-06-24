<template>
  <el-dialog title="编辑装备信息" width="50%" center :model-value="editDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="100px"
      label-position="left"
      status-icon
    >
      <el-form-item label="装备ID" prop="equipId">
        <el-input v-model.number="editForm.equipId"></el-input>
      </el-form-item>
      <el-form-item label="装备名称" prop="name">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="装备类型" prop="type">
        <el-select v-model="editForm.type" class="m-2" placeholder="选择技能类型">
          <el-option label="散件或特装" :value="1" />
          <el-option label="成装" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="装备效果" prop="effect">
        <el-input v-model="editForm.effect" :rows="2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="editForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="合成路径" prop="formula">
        <el-select multiple :multiple-limit="2" v-model="editForm.formula" class="m-2" placeholder="选择装备">
          <el-option v-for="item in formulaEquipList" :key="item.id" :label="item.name" :value="item.equipId" />
        </el-select>
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
      <el-form-item label="装备图片" prop="imagePath">
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
      formulaEquipList: [],
      editForm: {
        equipId: 0,
        name: '',
        type: 1,
        effect: '',
        keywords: '',
        formula: '',
        imagePath: '',
        version: '',
        season: props.season
      },
      editDialogVisible: props.editDialogVisible,
      curID: props.curID
    })
    // 校验规则
    const editFormRules = {
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
    // 根据id查询 英雄棋子 信息
    const getEquipById = async () => {
      const { data: res } = await api.getEquipById(state.curID)
      console.log(res)
      state.editForm = res.equip
      // 合成路径 从字符串还原为数组
      state.editForm.formula = state.editForm.formula.split(',').map(Number)
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
          const { data: res } = await api.editChess(state.editForm)
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
    // 获取合成路径装备列表用于下拉选择
    const getFormulaEquips = async () => {
      const { data: res } = await api.getFormula(state.season)
      state.formulaEquipList = res.formula
    }
    // 对 羁绊、职业和装备 需要把字符串重构为数组做select的初始化渲染
    const formListData = () => {
      state.editForm.races = state.editForm.races.split(',')
      state.editForm.jobs = state.editForm.jobs.split(',')
      // 装备需要进行映射
      state.editForm.recEquip = state.editForm.recEquip.split(',').map(Number)
    }
    onMounted(() => {
      getEquipById()
      getFormulaEquips()
      // formListData()
    })
    return {
      ...toRefs(state),
      editFormRules,
      closeDialog,
      editFormRef,
      getEquipById,
      submitEdit,
      getFormulaEquips,
      formListData
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
