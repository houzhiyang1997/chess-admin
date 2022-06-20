import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  { path: '/', redirect: '/main-intro/personinfo' },
  // 主要介绍
  { path: '/main-intro/personinfo', component: () => import('@/views/MainIntro/PersonInfo.vue') },
  { path: '/main-intro/prointroduce', component: () => import('@/views/MainIntro/ProIntroduce.vue') },
  // 用户管理
  { path: '/user-manage/user', component: () => import('@/views/UserManage/UserSetting.vue') },
  { path: '/user-manage/admin', component: () => import('@/views/UserManage/AdminSettting.vue') },
  // 阵容管理
  { path: '/team-manage/setting', component: () => import('@/views/TeamManage/TeamSetting.vue') },
  { path: '/team-manage/add', component: () => import('@/views/TeamManage/AddTeam.vue') },
  // 英雄管理
  { path: '/chess-manage/setting', component: () => import('@/views/ChessManage/ChessSetting.vue') },
  { path: '/chess-manage/add', component: () => import('@/views/ChessManage/AddChess.vue') },
  // 种族管理
  { path: '/race-manage/setting', component: () => import('@/views/RaceAndJob/RaceSetting.vue') },
  { path: '/race-manage/add', component: () => import('@/views/RaceAndJob/AddRace.vue') },
  // 职业管理
  { path: '/job-manage/setting', component: () => import('@/views/RaceAndJob/JobSetting.vue') },
  { path: '/job-manage/add', component: () => import('@/views/RaceAndJob/AddJob.vue') },
  // 装备管理
  { path: '/equip-manage/setting', component: () => import('@/views/EquipManage/EquipSetting.vue') },
  { path: '/equip-manage/add', component: () => import('@/views/EquipManage/AddEquip.vue') },
  // hex管理
  { path: '/hex-manage/setting', component: () => import('@/views/HexManage/HexSetting.vue') },
  { path: '/hex-manage/add', component: () => import('@/views/HexManage/AddHex.vue') },
  // 小小英雄管理
  { path: '/small-manage/setting', component: () => import('@/views/SmallHeroManage/SmallSetting.vue') },
  { path: '/small-manage/add', component: () => import('@/views/SmallHeroManage/AddSmall.vue') },
  // 新闻管理
  { path: '/news-manage/setting', component: () => import('@/views/NewsManage/NewsSetting.vue') },
  { path: '/news-manage/add', component: () => import('@/views/NewsManage/AddNews.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
