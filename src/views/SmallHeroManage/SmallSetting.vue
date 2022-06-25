<template>
  <div class="setting-container">
    <!-- 顶部面包屑 -->
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">回到首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/small-manage/setting' }">小小英雄管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/small-manage/setting' }"></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card>
        <!-- 顶部 search card -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="搜索小小英雄" :prefix-icon="Search" v-model="searchContent" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="warning" @click="centerDialogVisible = true">添加小小英雄</el-button>
          </el-col>
          <el-col :span="4">
            <el-select v-model="qualityValue" class="m-2" placeholder="品质选择" @change="getHeroList()">
              <el-option label="全部" value="all" />
              <el-option label="传说" value="传说" />
              <el-option label="史诗" value="史诗" />
              <el-option label="稀有" value="稀有" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="starValue" class="m-2" placeholder="星级选择" @change="getHeroList()">
              <el-option label="全部" value="all" />
              <el-option label="三星级" :value="3" />
              <el-option label="二星级" :value="2" />
              <el-option label="一星级" :value="1" />
            </el-select>
          </el-col>
        </el-row>
        <div class="main-table">
          <!-- 主干table -->
          <el-table :data="heroList" stripe border height="calc(100vh - 260px)">
            <el-table-column label="预览图" width="100">
              <template #default="scope">
                <el-image :src="scope.row.imagePath" style="width: 64px" />
              </template>
            </el-table-column>
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="heroId" label="小小英雄ID" width="120" />
            <el-table-column fixed prop="name" label="小小英雄" width="120" />
            <el-table-column prop="typeId" label="皮肤类型id" width="120" />
            <el-table-column prop="type" label="皮肤类型" width="150" />
            <el-table-column prop="mini" label="英雄种类" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="miniId" label="英雄种类ID" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="star" label="星级" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="quality" label="品质" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="shape" label="外形等级" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="imagePath" label="图片地址" :show-overflow-tooltip="true" />
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
      <AddSmall
        v-if="centerDialogVisible"
        :centerDialogVisible="centerDialogVisible"
        @onCloseDialog="closeDialogVisible"
      ></AddSmall>
      <EditJob
        v-if="editDialogVisible"
        :editDialogVisible="editDialogVisible"
        :curID="curID"
        @onCloseEditDialog="closeEditDialogVisible"
      ></EditJob>
    </div>
  </div>
</template>

<script>
import AddSmall from '@/components/SmallHero/AddSmall.vue'
import EditJob from '@/components/RaceAndJob/EditJob.vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import api from '@/api/index.js'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  components: {
    AddSmall,
    EditJob
  },
  setup() {
    const state = reactive({
      heroList: [],
      total: 0, // 总条数
      pageNum: 1, // 当前页码数
      pageSize: 10, // 每页大小
      searchContent: '', // 搜索内容
      qualityValue: 'all',
      starValue: 'all',
      centerDialogVisible: false,
      editDialogVisible: false,
      curID: 0
    })
    // 获取职业列表
    const getHeroList = async () => {
      const { data: res } = await api.getHeros(
        state.pageNum,
        state.pageSize,
        state.searchContent,
        state.qualityValue,
        state.starValue
      )
      state.heroList = res.heros
      state.total = res.total
    }
    // 每页大小改变
    const handleSizeChange = val => {
      state.pageSize = val
      getHeroList()
    }
    // 当前页码改变
    const handleCurrentChange = val => {
      state.pageNum = val
      getHeroList()
    }
    // 处理搜索
    const handleSearch = () => {
      // 搜索后需要重置到第一页
      state.pageNum = 1
      getHeroList()
    }
    // 关闭添加窗口
    const closeDialogVisible = (visible, count) => {
      state.centerDialogVisible = visible
      if (count !== undefined) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getHeroList()
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
        getHeroList()
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
            const { data: res } = await api.deleteJob(ID)
            if (res.count === 1) {
              ElNotification({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              getHeroList()
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
      getHeroList()
    })
    return {
      Search,
      Delete,
      Edit,
      ...toRefs(state),
      getHeroList,
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
