
class Draggable  {

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
          // applied will be the default one
          result = itemsApplied;
          break;
      }
      return result;
    }

    setDroppableItemByOrigin(elements, sourceClone, destinationClone) {
      const {
        itemsApplied,
        itemsInterviewed,
        itemsHired
      } = this.state;
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
          // applied will be the default one
          applied = sourceClone;
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
            // applied will be the default one
            applied = destinationClone;
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
      const {
        itemsApplied,
        itemsInterviewed,
        itemsHired
      } = this.state;
      const items = this.getDroppableItemByOrigin(elements.source.droppableId, itemsApplied, itemsInterviewed, itemsHired);
      const removed = items.splice(elements.source.index, 1)[0];
      items.splice(elements.destination.index, 0, removed);
      const itemArray = Array.from(items);
      const result = this.setDroppableItemByOrigin(elements, itemArray, null);
      return result;
    }

    moveOutside(elements) {
      const {
        itemsApplied,
        itemsInterviewed,
        itemsHired
      } = this.state;
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

      const result = this.setDroppableItemByOrigin(elements, sourceClone, destinationClone);
      return result;
    }
}

export default Draggable;
