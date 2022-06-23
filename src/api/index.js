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

/* 删除信息 */

// 删除用户信息 id
const deleteUser = id => {
  return http({
    method: 'GET',
    url: `/deleteuser?id=${id}`
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
  addUser,
  addAdmin,
  editUser,
  editAdmin,
  deleteUser,
  getUserById,
  getAdminById,
  login
}
