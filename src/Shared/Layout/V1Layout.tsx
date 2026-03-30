import React from 'react';
import NavTopToolbar from '../UI/NavTopToolbar';
import LanguageDropdown from '../UI/LanguageDropdown';
import { REACT_APP_BUILD_NUMBER } from '../env';
import { useTranslation } from 'react-i18next';

interface V1LayoutProps {
  children: React.ReactNode;
}

const V1Layout: React.FC<V1LayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <>
      <NavTopToolbar />

      <main className="hero is-fullheight-with-navbar">
        <section className="section">
          <div className="container">{children}</div>
        </section>

        <div className="hero-foot">
          <footer className="footer">
            <div className="content has-text-centered">
              <div>
                <LanguageDropdown />
              </div>

              <p>
                <strong className="has-text-primary">Go Champs</strong>
                <span>{`, ${t('with')} 💚 `}</span>
                <span>
                  {`${t('byGoChampsTeam')}. ${t('theSourceCodeIsLicensed')} `}
                </span>
                <a
                  href="https://github.com/lairjr/go-champs-web/blob/master/LICENSE"
                  className="has-text-primary"
                >
                  MIT
                </a>
                <span>{`. ${t('theWebsiteContentIsLicensed')} `}</span>
                <a
                  href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                  className="has-text-primary"
                >
                  CC BY NC SA 4.0
                </a>
                .
              </p>

              <p>
                {t('copyright')} &copy; {new Date().getFullYear()}{' '}
                <a href="https://gochamps.com" className="has-text-primary">
                  Go Champs Tecnologia LTDA
                </a>
                {` ${t('andContributors')}. ${t('allRightsReserved')}.`}
              </p>

              <p>
                Build: <em>0.0.{REACT_APP_BUILD_NUMBER}</em>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
};

export default V1Layout;
