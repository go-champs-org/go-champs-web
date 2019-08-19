import React, { useState } from 'react';

export interface WrapperProps<T> {
  getInitialItems: (props: any) => T[];
}

export interface DraggableListProps<T> {
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  sortedItems: T[];
}

export const withDraggableList = <T extends {}>({
  getInitialItems
}: WrapperProps<T>) => (
  WrappedComponent: React.ComponentType<any & DraggableListProps<T>>
) => {
  const WithDraggableList: React.FC<any> = props => {
    const [items, setItems] = useState(getInitialItems(props));

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
