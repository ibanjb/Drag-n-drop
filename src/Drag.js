import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//
// using react-beatififul-dnd module to provide drag'n'drop functionallity
//
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? '#fff' : '#06679a',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,  
});

export default class Drag extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    this.setState({
      items,
    });
  }

  render() {
    return (      
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">            
        {(provided, snapshot) => (            
            <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            >
            {this.state.items.map((item, index) => (
                <Draggable key={item.login.uuid} draggableId={item.login.uuid} index={index}>
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    >
                      <img src={item.picture.thumbnail} alt={item.name.last} />
                      <p>{item.first} {item.last}</p>
                      {item.email}
                    </div>
                )}
                </Draggable>
            ))}
            {provided.placeholder}
            </div>
        )}
        </Droppable>
      </DragDropContext>
    );
  }
}
