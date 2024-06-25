import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import HomeworldSection from "../../components/HomeworldSection.vue";

describe("HomeworldSection.vue", () => {
  it("renders homeworld correctly", () => {
    const homeworld = {
      name: "Tatooine",
      url: "https://swapi.dev/api/planets/1/",
    };
    const title = "Homeworld";

    const wrapper = mount(HomeworldSection, {
      props: { homeworld, title },
    });

    expect(wrapper.html()).toContain("Homeworld");
    expect(wrapper.html()).toContain("Tatooine");
  });
});
