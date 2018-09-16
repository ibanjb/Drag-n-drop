import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import DragItem from '../../components/dragItem';
import './Drag.css';
import Draggable from '../../utils/Draggable';

//
// Drag container. Encapsulate all the logic related to drag'n'drop elements
//
class Drag extends React.Component {

  constructor(props) {
    super(props);
    const { items } = this.props;
    this.state = {
        itemsApplied: items.applied,
        itemsInterviewed: items.interviewed,
        itemsHired: items.hired,
    }    
    this.onDragEnd = this.onDragEnd.bind(this);    
    this.getListStyle = this.getListStyle.bind(this);
    this.getItemStyle = this.getItemStyle.bind(this);

    this.draggable = new Draggable();
    this.moveInside = this.draggable.moveInside.bind(this);
    this.moveOutside = this.draggable.moveOutside.bind(this);
    this.getDroppableItemByOrigin = this.draggable.getDroppableItemByOrigin.bind(this);
    this.setDroppableItemByOrigin = this.draggable.setDroppableItemByOrigin.bind(this);
  }
  
  //
  // onDragEnd event fired by user
  //
  onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
        return;
    }
    // check movement to another column or not
    if (source.droppableId === destination.droppableId) {
      this.moveInside(result);
    } else {
      this.moveOutside(result);
    }
  }  

  //
  // styles when user is dragging an element
  //
  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#06679a' : '#06679a',
    padding: 8,  
  });

  //
  // styles for each item
  //
  getItemStyle = (isDragging, draggableStyle) => ({    
    userSelect: 'none',
    padding: 16,
    margin: '0 0 8px 0',
    border: '1px solid #aabbcc',
    background: isDragging ? '#ffffff' : '#ffffff',
    ...draggableStyle,
  });

  //
  // render three DragItem components, one for each type of users (applied, interviewed and/or hired)
  //
  render() {    
    const { itemsApplied, itemsInterviewed, itemsHired } = this.state;
    return (
      <div className="container">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="column">
            <h2>Applied</h2>
            <DragItem type='applied' items={itemsApplied} getItemStyle={this.getItemStyle} getListStyle={this.getListStyle} />
          </div>
          <div className="column">
            <h2>Interviewed</h2>
            <DragItem type='interviewed' items={itemsInterviewed} getItemStyle={this.getItemStyle} getListStyle={this.getListStyle} />
          </div>
          <div className="column">
            <h2>Hired</h2>
            <DragItem type='hired' items={itemsHired} getItemStyle={this.getItemStyle} getListStyle={this.getListStyle} />
          </div>
        </DragDropContext>
      </div>
    );
  }
}

//
// items is an object with three colections inside: applied, interviewed and hired
//
Drag.propTypes  = {
  items: PropTypes.object.isRequired,
}

export default Drag;
