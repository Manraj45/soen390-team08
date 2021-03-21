import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import UserLogs from "../../pages/UserLogs/UserLogs";

/*Frontend test for user logs page*/

Enzyme.configure({ adapter: new Adapter() });

describe("UserLogs", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<UserLogs />);
  });

  // checks that user log page appears
  it("userlogs page should appear", () => {
    const data = wrapper.find("#userLogsPage");
    console.log(wrapper);
    expect(data.length).toBe(1);
  });

  it("userlogs render", () => {
    expect(wrapper.exists()).toBe(true);
  });

  // checks that user log page matches snapshot
  it("matches the snapshot", () => {
    const tree = renderer.create(<UserLogs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
