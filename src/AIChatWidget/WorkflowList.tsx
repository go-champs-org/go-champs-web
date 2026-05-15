import React from 'react';
import { useTranslation } from 'react-i18next';
import { Workflow } from './entity';
import WorkflowCard, { WorkflowCardSkeleton } from './WorkflowCard';
import './WorkflowList.scss';

interface WorkflowListProps {
  workflows: Workflow[];
  isLoading: boolean;
  hasError: boolean;
  onSelect: (workflow: Workflow) => void;
  onRetry: () => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  isLoading,
  hasError,
  onSelect,
  onRetry
}) => {
  const { t } = useTranslation();

  return (
    <div className="ai-workflow-list">
      <p className="ai-workflow-list__label">{t('aiChat.selectWorkflow')}</p>
      <div className="ai-workflow-list__items">
        {isLoading && <WorkflowCardSkeleton count={3} />}
        {!isLoading && hasError && (
          <div className="ai-workflow-list__error">
            <span>{t('aiChat.workflowsError')}</span>
            <button
              className="ai-workflow-list__retry"
              onClick={onRetry}
              type="button"
            >
              {t('aiChat.retryButton')}
            </button>
          </div>
        )}
        {!isLoading &&
          !hasError &&
          workflows.map(workflow => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onClick={onSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default WorkflowList;
