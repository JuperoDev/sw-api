import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CharactersSection from '../../components/CharactersSection.vue';

describe('CharactersSection.vue', () => {
  it('renders characters correctly', () => {
    const characters = [
      { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
    ];

    const wrapper = mount(CharactersSection, {
      global: {
        components: {
          NuxtLink: RouterLinkStub
        }
      },
      props: { characters }
    });

    expect(wrapper.html()).toContain('Luke Skywalker');
    expect(wrapper.html()).toContain('Darth Vader');

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links[0].props().to).toBe('/people/1');
    expect(links[1].props().to).toBe('/people/4');
  });
});
