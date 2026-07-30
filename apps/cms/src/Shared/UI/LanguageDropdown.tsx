import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './LanguageDropdown.scss';

const ENGLISH_CODE = 'en';
const PORTUGUESE_CODE = 'pt';

function LanguageDropdown() {
  const { i18n } = useTranslation();
  const onClickToEnglish = () => i18n.changeLanguage(ENGLISH_CODE);
  const onClickToPortuguese = () => i18n.changeLanguage(PORTUGUESE_CODE);

  return (
    <div className="language-dropdown dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button
          className="button is-rounded"
          aria-haspopup="true"
          aria-controls="dropdown-language"
        >
          <span>
            <Trans>language</Trans>
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>

      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={onClickToPortuguese}>
            &#127463;&#127479;
          </div>

          <div className="dropdown-item" onClick={onClickToEnglish}>
            &#127482;&#127480;
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageDropdown;
