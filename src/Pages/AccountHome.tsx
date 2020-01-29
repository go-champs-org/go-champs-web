import React from 'react';

const AccountHome: React.FC = () => {
  return (
    <div>
      <div className="columns is-multiline">
        <header className="column is-12">My account</header>

        <div className="column is-8">
          <h2 className="title">Organizations</h2>
        </div>

        <div className="column is-4">
          <aside className="menu">
            <p className="menu-label">General</p>

            <ul className="menu-list">
              <li>
                <a href="/OrganizationsList">Organizations</a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AccountHome;
