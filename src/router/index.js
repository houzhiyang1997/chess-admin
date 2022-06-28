import { createRouter, createWebHashHistory } from 'vue-router'
import api from '@/api/index'
import store from '@/store/index'
const routes = [
  { path: '/', redirect: '/home/main-intro/prointroduce' },
  { path: '/login', component: () => import('@/views/Login.vue') },
  {
    path: '/home',
    component: () => import('@/components/Layout.vue'),
    meta: { isAuth: true },
    children: [
      // 主要介绍
      {
        path: 'main-intro/personinfo',
        component: () => import('@/views/MainIntro/PersonInfo.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'main-intro/prointroduce',
        component: () => import('@/views/MainIntro/ProIntroduce.vue'),
        meta: { isAuth: true }
      }, // 用户管理
      {
        path: 'user-manage/user',
        component: () => import('@/views/UserManage/UserSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'user-manage/admin',
        component: () => import('@/views/UserManage/AdminSettting.vue'),
        meta: { isAuth: true }
      },
      // 阵容管理
      {
        path: 'team-manage/setting',
        component: () => import('@/views/TeamManage/TeamSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'team-manage/add',
        component: () => import('@/views/TeamManage/AddTeam.vue'),
        meta: { isAuth: true }
      },
      // 英雄管理
      {
        path: 'chess-manage/setting',
        component: () => import('@/views/ChessManage/ChessSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'chess-manage/add',
        component: () => import('@/views/ChessManage/AddChess.vue'),
        meta: { isAuth: true }
      },
      // 种族管理
      {
        path: 'race-manage/setting',
        component: () => import('@/views/RaceAndJob/RaceSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'race-manage/add',
        component: () => import('@/views/RaceAndJob/AddRace.vue'),
        meta: { isAuth: true }
      },
      // 职业管理
      {
        path: 'job-manage/setting',
        component: () => import('@/views/RaceAndJob/JobSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'job-manage/add',
        component: () => import('@/views/RaceAndJob/AddJob.vue'),
        meta: { isAuth: true }
      },
      // 装备管理
      {
        path: 'equip-manage/setting',
        component: () => import('@/views/EquipManage/EquipSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'equip-manage/add',
        component: () => import('@/views/EquipManage/AddEquip.vue'),
        meta: { isAuth: true }
      },
      // hex管理
      {
        path: 'hex-manage/setting',
        component: () => import('@/views/HexManage/HexSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'hex-manage/add',
        component: () => import('@/views/HexManage/AddHex.vue'),
        meta: { isAuth: true }
      },
      // 小小英雄管理
      {
        path: 'small-manage/setting',
        component: () => import('@/views/SmallHeroManage/SmallSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'small-manage/add',
        component: () => import('@/views/SmallHeroManage/AddSmall.vue'),
        meta: { isAuth: true }
      },
      // 新闻管理
      {
        path: 'news-manage/setting',
        component: () => import('@/views/NewsManage/NewsSetting.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'news-manage/add',
        component: () => import('@/views/NewsManage/AddNews.vue'),
        meta: { isAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  // 获取token
  const storageToken = window.sessionStorage.getItem('token')
  let realToken = ''
  if (store.state.adminInfo.token) {
    realToken = store.state.adminInfo.token
  } else {
    const { data: res } = await api.getToken(window.sessionStorage.getItem('username'))
    realToken = res.token
  }
  // 判断是否需要鉴权
  if (to.meta.isAuth) {
    // 如果session中的token和数据库取到的token一致 则通过
    if (storageToken === realToken && storageToken && realToken) {
      next()
    } else {
      // 否则进入login
      next('/login')
    }
  } else {
    next()
  }
})

export default router
