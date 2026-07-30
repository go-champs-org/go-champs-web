import { TFunction } from 'react-i18next';

export const parseAmount = (amount: string | number): number => {
  if (typeof amount === 'number') return amount;
  return parseFloat(amount) || 0;
};

export const formatCurrency = (amount: number, t: TFunction): string => {
  const currencySymbol = t('currencySymbol');
  return `${currencySymbol} ${amount.toFixed(2)}`;
};
