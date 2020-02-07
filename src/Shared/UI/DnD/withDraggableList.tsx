import React, { useState } from 'react';

export interface WrapperProps<P, T> {
  mapPropsToInitialItems: (props: P) => T[];
}

export interface DraggableListProps<T> {
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  sortedItems: T[];
}

const withDraggableList = <P, T>(mapPropsToInitialItems: (props: P) => T[]) => (
  WrappedComponent: React.ComponentType<P & DraggableListProps<T>>
) => {
  const WithDraggableList: React.FC<P> = (props: P) => {
    console.log('aqui', props);
    const [items, setItems] = useState(mapPropsToInitialItems(props));

    const moveItem = (dragIndex: number, hoverIndex: number) => {
      const newItems = [...items];
      const dragPhase = newItems[dragIndex];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragPhase);
      setItems(newItems);
    };

    return (
      <WrappedComponent {...props} moveItem={moveItem} sortedItems={items} />
    );
  };

  return WithDraggableList;
};

export default withDraggableList;
