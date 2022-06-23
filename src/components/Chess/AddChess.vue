<template>
  <el-dialog title="添加英雄" width="80%" center :model-value="centerDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="100px"
      label-position="left"
      status-icon
      :inline="true"
    >
      <el-form-item label="棋子ID" prop="chessId">
        <el-input v-model="addForm.chessId"></el-input>
      </el-form-item>
      <el-form-item label="云顶通用ID" prop="TFTID">
        <el-input v-model="addForm.TFTID"></el-input>
      </el-form-item>
      <el-form-item label="英雄名" prop="title">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="图片Name" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="英雄别称" prop="displayName">
        <el-input v-model="addForm.displayName"></el-input>
      </el-form-item>
      <el-form-item label="羁绊" prop="races">
        <el-select
          @change="handleSelectRaces"
          multiple
          :multiple-limit="2"
          v-model="addForm.races"
          class="m-2"
          placeholder="选择羁绊"
        >
          <el-option v-for="item in raceList" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="羁绊ID列表" prop="raceIds">
        <el-input v-model="addForm.raceIds" disabled></el-input>
      </el-form-item>
      <el-form-item label="职业" prop="jobs">
        <el-select
          @change="handleSelectRaces"
          multiple
          :multiple-limit="2"
          v-model="addForm.jobs"
          class="m-2"
          placeholder="选择职业"
        >
          <el-option v-for="item in raceList" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="职业ID列表" prop="jobIds">
        <el-input v-model="addForm.jobIds"></el-input>
      </el-form-item>
      <el-form-item label="英雄费率" prop="price">
        <el-input v-model="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="技能" prop="skillName">
        <el-input v-model="addForm.skillName"></el-input>
      </el-form-item>
      <el-form-item label="技能类型" prop="skillType">
        <el-input v-model="addForm.skillType"></el-input>
      </el-form-item>
      <el-form-item label="技能图片地址" prop="skillImage">
        <el-input v-model="addForm.skillImage"></el-input>
      </el-form-item>
      <el-form-item label="技能介绍" prop="skillDetail">
        <el-input v-model="addForm.skillDetail"></el-input>
      </el-form-item>
      <el-form-item label="生命值" prop="life">
        <el-input v-model="addForm.life"></el-input>
      </el-form-item>
      <el-form-item label="法力值" prop="magic">
        <el-input v-model="addForm.magic"></el-input>
      </el-form-item>
      <el-form-item label="初始法力值" prop="startMagic">
        <el-input v-model="addForm.startMagic"></el-input>
      </el-form-item>
      <el-form-item label="护甲" prop="armor">
        <el-input v-model="addForm.armor"></el-input>
      </el-form-item>
      <el-form-item label="魔抗" prop="spellBlock">
        <el-input v-model="addForm.spellBlock"></el-input>
      </el-form-item>
      <el-form-item label="攻击力" prop="attack">
        <el-input v-model="addForm.attack"></el-input>
      </el-form-item>
      <el-form-item label="攻击速度" prop="attackSpeed">
        <el-input v-model="addForm.attackSpeed"></el-input>
      </el-form-item>
      <el-form-item label="攻击距离" prop="attackRange">
        <el-input v-model="addForm.attackRange"></el-input>
      </el-form-item>
      <el-form-item label="攻击成长" prop="attackData">
        <el-input v-model="addForm.attackData"></el-input>
      </el-form-item>
      <el-form-item label="生命成长" prop="lifeData">
        <el-input v-model="addForm.lifeData"></el-input>
      </el-form-item>
      <el-form-item label="推荐装备" prop="recEquip">
        <el-input v-model="addForm.recEquip"></el-input>
      </el-form-item>
      <el-form-item label="游戏版本" prop="version">
        <el-input v-model="addForm.version"></el-input>
      </el-form-item>
      <el-form-item label="游戏赛季" prop="season">
        <el-input v-model="addForm.season"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <!-- 预览图 -->
      <div class="pre-img">
        <div class="chess">
          <div>英雄预览</div>
          <el-image :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + addForm.name" />
        </div>
        <div class="skill">
          <div>技能预览</div>
          <el-image :src="addForm.skillImage" />
        </div>
      </div>
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
      centerDialogVisible: props.centerDialogVisible,
      season: props.season,
      raceList: [],
      addForm: {
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
        season: ''
      }
    })
    // 校验规则
    const addFormRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度在3~10个字符之间', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '密码长度在6~15个字符之间', trigger: 'blur' }
      ],
      nickName: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 3, max: 10, message: '昵称长度在3~10个字符之间', trigger: 'blur' }
      ],
      level: [
        { required: true, message: '请输入等级', trigger: 'blur' },
        { min: 3, max: 4, message: '等级格式为LV1-10', trigger: 'blur' }
      ],
      exp: [{ required: true, message: '请输入经验值默认为0', trigger: 'blur' }],
      score: [{ required: true, message: '请输入积分默认为0', trigger: 'blur' }],
      imgUrl: [{ required: true, message: '请输入头像地址', trigger: 'blur' }]
    }
    // 关闭对话框
    const closeDialog = visible => {
      // 重置表单
      addFormRef.value.resetFields()
      emit('onCloseDialog', visible)
    }
    // 处理添加用户
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
    // 获取羁绊列表用于下拉选择
    const getRaces = async () => {
      const { data: res } = await api.getRaces(1, 100, '', state.season)
      state.raceList = res.races
    }
    // 将选择的羁绊映射为羁绊id列表
    const handleSelectRaces = () => {
      const result = []
      state.addForm.races.forEach(item => {
        state.raceList.forEach(race => {
          if (race.name === item) {
            result.push(race.raceId)
          }
        })
      })
      state.addForm.raceIds = result.join(',')
    }
    onMounted(() => {
      getRaces()
    })
    return {
      ...toRefs(state),
      addFormRules,
      closeDialog,
      addFormRef,
      submitAdd,
      getRaces,
      handleSelectRaces
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
