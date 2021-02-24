import React from 'react'
import RegistrationPage from '../../components/RegistrationPage/RegistrationPage'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'

// Enable enzyme testing
configure({ adapter: new Adapter() });

// Create mock registration page by injecting redux store
const setUp = () => {
    const wrapper = shallow(<RegistrationPage />)
    return wrapper
}

describe('LoginPage Component', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = setUp()
    })

    // Search for the html element with an id of "registrationPage". This indicates that the component has rendererd
    it("render registration page without crashing", () => {
        const component = wrapper.find('#registrationPage')
        expect(component.length).toBe(1)
    })

    // Renders the RegistrationPage component and try to match with existing snapshot
    it('match rendered component with snapshot', () => {
        const tree = renderer.create(<RegistrationPage />).toJSON();
        expect(tree).toMatchSnapshot()
    })
})