import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PlanetsSection from "../../components/PlanetsSection.vue";

describe("PlanetsSection.vue", () => {
  it("renders planets correctly", () => {
    const planets = [
      { name: "Tatooine", url: "https://swapi.dev/api/planets/1/" },
      { name: "Alderaan", url: "https://swapi.dev/api/planets/2/" },
    ];

    const wrapper = mount(PlanetsSection, {
      global: {
        components: {
          NuxtLink: RouterLinkStub,
        },
      },
      props: { planets },
    });

    expect(wrapper.html()).toContain("Tatooine");
    expect(wrapper.html()).toContain("Alderaan");

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links[0].props().to).toBe("/planets/1");
    expect(links[1].props().to).toBe("/planets/2");
  });
});
