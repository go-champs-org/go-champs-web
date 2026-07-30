import React from 'react';
import { Workflow } from './entity';
import './WorkflowCard.scss';

interface WorkflowCardProps {
  workflow: Workflow;
  onClick: (workflow: Workflow) => void;
}

function WorkflowCard({ workflow, onClick }: WorkflowCardProps) {
  return (
    <button
      className="ai-workflow-card"
      onClick={() => onClick(workflow)}
      type="button"
    >
      {workflow.name}
    </button>
  );
}

interface WorkflowCardSkeletonProps {
  count?: number;
}

export function WorkflowCardSkeleton({ count = 3 }: WorkflowCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ai-workflow-card ai-workflow-card--loading" />
      ))}
    </>
  );
}

export default WorkflowCard;
