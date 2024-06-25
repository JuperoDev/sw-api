import { config } from '@vue/test-utils';
 import '@testing-library/jest-dom';

config.global.mocks = {
  $t: (msg) => msg,
};