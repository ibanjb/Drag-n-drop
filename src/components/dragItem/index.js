import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import User from '../user';
import dragdrop from '../../assets/images/dragdrop.png';
import './DragItem.css';

class DragItem extends React.Component {

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

  render() {    
    const { items } = this.props;
    let isEmpty = true;
    if (items.length > 0) {
      isEmpty = false;
    }
    return (
      <div>
        {isEmpty && (this.renderEmpty())}
        {!isEmpty && (this.renderItem())}
      </div>      
    );
  }
}

DragItem.propTypes  = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  getListStyle: PropTypes.func.isRequired,
  getItemStyle: PropTypes.func.isRequired,
}

export default DragItem;