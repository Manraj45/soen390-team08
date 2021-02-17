import React from 'react'
import LoginPage from '../../components/LoginPage/LoginPage'
import { shallow, configure } from 'enzyme'
import store from '../../redux/store'
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
configure({ adapter: new Adapter() });

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
        const component = wrapper.find('#loginPage')
        expect(component.length).toBe(1)
    })

    it('match rendered component with snapshot',()=>{
        const tree = renderer.create(
        <BrowserRouter>
            <LoginPage store={store}/>).toJSON();
        </BrowserRouter>)
        expect(tree).toMatchSnapshot()
    })
    
})

