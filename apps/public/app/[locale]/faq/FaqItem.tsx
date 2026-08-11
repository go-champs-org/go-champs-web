'use client';

import { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-neutral-400 bg-surface transition-shadow ${
        isOpen ? 'shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)]' : ''
      }`}
    >
      <button
        type="button"
        className="flex w-full items-center gap-4 px-6 py-5 text-left hover:bg-black/[0.02]"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <span className="w-6 flex-shrink-0 text-xl font-bold leading-none text-primary-dark">
          {isOpen ? '−' : '+'}
        </span>
        <span className="text-base font-semibold leading-snug text-foreground md:text-[1.0625rem]">
          {question}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-5 pl-14">
          <p className="text-[0.9375rem] leading-[1.65] text-muted">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
