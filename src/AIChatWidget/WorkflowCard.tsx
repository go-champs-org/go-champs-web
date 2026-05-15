import React from 'react';
import { Workflow } from './entity';
import './WorkflowCard.scss';

interface WorkflowCardProps {
  workflow: Workflow;
  onClick: (workflow: Workflow) => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onClick }) => {
  return (
    <button
      className="ai-workflow-card"
      onClick={() => onClick(workflow)}
      type="button"
    >
      {workflow.name}
    </button>
  );
};

interface WorkflowCardSkeletonProps {
  count?: number;
}

export const WorkflowCardSkeleton: React.FC<WorkflowCardSkeletonProps> = ({
  count = 3
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ai-workflow-card ai-workflow-card--loading" />
      ))}
    </>
  );
};

export default WorkflowCard;
