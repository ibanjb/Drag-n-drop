import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import User from '..'

Enzyme.configure({ adapter: new Adapter() });

describe('<User />', () => {
  it('renders with items', () => {
    const user = {
      name: {
        first: 'John',
        last: 'Smith',
        email: 'john.smith@gmail.com',
      },
      picture: {
        thumbnail: '',
      }
    };
    const wrapper = shallow(<User user={user} />);
    expect(wrapper.exists());
  });  
});
