import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FilmSection from '../../components/FilmSection.vue';

describe('FilmSection.vue', () => {
  it('renders films correctly', async () => {
    const films = [
      { title: 'A New Hope', url: 'https://swapi.dev/api/films/1/' },
      { title: 'The Empire Strikes Back', url: 'https://swapi.dev/api/films/2/' },
    ];

    const wrapper = mount(FilmSection, {
      global: {
        components: {
          NuxtLink: RouterLinkStub
        }
      },
      props: {
        films,
      },
    });

    // Check that the titles are rendered
    expect(wrapper.html()).toContain('A New Hope');
    expect(wrapper.html()).toContain('The Empire Strikes Back');

    // Check that the links are generated correctly
    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links[0].props().to).toBe('/films/1');
    expect(links[1].props().to).toBe('/films/2');
  });
});
