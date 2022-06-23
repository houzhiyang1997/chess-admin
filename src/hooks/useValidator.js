export const useCheckDate = () => {
  // 时间格式校验规则
  const checkDateForm = (rule, value, cb) => {
    const regDate = /^(\d{4})(-)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
    if (regDate.test(value)) {
      return cb()
    } else {
      cb(new Error('请输入正确的时间格式，建议直接点击获取'))
    }
  }
  return checkDateForm
}
