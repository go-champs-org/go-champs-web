import React from 'react';
import { SportEntity } from './state';
import HighlightedAction from '../Shared/UI/HighlightedAction';
import { useTranslation } from 'react-i18next';
import Shimmer from '../Shared/UI/Shimmer';

const LoadingPackage = () => {
  return (
    <div style={{ paddingRight: '10px' }}>
      <Shimmer>
        <div
          style={{
            height: '50px',
            marginTop: '0',
            width: '200px'
          }}
        ></div>
      </Shimmer>
    </div>
  );
};

export const LoadingPackages = () => {
  return (
    <>
      <LoadingPackage />
      <LoadingPackage />
      <LoadingPackage />
    </>
  );
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
