import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PilotsSection from "../../components/PilotsSection.vue";

describe("PilotsSection.vue", () => {
  it("renders pilots correctly", () => {
    const pilots = [
      { name: "Han Solo", url: "https://swapi.dev/api/people/14/" },
      { name: "Chewbacca", url: "https://swapi.dev/api/people/13/" },
    ];

    const wrapper = mount(PilotsSection, {
      global: {
        components: {
          NuxtLink: RouterLinkStub,
        },
      },
      props: { pilots },
    });

    expect(wrapper.html()).toContain("Han Solo");
    expect(wrapper.html()).toContain("Chewbacca");

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links[0].props().to).toBe("/people/14");
    expect(links[1].props().to).toBe("/people/13");
  });
});
