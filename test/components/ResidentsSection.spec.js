import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ResidentsSection from "../../components/ResidentsSection.vue";

describe("ResidentsSection.vue", () => {
  it("renders residents correctly", () => {
    const residents = [
      { name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
      { name: "Leia Organa", url: "https://swapi.dev/api/people/5/" },
    ];

    const wrapper = mount(ResidentsSection, {
      global: {
        components: {
          NuxtLink: RouterLinkStub,
        },
      },
      props: { residents },
    });

    expect(wrapper.html()).toContain("Luke Skywalker");
    expect(wrapper.html()).toContain("Leia Organa");

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links[0].props().to).toBe("/people/1");
    expect(links[1].props().to).toBe("/people/5");
  });
});
