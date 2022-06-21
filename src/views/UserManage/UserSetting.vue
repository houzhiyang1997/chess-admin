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
    <!-- 顶部 search card -->
    <div class="card">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="搜索用户名" :prefix-icon="Search" />
          </el-col>
          <el-col :span="2">
            <el-button type="primary">搜索</el-button>
          </el-col>
        </el-row>
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
      </el-card>
    </div>
  </div>
</template>

<script>
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import api from '@/api/index.js'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      userList: [],
      srcList: [
        'http://game.gtimg.cn/images/lol/act/img/profileicon/4216.png',
        'http://game.gtimg.cn/images/lol/act/img/profileicon/4216.png',
        'http://game.gtimg.cn/images/lol/act/img/profileicon/4216.png'
      ]
    })
    const getUserList = async () => {
      const { data: res } = await api.getUsers()
      console.log(res)
      state.userList = res.users
    }
    onMounted(() => {
      getUserList()
    })
    return {
      Search,
      Delete,
      Edit,
      ...toRefs(state),
      getUserList
    }
  }
}
</script>

<style lang="less" scoped>
.setting-container {
  .top {
    margin: 10px;
  }
  .el-row {
    margin-bottom: 20px;
  }
}
</style>
