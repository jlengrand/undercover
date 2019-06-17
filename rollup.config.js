import createDefaultConfig from '@open-wc/building-rollup/modern-and-legacy-config';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';

const configs = createDefaultConfig({ input: './index.html' });

export default configs.map(config => ({
  ...config,
  plugins: [...config.plugins, commonjs(), json()],
}));
