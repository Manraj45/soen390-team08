import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import renderer from "react-test-renderer";
import UserLogs from "../../components/UserLogs/UserLogs";

Enzyme.configure({ adapter: new Adapter() });

describe("UserLogs", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<UserLogs />);
  });

  it("userlogs page should appear", () => {
    console.log(wrapper);
    const data = wrapper.find("#userLogsPage");
    console.log(wrapper);
    expect(data.length).toBe(1);
  });

  it("userlogs render", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<UserLogs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
