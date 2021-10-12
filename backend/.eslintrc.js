module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-else-return': 'off',
    'arrow-body-style': 'off',
    'no-unused-vars': 'off',
    'prefer-arrow-callback': 'off',
  },
};
