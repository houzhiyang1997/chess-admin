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
      chessId: [
        { required: true, message: '请输入棋子ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      TFTID: [
        { required: true, message: '请输入云顶通用ID', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      title: [
        { required: true, message: '请输入英雄名', trigger: 'blur' },
        { min: 3, max: 10, message: '英雄名长度在3~10个字符之间', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入图片Name', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}\.(png|jpg)$/,
          message: '请输入123.png/jpg格式的输入',
          trigger: 'blur'
        }
      ],
      displayName: [
        { required: true, message: '请输入英雄别称', trigger: 'blur' },
        { min: 1, max: 10, message: '英雄别称长度在1~10个字符之间', trigger: 'blur' }
      ],
      price: [{ required: true, message: '请选择费率', trigger: 'blur' }],
      races: [{ required: true, message: '请选择羁绊', trigger: 'blur' }],
      jobs: [{ required: true, message: '请选择职业', trigger: 'blur' }],
      life: [
        { required: true, message: '请输入生命值', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      magic: [
        { required: true, message: '请输入法力值', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,3}$/,
          message: '请输入1到3位数字',
          trigger: 'blur'
        }
      ],
      startMagic: [
        { required: true, message: '请输入初始法力值', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,3}$/,
          message: '请输入1到3位数字',
          trigger: 'blur'
        }
      ],
      armor: [
        { required: true, message: '请输入护甲', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,3}$/,
          message: '请输入1到3位数字',
          trigger: 'blur'
        }
      ],
      spellBlock: [
        { required: true, message: '请输入魔抗', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,3}$/,
          message: '请输入1到3位数字',
          trigger: 'blur'
        }
      ],
      attack: [
        { required: true, message: '请输入攻击力', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,5}$/,
          message: '请输入1到5位数字',
          trigger: 'blur'
        }
      ],
      attackSpeed: [
        { required: true, message: '请输入攻击速度', trigger: 'blur' },
        {
          pattern: /^[0-9]\.[0-9]{2,3}$/,
          message: '请输入类似0.70的格式',
          trigger: 'blur'
        }
      ],
      attackRange: [
        { required: true, message: '请输入攻击距离', trigger: 'blur' },
        {
          pattern: /^[1-9]$/,
          message: '请输入1位数字',
          trigger: 'blur'
        }
      ],
      attackData: [
        { required: true, message: '请输入攻击成长', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,4}\/[0-9]{1,4}\/[0-9]{1,4}$/,
          message: '请输入类似1000/2000/3000的格式',
          trigger: 'blur'
        }
      ],
      lifeData: [
        { required: true, message: '请输入生命成长', trigger: 'blur' },
        {
          pattern: /^[0-9]{1,4}\/[0-9]{1,4}\/[0-9]{1,4}$/,
          message: '请输入类似1000/2000/3000的格式',
          trigger: 'blur'
        }
      ],
      recEquip: [{ required: true, message: '请选择推荐装备', trigger: 'blur' }],
      skillName: [
        { required: true, message: '请输入技能名称', trigger: 'blur' },
        { min: 2, max: 12, message: '技能名称长度为2-12', trigger: 'blur' }
      ],
      skillType: [{ required: true, message: '请选择技能类型', trigger: 'blur' }],
      skillImage: [
        { required: true, message: '请输入技能图片地址', trigger: 'blur' },
        {
          pattern: /^(http:|https:).*\.(png|jpg)$/,
          message: '请输入正确的地址',
          trigger: 'blur'
        }
      ],
      skillDetail: [{ required: true, message: '请输入技能介绍', trigger: 'blur' }],
      version: [{ required: true, message: '请选择游戏版本', trigger: 'blur' }],
      season: [{ required: true, message: '请选择游戏赛季', trigger: 'blur' }]
    }
    // 根据id查询 英雄棋子 信息
    const getChessById = async () => {
      const { data: res } = await api.getChessById(state.curID)
      state.editForm = res.chess
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
    // 获取羁绊列表用于下拉选择
    const getRaces = async () => {
      const { data: res } = await api.getRaces(1, 100, '', state.season)
      state.raceList = res.races
    }
    // 将选择的羁绊映射为羁绊id列表
    const handleSelectRaces = () => {
      const result = []
      state.editForm.races.forEach(item => {
        state.raceList.forEach(race => {
          if (race.name === item) {
            result.push(race.raceId)
          }
        })
      })
      state.editForm.raceIds = result.join(',')
    }
    // 获取职业列表用于下拉选择
    const getJobs = async () => {
      const { data: res } = await api.getJobs(1, 100, '', state.season)
      state.jobList = res.jobs
    }
    // 将选择的职业映射为职业id列表
    const handleSelectJobs = () => {
      const result = []
      state.editForm.jobs.forEach(item => {
        state.jobList.forEach(job => {
          if (job.name === item) {
            result.push(job.jobId)
          }
        })
      })
      state.editForm.jobIds = result.join(',')
    }
    // 获取装备列表用于下拉选择
    const getEquips = async () => {
      const { data: res } = await api.getEquips(1, 50, '', state.season)
      state.equipList = res.equips
    }
    // 对 羁绊、职业和装备 需要把字符串重构为数组做select的初始化渲染
    const formListData = () => {
      state.editForm.races = state.editForm.races.split(',')
      state.editForm.jobs = state.editForm.jobs.split(',')
      // 装备需要进行映射
      state.editForm.recEquip = state.editForm.recEquip.split(',').map(Number)
    }
    onMounted(async () => {
      getChessById()
      getRaces()
      getJobs()
      await getEquips()
      formListData()
    })
    return {
      ...toRefs(state),
      editFormRules,
      closeDialog,
      editFormRef,
      getChessById,
      submitEdit,
      getRaces,
      getJobs,
      getEquips,
      handleSelectRaces,
      handleSelectJobs,
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
