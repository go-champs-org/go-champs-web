import React from 'react';
import classNames from 'classnames';

interface LoadingButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = (
  props: LoadingButtonProps
) => {
  const { isLoading, ...rest } = props;
  const classes = classNames(props.className, {
    'is-loading': isLoading
  });

  return (
    <button {...rest} className={classes}>
      {rest.children}
    </button>
  );
};

export default LoadingButton;
