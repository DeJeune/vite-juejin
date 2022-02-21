module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['plugin:vue/vue3-recommended', 'prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    plugins: ['vue', 'html', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'off',
        'comma-dangle': [2, 'never'] //禁止使用拖尾逗号
    }
};
