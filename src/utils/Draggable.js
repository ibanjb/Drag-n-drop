
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

    setDroppableItemByOrigin(elements, sourceClone, destinationClone, itemsApplied, itemsInterviewed, itemsHired) {
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
      return {
        itemsApplied: applied ? applied : [],
        itemsInterviewed: interviewed ? interviewed : [],
        itemsHired: hired ? hired : [],
      };
    }

    moveInside(elements, itemsApplied, itemsInterviewed, itemsHired) {
      const items = this.getDroppableItemByOrigin(elements.source.droppableId, itemsApplied, itemsInterviewed, itemsHired);
      const removed = items.splice(elements.source.index, 1)[0];
      items.splice(elements.destination.index, 0, removed);
      const itemArray = Array.from(items);
      const result = this.setDroppableItemByOrigin(elements, itemArray, itemsApplied, itemsInterviewed, itemsHired);
      return result;
    }

    moveOutside(elements, itemsApplied, itemsInterviewed, itemsHired) {
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

      const result = this.setDroppableItemByOrigin(elements, sourceClone, destinationClone, itemsApplied, itemsInterviewed, itemsHired);
      return result;
    }
}

export default Draggable;
