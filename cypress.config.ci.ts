/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';
import config from './cypress.config';

export default defineConfig({
  ...config,
  defaultCommandTimeout: 10000,
});
