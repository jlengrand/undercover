import createDefaultConfig from '@open-wc/building-rollup/modern-and-legacy-config';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import cpy from 'rollup-plugin-cpy';

const configs = createDefaultConfig({ input: './index.html' });

export default configs.map(config => ({
  ...config,
  plugins: [
    ...config.plugins,
    commonjs(),
    json(),
    cpy({
      // copy over all files
      files: ['src/assets/*'],
      dest: 'dist',
      options: {
        // parents makes sure to preserve the original folder structure
        parents: true,
      },
    }),
  ],
}));
