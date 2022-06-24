<template>
  <div class="setting-container">
    <!-- 顶部面包屑 -->
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">回到首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/race-manage/setting' }">种族管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/race-manage/setting' }"></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card>
        <!-- 顶部 search card -->
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="搜索种族" :prefix-icon="Search" v-model="searchContent" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="warning" @click="centerDialogVisible = true">添加种族</el-button>
          </el-col>
          <el-col :span="6">
            <el-select v-model="selectValue" class="m-2" placeholder="赛季与版本选择" @change="getEquipList()">
              <el-option label="S7-巨龙之境" value="2022.S7" />
              <el-option label="S6-霓虹之夜" value="2022.S6" />
            </el-select>
          </el-col>
        </el-row>
        <div class="main-table">
          <!-- 主干table -->
          <el-table :data="raceList" stripe border height="calc(100vh - 260px)">
            <el-table-column label="预览图">
              <template #default="scope">
                <el-image :src="scope.row.imagePath" style="width: 48px" />
              </template>
            </el-table-column>
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="raceId" label="种族ID" width="80" />
            <el-table-column fixed prop="name" label="种族名" width="120" />
            <el-table-column prop="introduce" label="简介" :show-overflow-tooltip="true" />
            <el-table-column prop="level" label="分级介绍" width="200" :show-overflow-tooltip="true" />
            <el-table-column prop="imagePath" label="图片地址" width="180" :show-overflow-tooltip="true" />
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
      <AddRace
        v-if="centerDialogVisible"
        :season="selectValue"
        :centerDialogVisible="centerDialogVisible"
        @onCloseDialog="closeDialogVisible"
      ></AddRace>
      <EditEquip
        v-if="editDialogVisible"
        :season="selectValue"
        :editDialogVisible="editDialogVisible"
        :curID="curID"
        @onCloseEditDialog="closeEditDialogVisible"
      ></EditEquip>
    </div>
  </div>
</template>

<script>
import AddRace from '@/components/RaceAndJob/AddRace.vue'
import EditEquip from '@/components/Equip/EditEquip.vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import api from '@/api/index.js'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  components: {
    AddRace,
    EditEquip
  },
  setup() {
    const state = reactive({
      raceList: [],
      total: 0, // 总条数
      pageNum: 1, // 当前页码数
      pageSize: 10, // 每页大小
      searchContent: '', // 搜索内容
      selectValue: '2022.S7',
      centerDialogVisible: false,
      editDialogVisible: false,
      curID: 0
    })
    // 获取装备列表
    const getEquipList = async () => {
      const { data: res } = await api.getRaces(state.pageNum, state.pageSize, state.searchContent, state.selectValue)
      state.raceList = res.races
      state.total = res.total
    }
    // 每页大小改变
    const handleSizeChange = val => {
      state.pageSize = val
      getEquipList()
    }
    // 当前页码改变
    const handleCurrentChange = val => {
      state.pageNum = val
      getEquipList()
    }
    // 处理搜索
    const handleSearch = () => {
      // 搜索后需要重置到第一页
      state.pageNum = 1
      getEquipList()
    }
    // 关闭窗口
    const closeDialogVisible = (visible, count) => {
      state.centerDialogVisible = visible
      if (count !== undefined) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getEquipList()
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
        getEquipList()
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
            const { data: res } = await api.deleteEquip(ID)
            if (res.count === 1) {
              ElNotification({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              getEquipList()
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
      getEquipList()
    })
    return {
      Search,
      Delete,
      Edit,
      ...toRefs(state),
      getEquipList,
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
