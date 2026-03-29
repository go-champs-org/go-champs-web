import React, { useState } from 'react';
import './CollapsibleCard.scss';

interface CollapsibleCardProps {
  question: string;
  answer: string;
}

function CollapsibleCard({ question, answer }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`collapsible-card${isOpen ? ' is-open' : ''}`}>
      <button
        className="collapsible-card-header"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <span className="collapsible-card-icon">{isOpen ? '−' : '+'}</span>
        <span className="collapsible-card-question">{question}</span>
      </button>

      {isOpen && (
        <div className="collapsible-card-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default CollapsibleCard;
