import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';
import Home from '../containers/Home';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists());
  });
  it("renders logo image", () => {
    const logo = shallow(<App />);
    expect(logo.find("img").prop("src")).toEqual('logo.png');
  });
  it("renders <Home /> component", () => {
    const wrapper = shallow(<App />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find(<Home />).exists);
    });
  }); 
});
