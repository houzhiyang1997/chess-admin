<template>
  <el-dialog title="编辑阵容信息" width="60%" center :model-value="editDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="120px"
      label-position="left"
      status-icon
    >
      <el-form-item label="阵容ID" prop="teamId">
        <el-input v-model.number="editForm.teamId"></el-input>
      </el-form-item>
      <el-form-item label="阵容名称" prop="title">
        <el-input v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="editForm.author"></el-input>
      </el-form-item>
      <el-form-item label="棋子列表" prop="chessList">
        <el-select
          @change="handleSelectChesses"
          multiple
          :multiple-limit="10"
          v-model="editForm.chessList"
          class="m-2"
          placeholder="选择棋子"
        >
          <el-option v-for="item in chessList" :key="item.id" :label="item.displayName" :value="item.chessId" />
        </el-select>
      </el-form-item>
      <el-form-item label="棋子图片名" prop="imgList">
        <el-input v-model="editForm.imgList" disabled></el-input>
      </el-form-item>
      <el-form-item label="点赞数" prop="goods">
        <el-input v-model.number="editForm.goods"></el-input>
      </el-form-item>
      <el-form-item label="成型难度" prop="hard">
        <el-select v-model.number="editForm.hard" class="m-2" placeholder="选择成型难度">
          <el-option v-for="item in [1, 2, 3, 4, 5]" :key="item" :label="item + '星'" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="作者头像" prop="authorImg">
        <el-input v-model="editForm.authorImg"></el-input>
      </el-form-item>
      <el-form-item label="头像预览">
        <el-image :src="editForm.authorImg" style="width: 64px" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-select v-model="editForm.label" class="m-2" placeholder="选择阵容标签">
          <el-option label="高手进阶" value="高手进阶" />
          <el-option label="新手推荐" value="新手推荐" />
        </el-select>
      </el-form-item>
      <el-form-item label="稳健运营" prop="steadyContent">
        <el-input v-model="editForm.steadyContent" :rows="3" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="海克斯列表" prop="hexList">
        <el-select multiple :multiple-limit="6" v-model="editForm.hexList" class="m-2" placeholder="选择海克斯">
          <el-option v-for="item in hexList" :key="item.id" :label="item.name" :value="item.hexId" />
        </el-select>
      </el-form-item>
      <el-form-item label="棋子站位信息" prop="chessPosition">
        <el-input
          v-model="editForm.chessPosition"
          placeholder="格式必须为‘3-1,2-2’第一维取值0-3，第二位取值0-6"
        ></el-input>
      </el-form-item>
      <el-form-item label="站位解读" prop="positionContent">
        <el-input v-model="editForm.positionContent" :rows="3" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="抢装顺序" prop="equipOrder">
        <el-select multiple :multiple-limit="5" v-model="editForm.equipOrder" class="m-2" placeholder="选择装备">
          <el-option v-for="item in formulaEquipList" :key="item.id" :label="item.name" :value="item.equipId" />
        </el-select>
      </el-form-item>
      <el-form-item label="装备解读" prop="equipContent">
        <el-input v-model="editForm.equipContent" :rows="3" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="主C棋子" prop="carryChess">
        <el-select v-model="editForm.carryChess" class="m-2" placeholder="选择棋子">
          <el-option v-for="item in choseChessList" :key="item.id" :label="item.displayName" :value="item.chessId" />
        </el-select>
      </el-form-item>
      <el-form-item label="副C棋子" prop="otherChess">
        <el-select v-model="editForm.otherChess" class="m-2" placeholder="选择棋子">
          <el-option v-for="item in choseChessList" :key="item.id" :label="item.displayName" :value="item.chessId" />
        </el-select>
      </el-form-item>
      <el-form-item label="搜卡时机" prop="searchTime">
        <el-input v-model="editForm.searchTime" :rows="3" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="克制关系" prop="counterRelation">
        <el-input v-model="editForm.counterRelation" :rows="3" type="textarea"></el-input>
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
    season: String,
    chessList: Object,
    hexList: Object,
    formulaEquipList: Object
  },
  emits: ['onCloseEditDialog'],
  setup(props, { emit }) {
    // 表单的ref
    const editFormRef = ref()
    const state = reactive({
      season: props.season,
      chessList: props.chessList,
      choseChessList: [],
      hexList: props.hexList,
      formulaEquipList: props.formulaEquipList,
      editForm: {
        teamId: 0,
        title: '',
        author: '',
        chessList: '',
        imgList: '',
        goods: 1,
        hard: 4,
        authorImg: '',
        label: '',
        steadyContent: '',
        hexList: '',
        chessPosition: '',
        positionContent: '',
        equipOrder: '',
        equipContent: '',
        carryChess: '',
        otherChess: '',
        searchTime: '',
        counterRelation: '',
        version: '',
        season: props.season
      },
      editDialogVisible: props.editDialogVisible,
      curID: props.curID
    })
    // 校验规则
    const editFormRules = {
      teamId: [
        { required: true, message: '请输入阵容ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      title: [
        { required: true, message: '请输入阵容名', trigger: 'blur' },
        { min: 3, max: 40, message: '英雄名长度在3~40个字符之间', trigger: 'blur' }
      ],
      author: [
        { required: true, message: '请输入作者名', trigger: 'blur' },
        { min: 3, max: 12, message: '作者名长度在3~12个字符之间', trigger: 'blur' }
      ],
      chessList: [{ required: true, message: '请选择棋子', trigger: 'blur' }],
      goods: [
        { required: true, message: '请输入点赞数', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,8}$/,
          message: '请输入1到8位数字',
          trigger: 'blur'
        }
      ],
      hard: [{ required: true, message: '请选择成型难度', trigger: 'blur' }],
      authorImg: [
        { required: true, message: '请输入作者头像', trigger: 'blur' },
        {
          pattern: /^(http:|https:).*\.(png|jpg)$/,
          message: '请输入正确的地址',
          trigger: 'blur'
        }
      ],
      label: [{ required: true, message: '请输入选择标签', trigger: 'blur' }],
      steadyContent: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { min: 3, max: 2048, message: '长度不符合', trigger: 'blur' }
      ],
      hexList: [{ required: true, message: '请选择海克斯', trigger: 'blur' }],
      chessPosition: [{ required: true, message: '请输入棋子站位信息', trigger: 'blur' }],
      positionContent: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { min: 3, max: 2048, message: '长度不符合', trigger: 'blur' }
      ],
      equipOrder: [{ required: true, message: '请选择装备', trigger: 'blur' }],
      equipContent: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { min: 3, max: 2048, message: '长度不符合', trigger: 'blur' }
      ],
      carryChess: [{ required: true, message: '请选择主C棋子', trigger: 'blur' }],
      otherChess: [{ required: true, message: '请选择副C棋子', trigger: 'blur' }],
      searchTime: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { min: 3, max: 2048, message: '长度不符合', trigger: 'blur' }
      ],
      counterRelation: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { min: 3, max: 2048, message: '长度不符合', trigger: 'blur' }
      ],
      version: [{ required: true, message: '请选择游戏版本', trigger: 'blur' }],
      season: [{ required: true, message: '请选择游戏赛季', trigger: 'blur' }]
    }
    // 根据id查询 英雄棋子 信息 并还原信息
    const getTeamById = async () => {
      const { data: res } = await api.getTeamById(state.curID)
      state.editForm = res.team

      // 对 棋子列表 海克斯列表 装备列表进行拆分还原数组
      state.editForm.chessList = state.editForm.chessList.split(',').map(Number)
      state.editForm.hexList = state.editForm.hexList.split(',').map(Number)
      state.editForm.equipOrder = state.editForm.equipOrder.split(',').map(Number)
      // 将主C和副C棋子也进行还原
      handleSelectChesses() // 先获取列表 再赋值
      state.editForm.carryChess = parseInt(state.editForm.carryChess)
      state.editForm.otherChess = parseInt(state.editForm.otherChess)
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
          const { data: res } = await api.editTeam(state.editForm)
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
    // 处理棋子选择
    const handleSelectChesses = () => {
      const temp = []
      const choseChessList = []
      // 1.需要生成图片列表
      state.editForm.chessList.forEach(chessId => {
        state.chessList.forEach(item => {
          if (chessId === item.chessId) {
            temp.push(item.name)
            // 2.需要 把主副C限制在 棋子列中中
            choseChessList.push(item)
          }
        })
      })
      state.editForm.imgList = temp.join(',')
      state.choseChessList = choseChessList
      // 每次棋子列表变化 都需要判断主C和副C所选的棋子是否还在列表中
      let flagCarry = false
      let flagOther = false
      state.choseChessList.forEach(item => {
        if (item.chessId === parseInt(state.editForm.carryChess)) {
          flagCarry = true
        }
        if (item.chessId === parseInt(state.editForm.otherChess)) {
          flagOther = true
        }
      })
      // 如果为false 证明选择的列表中没有当前选择的英雄了，应置位空
      if (!flagCarry) state.editForm.carryChess = ''
      if (!flagOther) state.editForm.otherChess = ''
    }
    onMounted(async () => {
      getTeamById()
    })
    return {
      ...toRefs(state),
      editFormRules,
      closeDialog,
      editFormRef,
      getTeamById,
      submitEdit,
      handleSelectChesses
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
