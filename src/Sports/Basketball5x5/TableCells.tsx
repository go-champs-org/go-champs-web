import React from 'react';

export function PercetualCell({
  value
}: {
  value: string;
}): React.ReactElement {
  if (!value) {
    return <>-</>;
  }
  const number = Number(value);
  if (isNaN(number)) {
    return <>-</>;
  }
  return <>{number.toFixed(0)}%</>;
}

export function RateCell({ value }: { value: string }): React.ReactElement {
  if (!value) {
    return <>-</>;
  }
  const number = Number(value);
  if (isNaN(number)) {
    return <>-</>;
  }
  return <>{number.toFixed(1)}</>;
}

export function ValueOrEmptyCell({
  value
}: {
  value: string;
}): React.ReactElement {
  return <>{value || '-'}</>;
}
