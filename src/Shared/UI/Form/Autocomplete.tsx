import React from 'react';
import { FieldRenderProps } from 'react-final-form';

export interface AutocompleteOptions {
  text: string;
  value: object | string;
}

export interface AutocompleteProps
  extends FieldRenderProps<string, HTMLInputElement> {
  id: string;
  options: AutocompleteOptions[];
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  id,
  input,
  options
}) => {
  const [query, setQuery] = React.useState('');
  const [matches, setMatches] = React.useState<AutocompleteOptions[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleSelection = (
    event: React.MouseEvent,
    match: AutocompleteOptions
  ) => {
    event.preventDefault();
    input.onChange(match.value);
    setQuery(match.text);
    setMatches([]);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setActiveIndex(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      setActiveIndex(activeIndex - 1);
    } else if (event.key === 'Enter') {
      const match = matches[activeIndex];
      if (match) {
        input.onChange(match.value);
        setQuery(match.text);
        setMatches([]);
      }
    }
  };

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    input.onChange(query);
    setQuery(query);
    setMatches(
      options.filter(option =>
        option.text.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const matchOption = options.find(option => option.text === query);

    if (matchOption) {
      input.onChange(matchOption.value);
      setQuery(matchOption.text);
    }
  };

  return (
    <div className={`dropdown ${matches.length > 0 ? 'is-active' : ''}`}>
      <div className="dropdown-trigger">
        <input
          id={id}
          type="text"
          className="input"
          name={input.name}
          value={query}
          onChange={updateQuery}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          placeholder={input.placeholder}
        />
      </div>
      <div className="dropdown-menu">
        {matches.length > 0 && (
          <div className="dropdown-content">
            {matches.map((match, index) => (
              <a
                className={`dropdown-item ${
                  index === activeIndex ? 'is-active' : ''
                }`}
                href="/"
                key={match.text}
                onClick={event => handleSelection(event, match)}
              >
                {match.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
