/* eslint-disable import-x/no-extraneous-dependencies */
import { defineConfig } from 'cypress';
import config from './cypress.config.js';

export default defineConfig({
  ...config,
  defaultCommandTimeout: 10000,
});
