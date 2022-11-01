import { defineConfig } from '@modern-js/module-tools';

// https://modernjs.dev/docs/apis/module/config
export default defineConfig({
  output: {
    buildConfig: {
      buildType: 'bundle',
      sourceMap: false,
      bundleOptions: {
        skipDeps: false,
      },
    },
  },
});
