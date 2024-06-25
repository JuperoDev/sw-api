import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import VehiclesSection from "../../components/VehiclesSection.vue";

describe("VehiclesSection.vue", () => {
  it("renders vehicles correctly", () => {
    const vehicles = [
      { name: "Snowspeeder", url: "https://swapi.dev/api/vehicles/14/" },
      {
        name: "Imperial Speeder Bike",
        url: "https://swapi.dev/api/vehicles/30/",
      },
    ];

    const wrapper = mount(VehiclesSection, {
      global: {
        components: {
          NuxtLink: RouterLinkStub,
        },
      },
      props: { vehicles },
    });

    expect(wrapper.html()).toContain("Snowspeeder");
    expect(wrapper.html()).toContain("Imperial Speeder Bike");

    const links = wrapper.findAllComponents(RouterLinkStub);
    expect(links.length).toBe(2);
    expect(links[0].props().to).toBe("/vehicles/14");
    expect(links[1].props().to).toBe("/vehicles/30");
  });
});
