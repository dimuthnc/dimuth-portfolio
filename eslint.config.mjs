import eslintPluginNext from 'eslint-config-next'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...eslintPluginNext,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
