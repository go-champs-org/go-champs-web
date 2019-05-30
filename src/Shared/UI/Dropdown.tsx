import classNames from 'classnames';
import React, { ReactNode } from 'react';
import './Dropdown.scss';

export const DropdownDivider: React.FC = () => (
  <hr className="dropdown-divider" />
);

export const DropdownItem: React.FC<{ children: ReactNode }> = ({
  children
}) => <span className="dropdown-item">{children}</span>;

interface DropdownProps {
  label: string;
  className?: string;
  children: ReactNode;
}

const initialDropdownState = {
  isActive: false
};

type State = Readonly<typeof initialDropdownState>;

class Dropdown extends React.Component<DropdownProps> {
  private domRef: React.RefObject<HTMLDivElement>;
  readonly state: State = initialDropdownState;

  constructor(props: DropdownProps) {
    super(props);
    this.domRef = React.createRef();
  }

  render() {
    const dropdownClasses = classNames(
      {
        dropdown: true,
        'is-active': this.state.isActive
      },
      this.props.className
    );

    return (
      <div className={dropdownClasses} ref={this.domRef}>
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            onClick={this.toogleIsActive}
          >
            <span>{this.props.label}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">{this.props.children}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('click', this.close);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.close);
  }

  toogleIsActive = (event: any) => {
    event.preventDefault();
    this.setState({ isActive: !this.state.isActive });
  };

  close = (event: any) => {
    if (event && this.domRef.current!.contains(event.target)) {
      return;
    }
    this.setState({ isActive: false });
  };
}

export default Dropdown;
