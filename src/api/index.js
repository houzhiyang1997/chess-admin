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

// 获取hex列表 带分页、查询和分级
const getHexes = (pageNum, pageSize, searchContent, selectContent, hexLevel) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent,
      selectContent: selectContent,
      hexLevel: hexLevel
    },
    method: 'GET',
    url: '/gethexes'
  })
}

// 获取小小英雄列表 带分页、查询和分级
const getHeros = (pageNum, pageSize, searchContent, qualityContent, starContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent,
      qualityContent: qualityContent,
      starContent: starContent
    },
    method: 'GET',
    url: '/getheros'
  })
}

// 获取阵容列表 带分页和查询
const getTeams = (pageNum, pageSize, searchContent, selectContent, labelContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent,
      selectContent: selectContent,
      labelContent: labelContent
    },
    method: 'GET',
    url: '/getteams'
  })
}

// 获取新闻列表 带分页和查询
const getNews = (pageNum, pageSize, searchContent, selectContent) => {
  return http({
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      searchContent: searchContent,
      selectContent: selectContent
    },
    method: 'GET',
    url: '/getnews'
  })
}

// 获取 formula 列表
const getFormula = season => {
  return http({
    method: 'GET',
    url: `/getformula?season=${season}`
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

// 添加装备
const addEquip = formData => {
  return http({
    method: 'POST',
    url: '/addequip',
    data: formData
  })
}

// 添加海克斯
const addHex = formData => {
  return http({
    method: 'POST',
    url: '/addhex',
    data: formData
  })
}

// 添加 种族race
const addRace = formData => {
  return http({
    method: 'POST',
    url: '/addrace',
    data: formData
  })
}

// 添加 职业job
const addJob = formData => {
  return http({
    method: 'POST',
    url: '/addjob',
    data: formData
  })
}

// 添加 小小英雄hero
const addHero = formData => {
  return http({
    method: 'POST',
    url: '/addhero',
    data: formData
  })
}

// 添加 阵容Team
const addTeam = formData => {
  return http({
    method: 'POST',
    url: '/addteam',
    data: formData
  })
}

// 添加 新闻news
const addNews = formData => {
  return http({
    method: 'POST',
    url: '/addnews',
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

// 根据id获取 装备 信息
const getEquipById = id => {
  return http({
    method: 'GET',
    url: `/getequipbyid?id=${id}`
  })
}

// 根据id获取 海克斯 信息
const getHexById = id => {
  return http({
    method: 'GET',
    url: `/gethexbyid?id=${id}`
  })
}

// 根据id获取 种族 信息
const getRaceById = id => {
  return http({
    method: 'GET',
    url: `/getracebyid?id=${id}`
  })
}

// 根据id获取 职业 信息
const getJobById = id => {
  return http({
    method: 'GET',
    url: `/getjobbyid?id=${id}`
  })
}

// 根据id获取 小小英雄hero 信息
const getHeroById = id => {
  return http({
    method: 'GET',
    url: `/getherobyid?id=${id}`
  })
}

// 根据id获取 阵容team 信息
const getTeamById = id => {
  return http({
    method: 'GET',
    url: `/getteambyid?id=${id}`
  })
}

// 根据id获取 新闻news 信息
const getNewsById = id => {
  return http({
    method: 'GET',
    url: `/getnewsbyid?id=${id}`
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

// 修改 装备 信息
const editEquip = formData => {
  return http({
    method: 'POST',
    url: '/editequip',
    data: formData
  })
}

// 修改 hex 信息
const editHex = formData => {
  return http({
    method: 'POST',
    url: '/edithex',
    data: formData
  })
}

// 修改 race 信息
const editRace = formData => {
  return http({
    method: 'POST',
    url: '/editrace',
    data: formData
  })
}

// 修改 job 信息
const editJob = formData => {
  return http({
    method: 'POST',
    url: '/editjob',
    data: formData
  })
}

// 修改 小小英雄 信息
const editHero = formData => {
  return http({
    method: 'POST',
    url: '/edithero',
    data: formData
  })
}

// 修改 阵容 信息
const editTeam = formData => {
  return http({
    method: 'POST',
    url: '/editteam',
    data: formData
  })
}

// 修改 阵容 信息
const editNews = formData => {
  return http({
    method: 'POST',
    url: '/editnews',
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

// 删除 英雄棋子 id
const deleteChess = id => {
  return http({
    method: 'GET',
    url: `/deletechess?id=${id}`
  })
}

// 删除 装备 id
const deleteEquip = id => {
  return http({
    method: 'GET',
    url: `/deleteequip?id=${id}`
  })
}

// 删除hex信息 id
const deleteHex = id => {
  return http({
    method: 'GET',
    url: `/deletehex?id=${id}`
  })
}

// 删除race信息 id
const deleteRace = id => {
  return http({
    method: 'GET',
    url: `/deleterace?id=${id}`
  })
}

// 删除job信息 id
const deleteJob = id => {
  return http({
    method: 'GET',
    url: `/deletejob?id=${id}`
  })
}

// 删除 小小英雄 信息 id
const deleteHero = id => {
  return http({
    method: 'GET',
    url: `/deletehero?id=${id}`
  })
}

// 删除 阵容 信息 id
const deleteTeam = id => {
  return http({
    method: 'GET',
    url: `/deleteteam?id=${id}`
  })
}

// 删除 新闻 信息 id
const deleteNews = id => {
  return http({
    method: 'GET',
    url: `/deletenews?id=${id}`
  })
}

// 登录
const login = formData => {
  return http({
    method: 'POST',
    url: '/login',
    data: formData
  })
}

// 获取token用以验证
const getToken = username => {
  return http({
    method: 'GET',
    url: `/gettoken?username=${username}`
  })
}

export default {
  getUsers,
  getAdmins,
  getChesses,
  getRaces,
  getJobs,
  getEquips,
  getHexes,
  getHeros,
  getTeams,
  getFormula,
  getNews,
  addUser,
  addAdmin,
  addChess,
  addEquip,
  addHex,
  addRace,
  addJob,
  addHero,
  addTeam,
  addNews,
  editUser,
  editAdmin,
  editChess,
  editEquip,
  editHex,
  editRace,
  editJob,
  editHero,
  editTeam,
  editNews,
  deleteUser,
  deleteAdmin,
  deleteChess,
  deleteEquip,
  deleteHex,
  deleteRace,
  deleteJob,
  deleteHero,
  deleteTeam,
  deleteNews,
  getUserById,
  getAdminById,
  getChessById,
  getEquipById,
  getHexById,
  getRaceById,
  getJobById,
  getHeroById,
  getTeamById,
  getNewsById,
  login,
  getToken
}
