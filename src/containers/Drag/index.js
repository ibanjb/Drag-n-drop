// @flow
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DragItem from '../../components/dragItem';
import './Drag.css';
import Draggable from '../../utils/Draggable';

type Props = {
  items: Object,
};
type State = {
  itemsApplied: Array<Object>,
  itemsInterviewed: Array<Object>,
  itemsHired: Array<Object>,
};

//
// Drag container. Encapsulate all the logic related to drag'n'drop elements
//
class Drag extends React.PureComponent<Props, State> {

  state = {
    itemsApplied: [],
    itemsInterviewed: [],
    itemsHired: [],
  };

  constructor(props) {
    super(props);
    const { items } = this.props;
    this.state = {
        itemsApplied: items.applied,
        itemsInterviewed: items.interviewed,
        itemsHired: items.hired,
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  //
  // onDragEnd event fired by user
  //
  onDragEnd(result: Object) {     
    const { source, destination } = result;
    const { itemsApplied, itemsInterviewed, itemsHired } = this.state;
    const draggable = new Draggable();
    
    // dropped outside the list
    if (destination) {        
      // check movement to another column or not
      let moveResult;
      if (source.droppableId === destination.droppableId) {
        moveResult = draggable.moveInside(result, itemsApplied, itemsInterviewed, itemsHired);
      } else {
        moveResult = draggable.moveOutside(result, itemsApplied, itemsInterviewed, itemsHired);
      }
      this.setState({
        itemsApplied: moveResult.itemsApplied,
        itemsInterviewed: moveResult.itemsInterviewed,
        itemsHired: moveResult.itemsHired,
      });
    } else {
      // moved to same position
      return;
    }
  }
  
  //
  // styles when user is dragging an element
  //
  getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? '#06679a' : '#06679a',
    padding: 8,  
  });

  //
  // styles for each item
  //
  getItemStyle = (isDragging: boolean, draggableStyle: Object) => ({    
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

export default Drag;
