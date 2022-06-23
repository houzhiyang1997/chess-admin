// 时间补0
const checkTime = num => {
  return num < 10 ? '0' + num : num
}

// 格式化时间
const formDate = () => {
  const nowdate = new Date()

  const year = nowdate.getFullYear()
  const month = checkTime(nowdate.getMonth() + 1)
  const day = checkTime(nowdate.getDate())

  // const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const h = checkTime(nowdate.getHours())
  const m = checkTime(nowdate.getMinutes())
  const s = checkTime(nowdate.getSeconds())

  return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
}

export default { formDate }
