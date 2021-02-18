import React from 'react'
import LoginPage from '../../components/LoginPage/LoginPage'
import { shallow, configure } from 'enzyme'
import store from '../../redux/store'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom';

// Enable Enzyme testing
configure({ adapter: new Adapter() });

// Create mock login page by injecting redux store
const setUp = () => {
    const testStore = store
    const wrapper = shallow(<LoginPage store={testStore} />).childAt(0).dive()
    return wrapper
}

describe('LoginPage Component Test', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = setUp()
    })

    it("render login page without crashing", () => {
        // Search for the html element with an id of "loginPage". This indicates that the component has rendererd
        const component = wrapper.find('#loginPage')
        // Since their is only 1 html element with id = login page, expect to find 1
        expect(component.length).toBe(1)
    })

    // Renders the LoginPage component and try to match with existing snapshot
    it('match rendered component with snapshot', () => {
        const tree = renderer.create(
            <BrowserRouter>
                <LoginPage store={store} />).toJSON();
            </BrowserRouter>)
        expect(tree).toMatchSnapshot()
    })

})

