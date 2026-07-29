import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialActiveTab?: string;
}

function Tabs({ tabs, initialActiveTab = tabs[0].id }: TabsProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container">
      <div className="tabs is-boxed">
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.id}
              className={activeTab === tab.id ? 'is-active' : ''}
            >
              <a href={`#${tab.id}`} onClick={() => handleTabClick(tab.id)}>
                <span>{tab.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {tabs.map(tab => {
        if (tab.id === activeTab) {
          return (
            <div key={tab.id} className="tab-content">
              {tab.content}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default Tabs;
