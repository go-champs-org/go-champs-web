import React from 'react';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import CollapsibleCard from '../Shared/CollapsibleCard';
import girlOnSmartphone from '../../assets/illustrations/girl-on-smartphone.svg';
import { useTranslation } from 'react-i18next';
import './FaqV2.scss';

const FAQ_KEYS = ['faqQ1', 'faqQ2', 'faqQ3', 'faqQ4', 'faqQ5'] as const;

function FaqV2() {
  const { t } = useTranslation();

  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          <div className="page-v2-container">
            <div className="faq-v2-illustration">
              <img src={girlOnSmartphone} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">{t('faq')}</h1>
              <p className="card-v2-subtitle">{t('faqSubtitle')}</p>

              <div className="faq-v2-list">
                {FAQ_KEYS.map(key => (
                  <CollapsibleCard
                    key={key}
                    question={t(`${key}Question`)}
                    answer={t(`${key}Answer`)}
                  />
                ))}
              </div>
            </CardV2>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default FaqV2;
