import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const useFilteredItemsByDate = <T extends { [key: string]: any }>(
  items: T[],
  propertyName: string
) => {
  const [stateItems, setStateItems] = useState(items);

  useEffect(() => {
    setStateItems(items);

    return () => undefined;
  }, [items]);

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const filterValue = urlSearch.get(propertyName);

  const filteredItems = filterValue
    ? stateItems.filter((item: T) => {
        return item.hasOwnProperty(propertyName)
          ? item[propertyName]
              .toLocaleLowerCase()
              .indexOf(filterValue.toLocaleLowerCase()) >= 0
          : true;
      })
    : stateItems;

  const history = useHistory();

  const onFilterValueChange = (value: string) => {
    const urlSearch = new URLSearchParams(location.search);
    if (value) {
      urlSearch.set(propertyName, value);
    } else {
      urlSearch.delete(propertyName);
    }
    history.push({
      search: urlSearch.toString()
    });
  };

  return {
    items: filteredItems,
    filterValue: filterValue,
    onFilterValueChange
  };
};

export default useFilteredItemsByDate;
