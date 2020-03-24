module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 6,
    project: 'tsconfig.json'
  },
  rules: {
    'no-param-reassign': 0
  }
};
