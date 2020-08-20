import React, { Fragment } from 'react';
import androidSite from '../assets/android-site.png';
import androidMenu from '../assets/android-menu.png';
import iosSite from '../assets/ios-site.png';
import iosMenu from '../assets/ios-menu.png';
import { Trans } from 'react-i18next';

const UseComoApp: React.FC = () => (
  <Fragment>
    <div className="hero is-medium">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            <Trans>useAsAnApp</Trans>
          </h1>
        </div>
      </div>
    </div>

    <div className="hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <ol>
            <li>
              <div className="columns is-vcentered">
                <div className="column is-half">
                  <p className="is-size-4">
                    <Trans>useAsAnAppLine1</Trans>
                  </p>
                </div>

                <div className="column is-half">
                  <div className="columns">
                    <div className="column is-half has-text-centered">
                      <p>Android (Chrome)</p>

                      <img src={androidSite} alt="Android site" />
                    </div>
                    <div className="column is-half has-text-centered">
                      <p>iOS (Safari)</p>

                      <img src={iosSite} alt="iOS site" />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div
                className="columns is-vcentered"
                style={{ paddingTop: '3rem' }}
              >
                <div className="column is-half">
                  <p className="is-size-4">
                    <Trans>useAsAnAppLine2</Trans>
                  </p>
                </div>

                <div className="column is-half">
                  <div className="columns">
                    <div className="column is-half has-text-centered">
                      <p>Menu Android</p>

                      <img
                        src={androidMenu}
                        alt="Android menu"
                        style={{
                          border: '1px solid black',
                          borderRadius: '3px'
                        }}
                      />
                    </div>
                    <div className="column is-half has-text-centered">
                      <p>Menu iOS</p>

                      <img
                        src={iosMenu}
                        alt="iOS site"
                        style={{ height: '150px', width: '210px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="columns" style={{ paddingTop: '3rem' }}>
                <div className="column is-half">
                  <p className="is-size-4">
                    <Trans>useAsAnAppLine3</Trans>
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </Fragment>
);

export default UseComoApp;
