<template>
  <div class="setting-container">
    <!-- 顶部面包屑 -->
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">回到首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/news-manage/user' }">新闻管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/news-manage/admin' }"></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card>
        <!-- 顶部 search card -->
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="搜索新闻标题或作者" :prefix-icon="Search" v-model="searchContent" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="warning" @click="centerDialogVisible = true">添加新闻</el-button>
          </el-col>
        </el-row>
        <div class="main-table">
          <!-- 主干table -->
          <el-table :data="newsList" stripe border height="calc(100vh - 260px)">
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="newsId" label="新闻ID" width="100" />
            <el-table-column prop="title" label="新闻标题" :show-overflow-tooltip="true" />
            <el-table-column prop="author" label="作者" width="150" />
            <el-table-column prop="author_img" label="作者头像地址" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="img" label="封面图" width="120" :show-overflow-tooltip="true" />
            <el-table-column prop="content" label="新闻内容" :show-overflow-tooltip="true" />
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button type="primary" :icon="Edit" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                <el-button type="danger" :icon="Delete" size="small" @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
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
      <AddNews :centerDialogVisible="centerDialogVisible" @onCloseDialog="closeDialogVisible"></AddNews>
      <EditNews
        v-if="editDialogVisible"
        :editDialogVisible="editDialogVisible"
        :curID="curID"
        @onCloseEditDialog="closeEditDialogVisible"
      ></EditNews>
    </div>
  </div>
</template>

<script>
import AddNews from '@/components/News/AddNews.vue'
import EditNews from '@/components/News/EditNews.vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import api from '@/api/index.js'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  components: {
    AddNews,
    EditNews
  },
  setup() {
    const state = reactive({
      newsList: [],
      total: 0, // 总条数
      pageNum: 1, // 当前页码数
      pageSize: 10, // 每页大小
      searchContent: '', // 搜索内容
      centerDialogVisible: false,
      editDialogVisible: false,
      curID: 0
    })
    // 获取新闻列表
    const getNewsList = async () => {
      const { data: res } = await api.getNews(state.pageNum, state.pageSize, state.searchContent)
      state.newsList = res.news
      state.total = res.total
    }
    // 每页大小改变
    const handleSizeChange = val => {
      state.pageSize = val
      getNewsList()
    }
    // 当前页码改变
    const handleCurrentChange = val => {
      state.pageNum = val
      getNewsList()
    }
    // 处理搜索
    const handleSearch = () => {
      // 搜索后需要重置到第一页
      state.pageNum = 1
      getNewsList()
    }
    // 关闭窗口
    const closeDialogVisible = (visible, count) => {
      state.centerDialogVisible = visible
      if (count !== undefined) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getNewsList()
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
        getNewsList()
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
            const { data: res } = await api.deleteNews(ID)
            if (res.count === 1) {
              ElNotification({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              getNewsList()
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
      getNewsList()
    })
    return {
      Search,
      Delete,
      Edit,
      ...toRefs(state),
      getNewsList,
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
}
</style>
