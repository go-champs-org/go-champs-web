import React from 'react';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import EmailFormV2 from '../../Shared/UI/Form/EmailFormV2';
import smartphone from '../../assets/illustrations/smartphone.svg';
import { Trans } from 'react-i18next';
import './ContactV2.scss';

function ContactV2(): React.ReactElement {
  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main contact-v2-page">
          <div className="page-v2-container">
            <div className="contact-v2-illustration">
              <img src={smartphone} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">
                <Trans>contactUs</Trans>
              </h1>
              <p className="card-v2-subtitle is-hidden-mobile">
                <Trans>contactSubtitle</Trans>
              </p>

              <EmailFormV2 />
            </CardV2>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default ContactV2;
