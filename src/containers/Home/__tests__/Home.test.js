import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '..'

Enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {
  it('renders with mock implementation', () => {    
    const wrapper = shallow(<Home />);
    expect(wrapper.exists());
  });
});

