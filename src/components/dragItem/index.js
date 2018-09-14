import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import User from '../user';

class DragItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
}

DragItem.propTypes  = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  getListStyle: PropTypes.func.isRequired,
  getItemStyle: PropTypes.func.isRequired,
}

export default DragItem;