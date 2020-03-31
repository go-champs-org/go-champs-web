import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

type OnMoveType = (
  index: number
) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface UseSortedItemsData<T> {
  items: T[];
  onMoveDown: OnMoveType;
  onMoveUp: OnMoveType;
  shouldDisplaySortButtons: boolean;
  toogleShouldDisplaySortButtons: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const useSortedItems = <T>(items: T[]): UseSortedItemsData<T> => {
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

  const [shouldDisplaySortButtons, setShouldDisplaySortButtons] = useState(
    false
  );

  const history = useHistory();
  const toogleShouldDisplaySortButtons = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    history.push({
      search: ''
    });
    setShouldDisplaySortButtons(!shouldDisplaySortButtons);
  };

  return {
    items: stateItems,
    onMoveDown,
    onMoveUp,
    shouldDisplaySortButtons,
    toogleShouldDisplaySortButtons
  };
};

export default useSortedItems;
