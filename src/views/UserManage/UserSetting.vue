<template>
  <div class="setting-container">
    <!-- 顶部面包屑 -->
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">回到首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user-manage/user' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user-manage/admin' }">管理员设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card>
        <!-- 顶部 search card -->
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="搜索用户名或昵称" :prefix-icon="Search" v-model="searchContent" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="warning" @click="centerDialogVisible = true">添加用户</el-button>
          </el-col>
        </el-row>
        <div class="main-table">
          <!-- 主干table -->
          <el-table :data="userList" stripe border>
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="nickName" label="昵称" />
            <el-table-column prop="level" label="等级" width="80" />
            <el-table-column prop="exp" label="经验" width="80" />
            <el-table-column prop="score" label="积分" width="80" />
            <el-table-column prop="imgUrl" label="头像地址" :show-overflow-tooltip="true" />
            <el-table-column label="操作">
              <template #default>
                <el-button type="primary" :icon="Edit" size="small">编辑</el-button>
                <el-button type="danger" :icon="Delete" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 底部分页器 -->
        <div class="pagination">
          <el-pagination
            v-model:currentPage="pageNum"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5, 8, 10]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
      <AddUser :centerDialogVisible="centerDialogVisible" @onCloseDialog="closeDialogVisible"></AddUser>
    </div>
  </div>
</template>

<script>
import AddUser from '@/components/User/AddUser.vue'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import api from '@/api/index.js'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  components: {
    AddUser
  },
  setup() {
    const state = reactive({
      userList: [],
      total: 0, // 总条数
      pageNum: 1, // 当前页码数
      pageSize: 3, // 每页大小
      searchContent: '', // 搜索内容
      centerDialogVisible: false
    })
    // 获取用户列表
    const getUserList = async () => {
      const { data: res } = await api.getUsers(state.pageNum, state.pageSize, state.searchContent)
      console.log(res)
      state.userList = res.users
      state.total = res.total
    }
    // 每页大小改变
    const handleSizeChange = val => {
      state.pageSize = val
      getUserList()
    }
    // 当前页码改变
    const handleCurrentChange = val => {
      state.pageNum = val
      getUserList()
    }
    // 处理搜索
    const handleSearch = () => {
      // 搜索后需要重置到第一页
      state.pageNum = 1
      getUserList()
    }
    // 关闭窗口
    const closeDialogVisible = visible => {
      state.centerDialogVisible = visible
    }
    onMounted(() => {
      getUserList()
    })
    return {
      Search,
      Delete,
      Edit,
      ...toRefs(state),
      getUserList,
      handleSizeChange,
      handleCurrentChange,
      handleSearch,
      closeDialogVisible
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
