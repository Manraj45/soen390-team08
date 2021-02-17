import React from 'react'
import RegistrationPage from '../../components/RegistrationPage/RegistrationPage'
import { shallow, configure, mount } from 'enzyme'
import store from '../../redux/store'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() });

const setUp = () => {
    const wrapper = shallow(<RegistrationPage />)
    return wrapper
}

describe('LoginPage Component', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = setUp()
    })

    it("render registration page without crashing", () => {
        const component = wrapper.find('#registrationPage')
        expect(component.length).toBe(1)
    })

    it('match rendered component with snapshot',()=>{
        const tree = renderer.create(<RegistrationPage/>).toJSON();
        expect(tree).toMatchSnapshot()
    })
})