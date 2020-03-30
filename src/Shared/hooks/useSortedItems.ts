import { useState, useEffect } from 'react';

type OnMoveType = (
  index: number
) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

const useSortedItems = <T>(items: T[]): [T[], OnMoveType, OnMoveType] => {
  const [stateItems, setStateItems] = useState(items);

  useEffect(() => {
    setStateItems(items);

    return () => undefined;
  }, [items]);

  const onMoveDown: OnMoveType = (index: number) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (index === stateItems.length - 1) {
      return;
    }
    const newStateItems = [...stateItems];
    newStateItems[index] = stateItems[index + 1];
    newStateItems[index + 1] = stateItems[index];
    setStateItems(newStateItems);
  };

  const onMoveUp: OnMoveType = (index: number) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (index === 0) {
      return;
    }
    const newStateItems = [...stateItems];
    newStateItems[index] = stateItems[index - 1];
    newStateItems[index - 1] = stateItems[index];
    setStateItems(newStateItems);
  };

  return [stateItems, onMoveUp, onMoveDown];
};

export default useSortedItems;
