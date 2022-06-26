<template>
  <el-dialog title="添加阵容" width="60%" center :model-value="centerDialogVisible" @closed="closeDialog(false)">
    <!-- 用户表单 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="100px"
      label-position="left"
      status-icon
    >
      <el-form-item label="阵容ID" prop="teamId">
        <el-input v-model.number="addForm.teamId"></el-input>
      </el-form-item>
      <el-form-item label="阵容名称" prop="title">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="addForm.author"></el-input>
      </el-form-item>
      <el-form-item label="棋子列表" prop="chessList">
        <el-select
          @change="handleSelectChesses"
          multiple
          :multiple-limit="10"
          v-model="addForm.chessList"
          class="m-2"
          placeholder="选择棋子"
        >
          <el-option v-for="item in chessList" :key="item.id" :label="item.displayName" :value="item.chessId" />
        </el-select>
      </el-form-item>
      <el-form-item label="棋子图片名" prop="imgList">
        <el-input v-model="addForm.imgList" disabled></el-input>
      </el-form-item>
      <el-form-item label="点赞数" prop="goods">
        <el-input v-model.number="addForm.goods"></el-input>
      </el-form-item>
      <el-form-item label="成型难度" prop="hard">
        <el-select v-model.number="addForm.hard" class="m-2" placeholder="选择成型难度">
          <el-option v-for="item in [1, 2, 3, 4, 5]" :key="item" :label="item + '星'" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="作者头像" prop="authorImg">
        <el-input v-model="addForm.authorImg"></el-input>
      </el-form-item>
      <el-form-item label="头像预览">
        <el-image :src="addForm.authorImg" style="width: 64px" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-select v-model="addForm.label" class="m-2" placeholder="选择阵容标签">
          <el-option label="高手进阶" value="高手进阶" />
          <el-option label="新手推荐" value="新手推荐" />
        </el-select>
      </el-form-item>
      <el-form-item label="稳健运营" prop="steadyContent">
        <el-input v-model="addForm.steadyContent"></el-input>
      </el-form-item>
      <el-form-item label="海克斯列表" prop="hexList">
        <el-select multiple :multiple-limit="6" v-model="addForm.hexList" class="m-2" placeholder="选择海克斯">
          <el-option v-for="item in hexList" :key="item.id" :label="item.name" :value="item.hexId" />
        </el-select>
      </el-form-item>
      <el-form-item label="棋子站位信息" prop="chessPosition">
        <el-input
          v-model="addForm.chessPosition"
          placeholder="格式必须为‘3-1,2-2’第一维取值0-3，第二位取值0-6"
        ></el-input>
      </el-form-item>
      <el-form-item label="站位解读" prop="positionContent">
        <el-input v-model="addForm.positionContent"></el-input>
      </el-form-item>
      <el-form-item label="抢装顺序" prop="equipOrder">
        <el-select multiple :multiple-limit="5" v-model="addForm.equipOrder" class="m-2" placeholder="选择海克斯">
          <el-option v-for="item in formulaEquipList" :key="item.id" :label="item.name" :value="item.equipId" />
        </el-select>
      </el-form-item>
      <el-form-item label="装备解读" prop="equipContent">
        <el-input v-model="addForm.equipContent"></el-input>
      </el-form-item>
      <el-form-item label="主C棋子" prop="carryChess">
        <el-select v-model="addForm.carryChess" class="m-2" placeholder="选择棋子">
          <el-option v-for="item in chessList" :key="item.id" :label="item.displayName" :value="item.chessId" />
        </el-select>
      </el-form-item>
      <el-form-item label="副C棋子" prop="otherChess">
        <el-select v-model="addForm.otherChess" class="m-2" placeholder="选择棋子">
          <el-option v-for="item in chessList" :key="item.id" :label="item.displayName" :value="item.chessId" />
        </el-select>
      </el-form-item>
      <el-form-item label="搜卡时机" prop="searchTime">
        <el-input v-model="addForm.searchTime"></el-input>
      </el-form-item>
      <el-form-item label="克制关系" prop="counterRelation">
        <el-input v-model="addForm.counterRelation"></el-input>
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
    centerDialogVisible: Boolean,
    season: String,
    chessList: Object,
    hexList: Object,
    formulaEquipList: Object
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    // 表单的ref
    const addFormRef = ref()
    const state = reactive({
      centerDialogVisible: props.centerDialogVisible,
      season: props.season,
      chessList: props.chessList,
      hexList: props.hexList,
      formulaEquipList: props.formulaEquipList,
      addForm: {
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
      }
    })
    // 校验规则
    const addFormRules = {
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
      chessList: [
        { required: true, message: '请选择棋子', trigger: 'blur' },
        { min: 5, max: 10, message: '棋子个数为5-10', trigger: 'blur' }
      ],
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
      hexList: [
        { required: true, message: '请选择海克斯', trigger: 'blur' },
        { min: 6, max: 6, message: '海克斯个数必须为6', trigger: 'blur' }
      ],
      chessPosition: [{ required: true, message: '请输入棋子站位信息', trigger: 'blur' }],
      positionContent: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { min: 3, max: 2048, message: '长度不符合', trigger: 'blur' }
      ],
      equipOrder: [
        { required: true, message: '请选择装备', trigger: 'blur' },
        { min: 1, max: 5, message: '装备个数为1-5', trigger: 'blur' }
      ],
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
    // 关闭对话框
    const closeDialog = visible => {
      // 重置表单
      addFormRef.value.resetFields()
      emit('onCloseDialog', visible)
    }
    // 处理添加阵容
    const submitAdd = () => {
      // 校验表单是否通过
      addFormRef.value.validate(async valid => {
        if (valid) {
          // 发请求
          const { data: res } = await api.addChess(state.addForm)
          console.log(res)
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
    // 处理棋子选择
    const handleSelectChesses = () => {
      const temp = []
      state.addForm.chessList.forEach(chessId => {
        state.chessList.forEach(item => {
          if (chessId === item.chessId) {
            temp.push(item.name)
          }
        })
      })
      state.addForm.imgList = temp.join(',')
    }
    return {
      ...toRefs(state),
      addFormRules,
      closeDialog,
      addFormRef,
      submitAdd,
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
