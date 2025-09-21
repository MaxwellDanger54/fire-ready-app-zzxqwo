
module.exports = {
  extends: [
    'expo',
    '@react-native-community',
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  rules: {
    // Disable some rules that might cause issues during development
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'off', // Allow inline styles for now
    'react-native/no-color-literals': 'off', // Allow color literals
    'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
    'no-console': 'off', // Allow console.log for debugging
  },
  env: {
    'react-native/react-native': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
