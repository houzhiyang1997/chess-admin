<template>
  <el-config-provider :locale="locale">
    <Layout></Layout>
  </el-config-provider>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { ElConfigProvider } from 'element-plus'
// 配置中文
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  name: 'LayOut',
  components: {
    Layout,
    ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    }
  }
}
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
}

.el-popper {
  font-size: 14px;
  max-width: 600px;
}
</style>
