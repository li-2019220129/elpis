module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:import/errors',
        'plugin:import/warnings',
        'prettier', // 添加这一行以禁用可能与Prettier冲突的ESLint规则
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'vue',
        'import',
        'prettier', // 添加prettier插件
    ],
    rules: {
        // 'linebreak-style': ['error', 'windows'], // 移除这一行
        'no-console': 'off',
        'no-unused-vars': 'warn',
        'import/no-unresolved': 'off',
        'prettier/prettier': 'error',
        'vue/multi-word-component-names': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.vue'],
            },
        },
    },
};
