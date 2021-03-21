import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import renderer from "react-test-renderer";
import Inventory from "../../pages/Inventory/inventory";

Enzyme.configure({ adapter: new Adapter() });

describe("Inventory", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<Inventory />);
  });

  it("inventory page should appear", () => {
    console.log(wrapper);
    const data = wrapper.find("#inventoryPageTest");
    console.log(wrapper);
    expect(data.length).toBe(1);
  });

  it("inventory render", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<Inventory />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
