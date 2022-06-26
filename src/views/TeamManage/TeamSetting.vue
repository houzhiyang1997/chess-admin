<template>
  <div class="setting-container">
    <!-- 顶部面包屑 -->
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">回到首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/team-manage/setting' }">阵容管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/team-manage/setting' }"></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card>
        <!-- 顶部 search card -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="搜索阵容名或作者名" :prefix-icon="Search" v-model="searchContent" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="warning" @click="centerDialogVisible = true">添加阵容</el-button>
          </el-col>
          <el-col :span="4">
            <el-select v-model="selectValue" class="m-2" placeholder="赛季与版本选择" @change="getTeamList()">
              <el-option label="S7-巨龙之境" value="2022.S7" />
              <el-option label="S6-霓虹之夜" value="2022.S6" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="labelValue" class="m-2" placeholder="难度选择" @change="getTeamList()">
              <el-option label="全部" value="all" />
              <el-option label="高手进阶" value="高手进阶" />
              <el-option label="新手推荐" value="新手推荐" />
            </el-select>
          </el-col>
        </el-row>
        <div class="main-table">
          <!-- 主干table -->
          <el-table :data="teamList" stripe border height="calc(100vh - 260px)">
            <el-table-column label="预览图">
              <template #default="scope">
                <el-image :src="scope.row.authorImg" />
              </template>
            </el-table-column>
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="teamId" label="阵容ID" width="80" />
            <el-table-column prop="title" label="阵容名称" width="200" :show-overflow-tooltip="true" />
            <el-table-column fixed prop="author" label="作者" width="100" />
            <el-table-column prop="formChessList" label="棋子列表" width="150" :show-overflow-tooltip="true" />
            <el-table-column prop="imgList" label="棋子图片名" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="goods" label="点赞数" width="100" />
            <el-table-column prop="hard" label="成型难度" width="120" />
            <el-table-column prop="authorImg" label="作者头像" width="100" :show-overflow-tooltip="true" />
            <el-table-column prop="label" label="标签" width="100" />
            <el-table-column prop="steadyContent" label="稳健运营" width="150" :show-overflow-tooltip="true" />
            <el-table-column prop="formHexList" label="海克斯列表" width="200" :show-overflow-tooltip="true" />
            <el-table-column prop="chessPosition" label="棋子站位信息" width="130" :show-overflow-tooltip="true" />
            <el-table-column prop="positionContent" label="站位解读" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="formFormulaEquipList" width="120" label="抢装顺序" :show-overflow-tooltip="true" />
            <el-table-column prop="equipContent" label="装备解读" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="formCarryChess" label="主C棋子" width="120" />
            <el-table-column prop="formOtherChess" label="副C棋子" width="120" />
            <el-table-column prop="searchTime" label="搜卡时机" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="counterRelation" label="克制关系" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="version" label="游戏版本" width="100" />
            <el-table-column prop="season" label="游戏赛季" width="100" />
            <el-table-column fixed="right" label="操作" width="100">
              <template #default="scope">
                <div class="options">
                  <el-button type="primary" :icon="Edit" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                  <el-button type="danger" :icon="Delete" size="small" @click="handleDelete(scope.row.id)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 底部分页器 -->
        <div class="pagination">
          <el-pagination
            v-model:currentPage="pageNum"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5, 8, 10, 15]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
      <AddTeam
        v-if="centerDialogVisible"
        :season="selectValue"
        :chessList="chessList"
        :hexList="hexList"
        :formulaEquipList="formulaEquipList"
        :centerDialogVisible="centerDialogVisible"
        @onCloseDialog="closeDialogVisible"
      ></AddTeam>
      <EditTeam
        v-if="editDialogVisible"
        :season="selectValue"
        :chessList="chessList"
        :hexList="hexList"
        :formulaEquipList="formulaEquipList"
        :editDialogVisible="editDialogVisible"
        :curID="curID"
        @onCloseEditDialog="closeEditDialogVisible"
      ></EditTeam>
    </div>
  </div>
</template>

<script>
import AddTeam from '@/components/Team/AddTeam.vue'
import EditTeam from '@/components/Team/EditTeam.vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import api from '@/api/index.js'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  components: {
    AddTeam,
    EditTeam
  },
  setup() {
    const state = reactive({
      teamList: [],
      chessList: [],
      hexList: [],
      formulaEquipList: [],
      total: 0, // 总条数
      pageNum: 1, // 当前页码数
      pageSize: 10, // 每页大小
      searchContent: '', // 搜索内容
      selectValue: '2022.S7',
      labelValue: 'all',
      centerDialogVisible: false,
      editDialogVisible: false,
      curID: 0
    })
    // 获取阵容列表
    const getTeamList = async () => {
      const { data: res } = await api.getTeams(
        state.pageNum,
        state.pageSize,
        state.searchContent,
        state.selectValue,
        state.labelValue
      )
      state.teamList = res.teams
      state.total = res.total
      //
      await getChessList()
      await getHexList()
      await getFormulaEquips()
    }
    // 获取并重构棋子列表
    const getChessList = async () => {
      const { data: res } = await api.getChesses(1, 100, state.searchContent, state.selectValue)
      state.chessList = res.chesses
      // 开始重构 teamList中的chessList
      // 同时获取主C和副C的映射
      state.teamList.forEach(item => {
        const temp = item.chessList.split(',')
        temp.forEach((ele, index) => {
          state.chessList.forEach(chess => {
            if (chess.chessId === parseInt(ele)) {
              temp[index] = chess.displayName
            }
            if (chess.chessId === parseInt(item.carryChess)) {
              item.formCarryChess = chess.displayName
            }
            if (chess.chessId === parseInt(item.otherChess)) {
              item.formOtherChess = chess.displayName
            }
          })
        })
        item.formChessList = temp.join(',')
      })
    }
    // 获取并重构hex列表
    const getHexList = async () => {
      const { data: res } = await api.getHexes(1, 600, state.searchContent, state.selectValue, 'all')
      state.hexList = res.hexes
      // 开始重构 teamList中的hexList
      state.teamList.forEach(item => {
        const temp = item.hexList.split(',')
        temp.forEach((ele, index) => {
          state.hexList.forEach(hex => {
            if (hex.hexId === parseInt(ele)) {
              temp[index] = hex.name
            }
          })
        })
        item.formHexList = temp.join(',')
      })
    }
    // 获取抢装备列表并重构列表
    const getFormulaEquips = async () => {
      const { data: res } = await api.getFormula(state.selectValue)
      state.formulaEquipList = res.formula
      // 开始重构 teamList中的equipOrder
      state.teamList.forEach(item => {
        const temp = item.equipOrder.split(',')
        temp.forEach((ele, index) => {
          state.formulaEquipList.forEach(equip => {
            if (equip.equipId === parseInt(ele)) {
              temp[index] = equip.name
            }
          })
        })
        item.formFormulaEquipList = temp.join(',')
      })
    }
    // 每页大小改变
    const handleSizeChange = val => {
      state.pageSize = val
      getTeamList()
    }
    // 当前页码改变
    const handleCurrentChange = val => {
      state.pageNum = val
      getTeamList()
    }
    // 处理搜索
    const handleSearch = () => {
      // 搜索后需要重置到第一页
      state.pageNum = 1
      getTeamList()
    }
    // 关闭窗口
    const closeDialogVisible = (visible, count) => {
      state.centerDialogVisible = visible
      if (count !== undefined) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getTeamList()
      }
    }
    // 处理编辑
    const handleEdit = ID => {
      state.editDialogVisible = true
      state.curID = ID
    }
    // 关闭编辑窗口
    const closeEditDialogVisible = (visible, count) => {
      state.editDialogVisible = visible
      if (count !== undefined) {
        ElMessage({
          message: '编辑成功',
          type: 'success'
        })
        getTeamList()
      }
    }
    // 处理删除
    const handleDelete = ID => {
      ElMessageBox.confirm('您确认删除该条数据吗?', '重要提醒', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        callback: async action => {
          if (action === 'confirm') {
            const { data: res } = await api.deleteTeam(ID)
            if (res.count === 1) {
              ElNotification({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              getTeamList()
            } else {
              ElNotification({
                title: '出错啦',
                message: '删除失败',
                type: 'error'
              })
            }
          }
          if (action === 'cancel') {
            ElNotification({
              title: '提示',
              message: '用户取消',
              type: 'warning'
            })
          }
        }
      })
    }
    onMounted(() => {
      getTeamList()
    })
    return {
      Search,
      Delete,
      Edit,
      ...toRefs(state),
      getTeamList,
      getChessList,
      getHexList,
      getFormulaEquips,
      handleSizeChange,
      handleCurrentChange,
      handleSearch,
      closeDialogVisible,
      closeEditDialogVisible,
      handleEdit,
      handleDelete
    }
  }
}
</script>

<style lang="less" scoped>
.setting-container {
  .top {
    margin: 10px;
  }
  .main-table {
    margin: 15px 0;
  }
  .options {
    display: flex;
    flex-wrap: wrap;
    // justify-content: flex-end;
    justify-content: center;
    .el-button {
      margin: 5px 5px;
    }
  }
}
</style>
