import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

interface DoubleClickButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const hasTooltipClass = (classes?: string) =>
  classes ? classes.includes('has-tooltip') : false;

const DoubleClickButton: React.FC<DoubleClickButtonProps> = (
  props: DoubleClickButtonProps
) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [canPerfomAction, setCanPerfomAction] = useState(false);

  useEffect(() => {
    const handleDoubleButtonClick = (event: UIEvent) => {
      const isSame = event
        .composedPath()
        .includes(ref.current as HTMLButtonElement);
      if (!isSame) {
        setCanPerfomAction(false);
      }
    };

    document.addEventListener('click', handleDoubleButtonClick);

    return () => {
      document.removeEventListener('click', handleDoubleButtonClick);
    };
  }, []);

  const firstClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setCanPerfomAction(true);
  };

  const onClickFunction = canPerfomAction ? props.onClick : firstClick;

  const classes = classNames(props.className, {
    'is-active': canPerfomAction,
    'is-danger': canPerfomAction,
    'has-tooltip-left': !hasTooltipClass(props.className)
  });

  return (
    <button
      {...props}
      className={classes}
      data-tooltip={canPerfomAction ? 'Double click to confirm' : undefined}
      onClick={onClickFunction}
      ref={ref}
    >
      {props.children}
    </button>
  );
};

export default DoubleClickButton;
