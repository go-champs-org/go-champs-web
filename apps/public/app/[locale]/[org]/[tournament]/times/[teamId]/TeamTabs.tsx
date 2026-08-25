'use client';

import { useEffect, useState, type ReactNode } from 'react';

export interface TeamTab {
  // Stable across locales, because it is also the url hash: the CMS team view
  // already hands out #roster / #games links.
  id: string;
  label: string;
  panel: ReactNode;
}

interface TeamTabsProps {
  tabs: TeamTab[];
  label: string;
}

// Pill controls, the same shape the CMS athlete and official profiles give
// their buttons. The active pill is painted with --color-primary, which is the
// light green on a light page and the darker one on a dark page: dark text on
// it clears contrast in both themes, which white text on the darker green
// would not.
const TAB_CLASS =
  'cursor-pointer rounded-full px-4 py-1.5 text-sm transition-colors';

const tabClass = (isActive: boolean): string =>
  isActive
    ? `${TAB_CLASS} bg-primary font-semibold text-neutral-900`
    : `${TAB_CLASS} text-muted hover:text-foreground`;

const hashTabId = (tabs: TeamTab[]): string | undefined => {
  const id = window.location.hash.replace('#', '');

  return tabs.find(tab => tab.id === id)?.id;
};

export function TeamTabs({ tabs, label }: TeamTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  // A single section has nothing to switch between: it renders as the page it
  // was before the tabs, with no tab bar and nothing hidden.
  const isTabbed = tabs.length > 1;

  // The hash only exists on the client, so the server renders the first tab
  // and a deep link corrects it after mount.
  useEffect(() => {
    const id = hashTabId(tabs);

    if (id) setActiveId(id);
  }, [tabs]);

  const selectTab = (id: string) => {
    setActiveId(id);
    // replaceState rather than assigning location.hash: the tab stays
    // shareable without pushing a history entry the back button has to walk
    // through, and without the browser scrolling the panel into view.
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {isTabbed && (
        <div
          role="tablist"
          aria-label={label}
          className="slide-fade-in slide-fade-in-delay-1 flex w-fit gap-1 rounded-full border border-border bg-surface p-1"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={tab.id === activeId}
              aria-controls={`panel-${tab.id}`}
              onClick={() => selectTab(tab.id)}
              className={tabClass(tab.id === activeId)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Every panel is rendered, hidden or not: the roster and the schedule
          both belong in the HTML a crawler reads. */}
      {tabs.map(tab => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={isTabbed && tab.id !== activeId}
          className="slide-fade-in slide-fade-in-delay-2 flex flex-col gap-6"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
