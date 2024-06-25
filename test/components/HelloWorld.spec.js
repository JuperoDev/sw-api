// test/components/HelloWorld.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HelloWorld from '../../components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders the message', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        message: 'Hello, Vitest!',
      },
    });
    expect(wrapper.text()).toContain('Hello, Vitest!');
  });
});
