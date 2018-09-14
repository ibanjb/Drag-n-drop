import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import DragItem from '../../components/dragItem';
import './Drag.css';

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
    this.moveInside = this.moveInside.bind(this);
    this.moveOutside = this.moveOutside.bind(this);
    this.getListStyle = this.getListStyle.bind(this);
    this.getItemStyle = this.getItemStyle.bind(this);
    this.getDroppableItemByOrigin = this.getDroppableItemByOrigin.bind(this);
    this.setDroppableItemByOrigin = this.setDroppableItemByOrigin.bind(this);
  }
  
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

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,  
  });

  getItemStyle = (isDragging, draggableStyle) => ({    
    userSelect: 'none',
    padding: 16,
    margin: `0 0 8px 0`,
    background: isDragging ? '#fff' : '#06679a',
    ...draggableStyle,
  });

  getDroppableItemByOrigin(origin, itemsApplied, itemsInterviewed, itemsHired) {
    let result;
    switch (origin) {
      case 'applied':
        result = itemsApplied;
        break;
      case 'interviewed':
        result = itemsInterviewed;
        break;
      case 'hired':
        result = itemsHired;
        break;
      default:
        console.log('origin not found');
        break;
    }
    return result;
  }

  setDroppableItemByOrigin(elements, sourceClone, destinationClone) {
    const { itemsApplied, itemsInterviewed, itemsHired } = this.state;
    let applied = itemsApplied;
    let interviewed = itemsInterviewed;
    let hired = itemsHired;
    switch (elements.source.droppableId) {
      case 'applied':
        applied = sourceClone;
        break;
      case 'interviewed':
        interviewed = sourceClone;
        break;
      case 'hired':
        hired = sourceClone;
        break;
      default:
        console.log('source not found');
        break;
    }
    if (destinationClone) {
      switch (elements.destination.droppableId) {
        case 'applied':
          applied = destinationClone;
          break;
        case 'interviewed':
          interviewed = destinationClone;
          break;
        case 'hired':
          hired = destinationClone;
          break;
        default:
          console.log('destination not found');
          break;
        }
    }
    this.setState({
        itemsApplied: applied,
        itemsInterviewed: interviewed,
        itemsHired: hired,
    });
  }

  moveInside(elements) {
    const { itemsApplied, itemsInterviewed, itemsHired } = this.state;
    const items = this.getDroppableItemByOrigin(elements.source.droppableId, itemsApplied, itemsInterviewed, itemsHired);
    const removed = items.splice(elements.source.index, 1)[0];
    items.splice(elements.destination.index, 0, removed);
    const result = Array.from(items);
    this.setDroppableItemByOrigin(elements, result, null);
  }

  moveOutside(elements) {
    const { itemsApplied, itemsInterviewed, itemsHired } = this.state;
    const sourceItems = this.getDroppableItemByOrigin(elements.source.droppableId, itemsApplied, itemsInterviewed, itemsHired);
    const destinationItems = this.getDroppableItemByOrigin(elements.destination.droppableId, itemsApplied, itemsInterviewed, itemsHired);    
    
    const sourceClone = Array.from(sourceItems);
    let destinationClone = Array.from(destinationItems);
    const removed = sourceClone.splice(elements.source.index, 1)[0];

    if (destinationClone.length === 0) {
        destinationClone = [];
        destinationClone.push(removed);
    } else {
        destinationClone.splice(elements.destination.index, 0, removed);
    }       

    this.setDroppableItemByOrigin(elements, sourceClone, destinationClone);
}

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

Drag.propTypes  = {
  items: PropTypes.object.isRequired,
}

export default Drag;
