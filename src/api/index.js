import http from '@/util/http.js'

/* 获取列表带分页和查询 */

// 获取用户列表 带分页和查询
const getUsers = (pageNum, pageSize, searchContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent
    },
    method: 'GET',
    url: '/getusers'
  })
}

// 获取用户列表 带分页和查询
const getAdmins = (pageNum, pageSize, searchContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent
    },
    method: 'GET',
    url: '/getadmins'
  })
}

// 获取棋子列表 带分页和查询
const getChesses = (pageNum, pageSize, searchContent, selectContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent,
      selectContent: selectContent
    },
    method: 'GET',
    url: '/getchesses'
  })
}

// 获取race列表 带分页和查询
const getRaces = (pageNum, pageSize, searchContent, selectContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent,
      selectContent: selectContent
    },
    method: 'GET',
    url: '/getraces'
  })
}

// 获取job列表 带分页和查询
const getJobs = (pageNum, pageSize, searchContent, selectContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent,
      selectContent: selectContent
    },
    method: 'GET',
    url: '/getjobs'
  })
}

// 获取equip列表 带分页和查询
const getEquips = (pageNum, pageSize, searchContent, selectContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent,
      selectContent: selectContent
    },
    method: 'GET',
    url: '/getequips'
  })
}

/* 添加 */

// 添加用户
const addUser = formData => {
  return http({
    method: 'POST',
    url: '/adduser',
    data: formData
  })
}

// 添加管理员
const addAdmin = formData => {
  return http({
    method: 'POST',
    url: '/addadmin',
    data: formData
  })
}

// 添加英雄棋子
const addChess = formData => {
  return http({
    method: 'POST',
    url: '/addchess',
    data: formData
  })
}

/* 根据id获取信息 */

// 根据id获取用户信息
const getUserById = id => {
  return http({
    method: 'GET',
    url: `/getuserbyid?id=${id}`
  })
}

// 根据id获取 管理员 信息
const getAdminById = id => {
  return http({
    method: 'GET',
    url: `/getadminbyid?id=${id}`
  })
}

// 根据id获取 英雄棋子 信息
const getChessById = id => {
  return http({
    method: 'GET',
    url: `/getchessbyid?id=${id}`
  })
}

/* 修改信息 */

// 修改用户信息
const editUser = formData => {
  return http({
    method: 'POST',
    url: '/edituser',
    data: formData
  })
}

// 修改管理员信息
const editAdmin = formData => {
  return http({
    method: 'POST',
    url: '/editadmin',
    data: formData
  })
}

// 修改 英雄棋子 信息
const editChess = formData => {
  return http({
    method: 'POST',
    url: '/editchess',
    data: formData
  })
}

/* 删除信息 */

// 删除用户信息 id
const deleteUser = id => {
  return http({
    method: 'GET',
    url: `/deleteuser?id=${id}`
  })
}

// 删除管理员信息 id
const deleteAdmin = id => {
  return http({
    method: 'GET',
    url: `/deleteadmin?id=${id}`
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
  getAdmins,
  getChesses,
  getRaces,
  getJobs,
  getEquips,
  addUser,
  addAdmin,
  addChess,
  editUser,
  editAdmin,
  editChess,
  deleteUser,
  deleteAdmin,
  getUserById,
  getAdminById,
  getChessById,
  login
}
