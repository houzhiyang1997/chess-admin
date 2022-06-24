<template>
  <div class="setting-container">
    <!-- 顶部面包屑 -->
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">回到首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/chess-manage/setting' }">英雄管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/chess-manage/setting' }"></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card>
        <!-- 顶部 search card -->
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="搜索英雄名或别名" :prefix-icon="Search" v-model="searchContent" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="warning" @click="centerDialogVisible = true">添加英雄</el-button>
          </el-col>
          <el-col :span="6">
            <el-select v-model="selectValue" class="m-2" placeholder="赛季与版本选择" @change="getChessList()">
              <el-option label="S7-巨龙之境" value="2022.S7" />
              <el-option label="S6-霓虹之夜" value="2022.S6" />
            </el-select>
          </el-col>
        </el-row>
        <div class="main-table">
          <!-- 主干table -->
          <el-table :data="chessList" stripe border height="calc(100vh - 260px)">
            <el-table-column label="预览图">
              <template #default="scope">
                <el-image :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/' + scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="chessId" label="棋子ID" width="80" />
            <el-table-column prop="TFTID" label="云顶通用ID" width="100" />
            <el-table-column fixed prop="title" label="英雄名" width="120" />
            <el-table-column prop="displayName" label="英雄别称" width="100" />
            <el-table-column prop="name" label="英雄图片name" width="130" />
            <el-table-column prop="races" label="羁绊" width="120" />
            <el-table-column prop="raceIds" label="羁绊ID列表" width="100" />
            <el-table-column prop="jobs" label="职业" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="jobIds" label="职业ID列表" width="100" />
            <el-table-column prop="price" label="英雄费率" width="100" />
            <el-table-column prop="skillName" label="技能" width="100" />
            <el-table-column label="技能预览图" width="100">
              <template #default="scope">
                <el-image :src="scope.row.skillImage" />
              </template>
            </el-table-column>
            <el-table-column prop="skillType" label="技能类型" width="100" />
            <el-table-column prop="skillImage" label="技能图片地址" width="130" :show-overflow-tooltip="true" />
            <el-table-column prop="skillDetail" width="200" label="技能介绍" :show-overflow-tooltip="true" />
            <el-table-column prop="life" label="生命值" />
            <el-table-column prop="magic" label="法力值" />
            <el-table-column prop="startMagic" label="初始法力值" width="100" />
            <el-table-column prop="armor" label="护甲" />
            <el-table-column prop="spellBlock" label="魔抗" />
            <el-table-column prop="attack" label="攻击力" />
            <el-table-column prop="attackSpeed" label="攻击速度" width="100" />
            <el-table-column prop="attackRange" label="攻击距离" width="100" />
            <el-table-column prop="attackData" label="攻击成长" width="100" :show-overflow-tooltip="true" />
            <el-table-column prop="lifeData" label="生命成长" width="100" :show-overflow-tooltip="true" />
            <el-table-column prop="recEquip" label="推荐装备" width="100" :show-overflow-tooltip="true" />
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
      <AddChess
        v-if="centerDialogVisible"
        :season="selectValue"
        :centerDialogVisible="centerDialogVisible"
        @onCloseDialog="closeDialogVisible"
      ></AddChess>
      <EditChess
        v-if="editDialogVisible"
        :season="selectValue"
        :editDialogVisible="editDialogVisible"
        :curID="curID"
        @onCloseEditDialog="closeEditDialogVisible"
      ></EditChess>
    </div>
  </div>
</template>

<script>
import AddChess from '@/components/Chess/AddChess.vue'
import EditChess from '@/components/Chess/EditChess.vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import api from '@/api/index.js'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  components: {
    AddChess,
    EditChess
  },
  setup() {
    const state = reactive({
      chessList: [],
      total: 0, // 总条数
      pageNum: 1, // 当前页码数
      pageSize: 10, // 每页大小
      searchContent: '', // 搜索内容
      selectValue: '2022.S7',
      centerDialogVisible: false,
      editDialogVisible: false,
      curID: 0
    })
    // 获取棋子列表
    const getChessList = async () => {
      const { data: res } = await api.getChesses(state.pageNum, state.pageSize, state.searchContent, state.selectValue)
      state.chessList = res.chesses
      state.total = res.total
    }
    // 每页大小改变
    const handleSizeChange = val => {
      state.pageSize = val
      getChessList()
    }
    // 当前页码改变
    const handleCurrentChange = val => {
      state.pageNum = val
      getChessList()
    }
    // 处理搜索
    const handleSearch = () => {
      // 搜索后需要重置到第一页
      state.pageNum = 1
      getChessList()
    }
    // 关闭窗口
    const closeDialogVisible = (visible, count) => {
      state.centerDialogVisible = visible
      if (count !== undefined) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getChessList()
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
        getChessList()
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
            const { data: res } = await api.deleteChess(ID)
            if (res.count === 1) {
              ElNotification({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              getChessList()
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
      getChessList()
    })
    return {
      Search,
      Delete,
      Edit,
      ...toRefs(state),
      getChessList,
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
