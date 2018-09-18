// @flow
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import User from '../user';
import dragdrop from '../../assets/images/dragdrop.png';
import './DragItem.css';

type Props = {
  items: Array<Object>,
  type: string,
  getListStyle: Function,
  getItemStyle: Function,
};

//
// DragItem component. Encapsulate all the information related to an user
//
class DragItem extends React.PureComponent<Props> {

  //
  // If there isn't any user, we will show a 'stylized' empty box
  //
  renderEmpty() {
    const { type, getListStyle } = this.props;
    return (
      <Droppable droppableId={type}>
        {(outerProvided, outerSnapshot) => (
          <div 
            className="emptyBox"
            ref={outerProvided.innerRef}
            style={getListStyle(outerSnapshot.isDraggingOver)}
          >
            <img src={dragdrop} alt="dragndrop" />
            {outerProvided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  //
  // Display a list of User component inside a draggable envelope
  //
  renderItem() {
    const { type, items, getListStyle, getItemStyle } = this.props;
    return (
      <Droppable droppableId={type}>
        {(outerProvided, outerSnapshot) => (
          <div
            ref={outerProvided.innerRef}
            style={getListStyle(outerSnapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.login.uuid} draggableId={item.login.uuid} index={index}>
                {(innerProvided, innerSnapshot) => (
                  <div
                    ref={innerProvided.innerRef}
                    {...innerProvided.draggableProps}
                    {...innerProvided.dragHandleProps}
                    style={getItemStyle(
                      innerSnapshot.isDragging,
                      innerProvided.draggableProps.style,
                    )}
                  >
                    <User user={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {outerProvided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  //
  // Check if there aren't any users to display or not to choose with render method must be used
  //
  render() {    
    const { items } = this.props;    
    const isEmpty = items.length === 0;
    return (
      <div>
        {isEmpty && (this.renderEmpty())}
        {!isEmpty && (this.renderItem())}
      </div>      
    );
  }
}


export default DragItem;