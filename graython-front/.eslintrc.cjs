module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended', // 添加此行
  ],
  rules: {
    'prettier/prettier': 'error', // 启用 Prettier 规则
    // 这里可以自定义其他 ESLint 规则
  },
};
