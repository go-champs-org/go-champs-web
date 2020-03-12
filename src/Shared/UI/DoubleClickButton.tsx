import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

interface DoubleClickButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const DoubleClickButton: React.FC<DoubleClickButtonProps> = (
  props: DoubleClickButtonProps
) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [canPerfomAction, setCanPerfomAction] = useState(false);

  useEffect(() => {
    document.addEventListener('click', (event: UIEvent) => {
      const isSame = event
        .composedPath()
        .includes(ref.current as HTMLButtonElement);
      if (!isSame) {
        setCanPerfomAction(false);
      }
    });
  }, []);

  const firstClick = () => setCanPerfomAction(true);

  const onClickFunction = canPerfomAction ? props.onClick : firstClick;

  const classes = classNames(props.className, {
    'is-active': canPerfomAction,
    'is-danger': canPerfomAction,
    'has-tooltip-left': true
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
