import React from 'react';
import { SportEntity } from './state';
import HighlightedAction from '../Shared/UI/HighlightedAction';
import { useTranslation } from 'react-i18next';

export const LoadingPackage = () => {
  return <div>Loading...</div>;
};

export interface PackageProps {
  sport: SportEntity;
  onClick: (sport: SportEntity) => void;
}

const Package = ({ sport, onClick }: PackageProps) => {
  const { t } = useTranslation();
  const packageTitle = t(`sportsPackages.${sport.slug}.title`, {
    keySeparator: '.'
  });
  const packageDescription = t(`sportsPackages.${sport.slug}.description`, {
    keySeparator: '.'
  });

  return (
    <HighlightedAction
      title={packageTitle}
      description={packageDescription}
      onClick={() => onClick(sport)}
    />
  );
};

export default Package;
