
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'react' }]
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@components': './components',
            '@styles': './styles',
            '@utils': './utils',
            '@assets': './assets',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
