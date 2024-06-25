import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import StarshipsSection from "../../components/StarshipsSection.vue";

describe("StarshipsSection.vue", () => {
  it("renders starships correctly", () => {
    const starships = [
      { name: "X-wing", url: "https://swapi.dev/api/starships/12/" },
      { name: "TIE Advanced x1", url: "https://swapi.dev/api/starships/22/" },
    ];

    const wrapper = mount(StarshipsSection, {
      global: {
        components: {
          NuxtLink: RouterLinkStub,
        },
      },
      props: { starships },
    });

    expect(wrapper.html()).toContain("X-wing");
    expect(wrapper.html()).toContain("TIE Advanced x1");

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links[0].props().to).toBe("/starships/12");
    expect(links[1].props().to).toBe("/starships/22");
  });
});
