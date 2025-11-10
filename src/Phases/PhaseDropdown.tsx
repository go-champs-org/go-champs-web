import React from 'react';
import { PhaseEntity } from './state';
import './PhaseDropdown.scss';

interface PhaseDropdownProps {
  currentPhase: PhaseEntity;
  isLoading?: boolean;
  label: string;
  phases: PhaseEntity[];
  onPhaseClick: (phaseId: string) => void;
}

function PhaseDropdown({
  currentPhase,
  isLoading = false,
  label,
  phases,
  onPhaseClick
}: PhaseDropdownProps) {
  const handlePhaseClick = (phaseId: string) => {
    if (!isLoading) {
      onPhaseClick(phaseId);
    }
  };

  return (
    <div className="phase-dropdown dropdown is-right is-hoverable">
      <div className="dropdown-trigger">
        <button
          className={`button is-rounded is-small ${
            isLoading ? 'is-loading' : ''
          }`}
          aria-haspopup="true"
          aria-controls="dropdown-phase"
          disabled={isLoading}
        >
          <span>{label}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>

      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {phases.map(phase => (
            <button
              key={phase.id}
              className={`dropdown-item ${
                phase.id === currentPhase.id ? 'is-disabled' : ''
              }`}
              onClick={() => handlePhaseClick(phase.id)}
              disabled={phase.id === currentPhase.id || isLoading}
            >
              {phase.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhaseDropdown;
