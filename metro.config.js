
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional asset extensions
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db',
  // Add other asset extensions if needed
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

module.exports = config;
