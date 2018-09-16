import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Drag from '..'

Enzyme.configure({ adapter: new Adapter() });

describe('<Drag />', () => {
  it('renders with items', () => {
    const items = {
      applied: [],
      interviewed: [],
      hired: [],
    };
    const wrapper = shallow(<Drag items={items} />);
    expect(wrapper.exists());
  });  
});
