import createDefaultConfig from '@open-wc/building-rollup/modern-config';
import json from 'rollup-plugin-json';

const config = createDefaultConfig({ input: './index.html' });

export default {
  ...config,
  output: {
    ...config.output,
    sourcemap: false,
  },
  plugins: [...config.plugins, json()],
};
