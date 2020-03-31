import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const useFilteredItemsByString = <T extends { [key: string]: any }>(
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
  const searchTerm = urlSearch.get(propertyName);

  const filteredItems = searchTerm
    ? stateItems.filter((item: T) => {
        return item.hasOwnProperty(propertyName)
          ? item[propertyName]
              .toLocaleLowerCase()
              .indexOf(searchTerm.toLocaleLowerCase()) >= 0
          : true;
      })
    : stateItems;

  const history = useHistory();
  const onPropertyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const urlSearch = new URLSearchParams(location.search);
    if (event.target.value) {
      urlSearch.set(propertyName, event.target.value);
    } else {
      urlSearch.delete(propertyName);
    }
    history.push({
      search: urlSearch.toString()
    });
    event.preventDefault();
  };

  return {
    items: filteredItems,
    onPropertyNameChange
  };
};

export default useFilteredItemsByString;
