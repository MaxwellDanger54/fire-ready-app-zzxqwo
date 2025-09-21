
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional asset extensions
config.resolver.assetExts.push(
  'db',
  'bin',
  'txt',
  'jpg',
  'png',
  'webp',
  'gif',
  'jpeg',
  'svg'
);

// Ensure proper handling of TypeScript files
config.resolver.sourceExts.push('tsx', 'ts', 'jsx', 'js', 'json');

// Configure transformer for better performance
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Ensure proper autolinking
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
