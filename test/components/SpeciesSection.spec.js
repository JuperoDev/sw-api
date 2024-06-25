import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SpeciesSection from "../../components/SpeciesSection.vue";

describe("SpeciesSection.vue", () => {
  it("renders species correctly", () => {
    const species = [
      { name: "Human", url: "https://swapi.dev/api/species/1/" },
      { name: "Droid", url: "https://swapi.dev/api/species/2/" },
    ];

    const wrapper = mount(SpeciesSection, {
      global: {
        components: {
          NuxtLink: RouterLinkStub,
        },
      },
      props: { species },
    });

    expect(wrapper.html()).toContain("Human");
    expect(wrapper.html()).toContain("Droid");

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links[0].props().to).toBe("/species/1");
    expect(links[1].props().to).toBe("/species/2");
  });
});
