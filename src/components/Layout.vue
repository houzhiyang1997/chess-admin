<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-container">
          <img src="@/assets/logo-tft.png" alt="LOGO" />
          <span>云顶社区--后台管理系统</span>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="iscollapse ? '63.5px' : '200px'">
          <!-- 伸缩按钮 -->
          <div class="col-btn" @click="iscollapse = !iscollapse">|||</div>
          <!-- 菜单总控 -->
          <el-menu
            active-text-color="#ffd04b"
            background-color="#5b5c5e"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
            :collapse="iscollapse"
            :collapse-transition="false"
            :unique-opened="true"
            router
          >
            <!-- 一级菜单 -->
            <el-sub-menu index="/main-intro">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>主要介绍</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/main-intro/prointroduce">
                <el-icon><Location /></el-icon>
                <span>项目介绍</span>
              </el-menu-item>
              <el-menu-item index="/main-intro/personinfo">
                <el-icon><Location /></el-icon>
                <span>个人简历</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-sub-menu index="/user-manage">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>用户管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/user-manage/user">
                <el-icon><Location /></el-icon>
                <span>用户设置</span>
              </el-menu-item>
              <el-menu-item index="/user-manage/admin">
                <el-icon><Location /></el-icon>
                <span>管理员设置</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-sub-menu index="/team-manage">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>阵容管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/team-manage/setting">
                <el-icon><Location /></el-icon>
                <span>阵容详情</span>
              </el-menu-item>
              <el-menu-item index="/team-manage/add">
                <el-icon><Location /></el-icon>
                <span>添加阵容</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-sub-menu index="/chess-manage">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>英雄管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/chess-manage/setting">
                <el-icon><Location /></el-icon>
                <span>英雄详情</span>
              </el-menu-item>
              <el-menu-item index="/chess-manage/add">
                <el-icon><Location /></el-icon>
                <span>添加英雄</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-sub-menu index="/raceandjob">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>羁绊管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-sub-menu index="/race-manage">
                <template #title>
                  <el-icon><Location /></el-icon>
                  <span>种族管理</span>
                </template>
                <!-- 三级菜单 -->
                <el-menu-item index="/race-manage/setting">种族详情</el-menu-item>
                <el-menu-item index="/race-manage/add">添加种族</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="/job-manage">
                <template #title>
                  <el-icon><Location /></el-icon>
                  <span>职业管理</span>
                </template>
                <!-- 三级菜单 -->
                <el-menu-item index="/job-manage/setting">羁绊详情</el-menu-item>
                <el-menu-item index="/job-manage/add">添加羁绊</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-sub-menu index="/equip-manage">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>装备管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/equip-manage/setting">
                <el-icon><Location /></el-icon>
                <span>装备详情</span>
              </el-menu-item>
              <el-menu-item index="/equip-manage/add">
                <el-icon><Location /></el-icon>
                <span>添加装备</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-sub-menu index="/hex-manage">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>海克斯管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/hex-manage/setting">
                <el-icon><Location /></el-icon>
                <span>海克斯详情</span>
              </el-menu-item>
              <el-menu-item index="/hex-manage/add">
                <el-icon><Location /></el-icon>
                <span>添加海克斯</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-sub-menu index="/small-manage">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>小小英雄管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/small-manage/setting">
                <el-icon><Location /></el-icon>
                <span>小小英雄详情</span>
              </el-menu-item>
              <el-menu-item index="/small-manage/add">
                <el-icon><Location /></el-icon>
                <span>添加小小英雄</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 一级菜单 -->
            <el-sub-menu index="/news-manage">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>新闻管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/news-manage/setting">
                <el-icon><Location /></el-icon>
                <span>新闻详情</span>
              </el-menu-item>
              <el-menu-item index="/news-manage/add">
                <el-icon><Location /></el-icon>
                <span>新闻发布</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <!-- 主题内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      iscollapse: false
    })
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      ...toRefs(state),
      handleOpen,
      handleClose
    }
  }
}
</script>

<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
}
.common-layout {
  .el-header {
    color: white;
    background: #5b5c5e;
    .header-container {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        margin-left: 30px;
        width: 120px;
        height: 48px;
      }
      span {
        font-size: 20px;
        padding: 5px 25px;
        align-self: flex-end;
      }
    }
  }
  .el-main {
    background: #eaedf1;
    padding-top: 0;
  }
  // 隐藏滚动条
  .el-aside::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .el-aside {
    /* 隐藏滚动条 */
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    height: calc(100vh - 76px);
    background: #5b5c5e;
    transition: all 0.3s;

    .col-btn {
      width: calc(100% - 1px);
      background: #5b5c5e;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      color: white;
      cursor: pointer;
    }
    .el-menu {
      border: none;
    }
  }
}
</style>
