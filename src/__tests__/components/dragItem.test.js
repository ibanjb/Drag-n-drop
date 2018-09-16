import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DragItem from '../../components/dragItem'

Enzyme.configure({ adapter: new Adapter() });

describe('<DragItem />', () => {
  it('renders with items', () => {
    const type = 'arrived'
    const items = [];
    const mockGetListStyle = jest.fn();
    const mockGetItemStyle = jest.fn();
    const wrapper = shallow(<DragItem type={type} items={items} getListStyle={mockGetListStyle} getItemStyle={mockGetItemStyle} />);
    expect(wrapper.exists());
  });  
});
