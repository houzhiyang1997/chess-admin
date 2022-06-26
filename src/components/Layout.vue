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
            :default-active="activePath"
            text-color="#fff"
            @select="selectItem"
            :collapse="iscollapse"
            :collapse-transition="false"
            :unique-opened="true"
            router
          >
            <!-- 主要介绍 -->
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
            <!-- 用户管理 -->
            <el-sub-menu index="/user-manage">
              <template #title>
                <el-icon><User /></el-icon>
                <span>用户管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/user-manage/user">
                <el-icon><User /></el-icon>
                <span>用户设置</span>
              </el-menu-item>
              <el-menu-item index="/user-manage/admin">
                <el-icon><UserFilled /></el-icon>
                <span>管理员设置</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 阵容管理 -->
            <el-sub-menu index="/team-manage">
              <template #title>
                <el-icon><WindPower /></el-icon>
                <span>阵容管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/team-manage/setting">
                <el-icon><Flag /></el-icon>
                <span>阵容详情</span>
              </el-menu-item>
              <el-menu-item index="/team-manage/add" disabled>
                <el-icon><Flag /></el-icon>
                <span>功能接入中</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 英雄管理 -->
            <el-sub-menu index="/chess-manage">
              <template #title>
                <el-icon><Star /></el-icon>
                <span>英雄管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/chess-manage/setting">
                <el-icon><StarFilled /></el-icon>
                <span>英雄详情</span>
              </el-menu-item>
              <el-menu-item index="/chess-manage/add" disabled>
                <el-icon><StarFilled /></el-icon>
                <span>功能接入中</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 羁绊管理 -->
            <el-sub-menu index="/raceandjob">
              <template #title>
                <el-icon><Magnet /></el-icon>
                <span>羁绊管理</span>
              </template>
              <!-- 种族管理 -->
              <el-sub-menu index="/race-manage">
                <template #title>
                  <el-icon><PriceTag /></el-icon>
                  <span>种族管理</span>
                </template>
                <!-- 种族详情 -->
                <el-menu-item index="/race-manage/setting">种族详情</el-menu-item>
                <el-menu-item index="/race-manage/add" disabled>功能接入中</el-menu-item>
              </el-sub-menu>
              <!-- 职业管理 -->
              <el-sub-menu index="/job-manage">
                <template #title>
                  <el-icon><Suitcase /></el-icon>
                  <span>职业管理</span>
                </template>
                <!-- 职业详情 -->
                <el-menu-item index="/job-manage/setting">职业详情</el-menu-item>
                <el-menu-item index="/job-manage/add" disabled>功能接入中</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <!-- 装备管理 -->
            <el-sub-menu index="/equip-manage">
              <template #title>
                <el-icon><Help /></el-icon>
                <span>装备管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/equip-manage/setting">
                <el-icon><HelpFilled /></el-icon>
                <span>装备详情</span>
              </el-menu-item>
              <el-menu-item index="/equip-manage/add" disabled>
                <el-icon><HelpFilled /></el-icon>
                <span>功能接入中</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 海克斯管理 -->
            <el-sub-menu index="/hex-manage">
              <template #title>
                <el-icon><PictureRounded /></el-icon>
                <span>海克斯管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/hex-manage/setting">
                <el-icon><PieChart /></el-icon>
                <span>海克斯详情</span>
              </el-menu-item>
              <el-menu-item index="/hex-manage/add" disabled>
                <el-icon><PieChart /></el-icon>
                <span>功能接入中</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 小小英雄管理 -->
            <el-sub-menu index="/small-manage">
              <template #title>
                <el-icon><Place /></el-icon>
                <span>小小英雄管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/small-manage/setting">
                <el-icon><Place /></el-icon>
                <span>小小英雄详情</span>
              </el-menu-item>
              <el-menu-item index="/small-manage/add" disabled>
                <el-icon><Place /></el-icon>
                <span>功能接入中</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 新闻管理 -->
            <el-sub-menu index="/news-manage">
              <template #title>
                <el-icon><DocumentCopy /></el-icon>
                <span>新闻管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/news-manage/setting">
                <el-icon><Comment /></el-icon>
                <span>新闻详情</span>
              </el-menu-item>
              <el-menu-item index="/news-manage/add">
                <el-icon><Comment /></el-icon>
                <span>功能接入中</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <!-- 主体内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      iscollapse: false,
      activePath: ''
    })
    onMounted(() => {
      // 还原刷新前的选中状态
      state.activePath = window.sessionStorage.getItem('activePath')
    })
    const selectItem = index => {
      // 保存刷新的选中状态
      window.sessionStorage.setItem('activePath', index)
      state.activePath = index
    }

    return {
      ...toRefs(state),
      selectItem
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
  height: 100%;
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
    height: calc(100vh - 60px);
  }
  // 隐藏滚动条
  .el-aside::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .el-aside {
    /* 隐藏滚动条 */
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    height: calc(100vh - 60px);
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
      height: 100%;
    }
  }
}
</style>
