module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  overrides: [
    // 这里是添加的代码
    {
      files: ['src/views/*.vue', 'src/views/**/*.vue', 'src/components/*.vue', 'src/components/**/*.vue'], // 匹配views和二级目录中的所有.vue
      rules: {
        'vue/multi-word-component-names': 'off'
      } // 给上面匹配的文件指定规则
    }
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-new': 'off'
  }
}
