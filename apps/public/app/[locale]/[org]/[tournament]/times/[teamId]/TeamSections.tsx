'use client';

import { useEffect, useState, type ReactNode } from 'react';

export interface TeamTab {
  // Stable across locales, because it is also the url hash: the CMS team view
  // already hands out #roster / #games links.
  id: string;
  label: string;
  panel: ReactNode;
}

interface TeamSectionsProps {
  identity: ReactNode;
  tabs: TeamTab[];
  label: string;
}

// The banner is a fixed piece of dark brand artwork, the same one the CMS
// athlete profile carries (apps/cms/src/AthleteProfiles/Banner.scss). Its
// colors are literal on purpose: the theme tokens flip with the page, and this
// card stays dark green in both.
const BANNER_CLASS =
  'slide-fade-in relative overflow-hidden rounded-2xl bg-[linear-gradient(115deg,#2f4419_0%,#4d6b2c_55%,#7a9949_130%)] p-5 text-neutral-100 md:px-8 md:py-6';

const TAB_CLASS =
  'cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-colors';

const tabClass = (isActive: boolean): string =>
  isActive
    ? `${TAB_CLASS} border-neutral-100 bg-neutral-100 text-[#4d6b2c]`
    : `${TAB_CLASS} border-neutral-100/35 bg-neutral-100/15 hover:bg-neutral-100/30`;

const hashTabId = (tabs: TeamTab[]): string | undefined => {
  const id = window.location.hash.replace('#', '');

  return tabs.find(tab => tab.id === id)?.id;
};

export function TeamSections({ identity, tabs, label }: TeamSectionsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
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
      <section className={BANNER_CLASS} data-testid="team-banner">
        {/* A single lime shape multiplied over the gradient, which is what
            turns it into the darker olive pattern. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/illustrations/background-accessory.svg')] bg-[length:auto_260%] bg-[position:right_-2rem_center] bg-no-repeat opacity-35 mix-blend-multiply"
        />

        <div className="relative z-[1] flex flex-col gap-4">
          {identity}

          {isTabbed && (
            <div
              role="tablist"
              aria-label={label}
              className="flex flex-wrap justify-center gap-2 md:justify-start"
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
        </div>
      </section>

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
