import http from '@/util/http.js'

// 获取全部新闻列表
const getUsers = (pageNum, pageSize, searchContent) => {
  return http({
    method: 'GET',
    url: `/getusers?pageNum=${pageNum}&pageSize=${pageSize}&searchContent=${searchContent}`
  })
}

// 根据id获取新闻详情
const getDetailById = id => {
  return http({
    method: 'GET',
    url: `/newsdetail?id=${id}`
  })
}

// 登录
const login = (username, password) => {
  return http({
    method: 'POST',
    url: '/login',
    data: {
      username: username,
      password: password
    }
  })
}

export default {
  getUsers,
  getDetailById,
  login
}
