<template>
  <div class="setting-container">
    <!-- 顶部面包屑 -->
    <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">回到首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user-manage/admin' }">管理员设置</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user-manage/user' }">用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card>
        <!-- 顶部 search card -->
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="搜索管理员" :prefix-icon="Search" v-model="searchContent" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="warning" @click="centerDialogVisible = true">添加管理员</el-button>
          </el-col>
        </el-row>
        <div class="main-table">
          <!-- 主干table -->
          <el-table :data="adminList" stripe border>
            <el-table-column prop="id" label="序号" width="80" />
            <el-table-column prop="admin" label="管理员用户名" />
            <el-table-column prop="nickName" label="昵称" />
            <el-table-column prop="level" label="管理员级别" width="120" />
            <el-table-column prop="regDate" label="注册时间" />
            <el-table-column prop="imgUrl" label="头像地址" :show-overflow-tooltip="true" />
            <el-table-column label="操作">
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
      <AddAdmin :centerDialogVisible="centerDialogVisible" @onCloseDialog="closeDialogVisible"></AddAdmin>
      <EditAdmin
        v-if="editDialogVisible"
        :editDialogVisible="editDialogVisible"
        :curID="curID"
        @onCloseEditDialog="closeEditDialogVisible"
      ></EditAdmin>
    </div>
  </div>
</template>

<script>
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import AddAdmin from '@/components/User/AddAdmin.vue'
import EditAdmin from '@/components/User/EditAdmin.vue'
import { ElMessage } from 'element-plus'
import { reactive, toRefs, onMounted } from 'vue'
import api from '@/api/index.js'
export default {
  components: {
    AddAdmin,
    EditAdmin
  },
  setup() {
    const state = reactive({
      adminList: [],
      total: 0, // 总条数
      pageNum: 1, // 当前页码数
      pageSize: 10, // 每页大小
      searchContent: '', // 搜索内容
      centerDialogVisible: false,
      editDialogVisible: false,
      curID: 0
    })
    // 获取管理员列表
    const getAdminList = async () => {
      const { data: res } = await api.getAdmins(state.pageNum, state.pageSize, state.searchContent)
      state.adminList = res.admins
      state.total = res.total
    }
    // 每页大小改变
    const handleSizeChange = val => {
      state.pageSize = val
      getAdminList()
    }
    // 当前页码改变
    const handleCurrentChange = val => {
      state.pageNum = val
      getAdminList()
    }
    // 处理搜索
    const handleSearch = () => {
      // 搜索后需要重置到第一页
      state.pageNum = 1
      getAdminList()
    }
    // 关闭窗口
    const closeDialogVisible = (visible, count) => {
      state.centerDialogVisible = visible
      if (count !== undefined) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
        getAdminList()
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
        getAdminList()
      }
    }
    onMounted(() => {
      getAdminList()
    })
    return {
      Search,
      Delete,
      Edit,
      ...toRefs(state),
      getAdminList,
      handleSizeChange,
      handleCurrentChange,
      handleSearch,
      closeDialogVisible,
      handleEdit,
      closeEditDialogVisible
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
