<template>
  <el-dialog title="编辑棋子信息" width="90%" center :model-value="editDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="editForm"
      :rules="editFormRules"
      ref="editFormRef"
      label-width="100px"
      label-position="left"
      status-icon
      :inline="true"
    >
      <el-form-item label="棋子ID" prop="chessId">
        <el-input v-model="editForm.chessId"></el-input>
      </el-form-item>
      <el-form-item label="云顶通用ID" prop="TFTID">
        <el-input v-model="editForm.TFTID"></el-input>
      </el-form-item>
      <el-form-item label="英雄名" prop="title">
        <el-input v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="图片Name" prop="name">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="英雄别称" prop="displayName">
        <el-input v-model="editForm.displayName"></el-input>
      </el-form-item>
      <el-form-item label="英雄费率" prop="price" label-width="80px">
        <el-select v-model="editForm.price" class="m-2" placeholder="选择英雄费用">
          <el-option label="1费" :value="1" />
          <el-option label="2费" :value="2" />
          <el-option label="3费" :value="3" />
          <el-option label="4费" :value="4" />
          <el-option label="5费" :value="5" />
        </el-select>
      </el-form-item>
      <el-form-item label="羁绊" prop="races" label-width="80px">
        <el-select
          @change="handleSelectRaces"
          multiple
          :multiple-limit="2"
          v-model="editForm.races"
          class="m-2"
          placeholder="选择羁绊"
        >
          <el-option v-for="item in raceList" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="羁绊ID列表" prop="raceIds">
        <el-input v-model="editForm.raceIds" disabled></el-input>
      </el-form-item>
      <el-form-item label="职业" prop="jobs" label-width="80px">
        <el-select
          @change="handleSelectJobs"
          multiple
          :multiple-limit="2"
          v-model="editForm.jobs"
          class="m-2"
          placeholder="选择职业"
        >
          <el-option v-for="item in jobList" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="职业ID列表" prop="jobIds">
        <el-input v-model="editForm.jobIds" disabled></el-input>
      </el-form-item>

      <el-form-item label="生命值" prop="life">
        <el-input v-model.number="editForm.life"></el-input>
      </el-form-item>
      <el-form-item label="法力值" prop="magic">
        <el-input v-model.number="editForm.magic"></el-input>
      </el-form-item>
      <el-form-item label="初始法力值" prop="startMagic">
        <el-input v-model.number="editForm.startMagic"></el-input>
      </el-form-item>
      <el-form-item label="护甲" prop="armor">
        <el-input v-model.number="editForm.armor"></el-input>
      </el-form-item>
      <el-form-item label="魔抗" prop="spellBlock">
        <el-input v-model.number="editForm.spellBlock"></el-input>
      </el-form-item>
      <el-form-item label="攻击力" prop="attack">
        <el-input v-model.number="editForm.attack"></el-input>
      </el-form-item>
      <el-form-item label="攻击速度" prop="attackSpeed">
        <el-input v-model="editForm.attackSpeed"></el-input>
      </el-form-item>
      <el-form-item label="攻击距离" prop="attackRange">
        <el-input v-model.number="editForm.attackRange"></el-input>
      </el-form-item>
      <el-form-item label="攻击成长" prop="attackData">
        <el-input v-model="editForm.attackData"></el-input>
      </el-form-item>
      <el-form-item label="生命成长" prop="lifeData">
        <el-input v-model="editForm.lifeData"></el-input>
      </el-form-item>
      <el-form-item label="推荐装备" prop="recEquip" label-width="80px">
        <el-select multiple :multiple-limit="6" v-model="editForm.recEquip" class="m-2" placeholder="选择装备">
          <el-option v-for="item in equipList" :key="item.id" :label="item.name" :value="item.equipId" />
        </el-select>
      </el-form-item>
      <el-form-item label="技能" prop="skillName">
        <el-input v-model="editForm.skillName"></el-input>
      </el-form-item>
      <el-form-item label="技能类型" prop="skillType" label-width="80px">
        <el-select v-model="editForm.skillType" class="m-2" placeholder="选择技能类型">
          <el-option label="主动" value="主动" />
          <el-option label="被动" value="被动" />
        </el-select>
      </el-form-item>
      <el-form-item label="技能图片地址" prop="skillImage" label-width="100">
        <el-input v-model="editForm.skillImage"></el-input>
      </el-form-item>
      <el-form-item label="技能介绍" prop="skillDetail">
        <el-input v-model="editForm.skillDetail" :rows="2" type="textarea"></el-input>
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
      <div class="pre-img">
        <div class="chess">
          <div>英雄预览</div>
          <el-image :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + editForm.name" />
        </div>
        <div class="skill">
          <div>技能预览</div>
          <el-image :src="editForm.skillImage" />
        </div>
      </div>
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
      raceList: [],
      jobList: [],
      equipList: [],
      editForm: {
        chessId: 0,
        TFTID: 0,
        title: '',
        name: '',
        displayName: '',
        races: '',
        jobs: '',
        jobIds: '',
        price: '',
        skillName: '',
        skillType: '',
        skillImage: '',
        skillDetail: '',
        life: '',
        magic: '',
        startMagic: '',
        armor: '',
        spellBlock: '',
        attack: '',
        attackSpeed: '',
        attackRange: '',
        attackData: '',
        lifeData: '',
        recEquip: '',
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
