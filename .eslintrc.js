module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/']
    }
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Shopify: 'readonly',
    Alpine: 'readonly'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
