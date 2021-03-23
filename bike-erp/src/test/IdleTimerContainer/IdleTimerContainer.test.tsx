import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import IdleTimerContainer from "../../components/IdleTimerContainer/IdleTimerContainer";
import store from "../../redux/store";

configure({ adapter: new Adapter() });

// Create mock registration page by injecting redux store
const setUp = () => {
  const testStore = store;
  const wrapper = shallow(<IdleTimerContainer store={testStore} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe("IdleTimerContainer Component test", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = setUp();
  });

  it("render IdleTimerContainer page without crashing", () => {
    const component = wrapper.find("#idleTimerContainer");
    expect(component.length).toBe(1);
  });

  it("match rendered component with snapshot", () => {
    const tree = renderer.create(
      <IdleTimerContainer store={store}></IdleTimerContainer>
    );
    expect(tree).toMatchSnapshot();
  });
});
