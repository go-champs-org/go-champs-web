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
    'is-danger': canPerfomAction
  });

  return (
    <button {...props} className={classes} ref={ref} onClick={onClickFunction}>
      {props.children}
    </button>
  );
};

export default DoubleClickButton;
