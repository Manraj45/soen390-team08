import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BrowserRouter } from "react-router-dom";

import renderer from "react-test-renderer";
import OrderBike from "../../pages/OrderService/OrderBike/OrderBike";
import store from "../../redux/store";

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    const testStore = store;
    const wrapper = shallow(<OrderBike store={testStore} />)
        .childAt(0)
        .dive();
    return wrapper;
};

//snapshot and shallow testing of the orderBike page
describe("Order Bike", () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = setup();
    });

    it("bike Order Page render", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("match rendered component with snapshot", () => {
        const tree = renderer.create(
            <BrowserRouter>
                <OrderBike store={store} />
            ).toJSON();
          </BrowserRouter>
        );
        expect(tree).toMatchSnapshot();
    });

});
