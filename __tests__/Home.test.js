import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../src/containers/Home';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.exists());
  });
});
