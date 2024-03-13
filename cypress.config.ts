/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';
import cctask from '@cypress/code-coverage/task';

export default defineConfig({
  video: false,
  watchForFileChanges: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      cctask(on, config);
      return config;
    },
    baseUrl: 'http://localhost:3000',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
