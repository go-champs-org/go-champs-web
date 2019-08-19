import React from 'react';

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
  class WithDraggableList extends React.Component<any, any> {
    state: { items: T[] } = { items: [] };
    constructor(props: any) {
      super(props);
      this.state = {
        items: getInitialItems(props)
      };
    }

    render() {
      const moveItem = (dragIndex: number, hoverIndex: number) => {
        const newItems = [...this.state.items];
        const dragPhase = newItems[dragIndex];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, dragPhase);
        this.setState({
          items: newItems
        });
      };

      return (
        <WrappedComponent
          {...this.props}
          moveItem={moveItem}
          sortedItems={this.state.items}
        />
      );
    }
  }

  return WithDraggableList;
};

export default withDraggableList;
