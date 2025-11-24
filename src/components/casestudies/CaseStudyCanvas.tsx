import type { CaseStudy, ContentBlock, CustomQuestion, CustomCriteria } from '../../types';
import ScenarioEditor from './ScenarioEditor';
import QuestionsSection from './QuestionsSection';
import CriteriaSection from './CriteriaSection';

interface CaseStudyCanvasProps {
  caseStudy: CaseStudy;
  contentBlocks: ContentBlock[];
  onUpdateCaseStudy: (caseStudyId: string, updates: Partial<CaseStudy>) => void;
  onAddQuestion: () => void;
  onUpdateQuestion: (questionId: string, updates: Partial<CustomQuestion>) => void;
  onRemoveQuestion: (questionId: string) => void;
  onAddCriteria: () => void;
  onUpdateCriteria: (criteriaId: string, updates: Partial<CustomCriteria>) => void;
  onRemoveCriteria: (criteriaId: string) => void;
  onAddConstraint: () => void;
  onUpdateConstraint: (index: number, value: string) => void;
  onRemoveConstraint: (index: number) => void;
  onAddDeliverable: () => void;
  onUpdateDeliverable: (index: number, value: string) => void;
  onRemoveDeliverable: (index: number) => void;
}

export default function CaseStudyCanvas({
  caseStudy,
  contentBlocks,
  onUpdateCaseStudy,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion,
  onAddCriteria,
  onUpdateCriteria,
  onRemoveCriteria,
  onAddConstraint,
  onUpdateConstraint,
  onRemoveConstraint,
  onAddDeliverable,
  onUpdateDeliverable,
  onRemoveDeliverable
}: CaseStudyCanvasProps) {
  const handleDropQuestion = (blockId: string) => {
    if (!caseStudy.questionIds.includes(blockId)) {
      onUpdateCaseStudy(caseStudy.id, {
        questionIds: [...caseStudy.questionIds, blockId]
      });
    }
  };

  const handleRemoveQuestionBlock = (blockId: string) => {
    onUpdateCaseStudy(caseStudy.id, {
      questionIds: caseStudy.questionIds.filter((id) => id !== blockId)
    });
  };

  const handleDropCriteria = (blockId: string) => {
    if (!caseStudy.evaluationCriteriaIds.includes(blockId)) {
      onUpdateCaseStudy(caseStudy.id, {
        evaluationCriteriaIds: [...caseStudy.evaluationCriteriaIds, blockId]
      });
    }
  };

  const handleRemoveCriteriaBlock = (blockId: string) => {
    onUpdateCaseStudy(caseStudy.id, {
      evaluationCriteriaIds: caseStudy.evaluationCriteriaIds.filter((id) => id !== blockId)
    });
  };

  return (
    <div className="casestudy-canvas">
      <ScenarioEditor
        scenario={caseStudy.scenario}
        deliverables={caseStudy.deliverables}
        onUpdateScenario={(updates) =>
          onUpdateCaseStudy(caseStudy.id, {
            scenario: { ...caseStudy.scenario, ...updates }
          })
        }
        onAddConstraint={onAddConstraint}
        onUpdateConstraint={onUpdateConstraint}
        onRemoveConstraint={onRemoveConstraint}
        onAddDeliverable={onAddDeliverable}
        onUpdateDeliverable={onUpdateDeliverable}
        onRemoveDeliverable={onRemoveDeliverable}
      />

      <QuestionsSection
        questionIds={caseStudy.questionIds}
        customQuestions={caseStudy.customQuestions}
        contentBlocks={contentBlocks}
        onDropQuestion={handleDropQuestion}
        onRemoveQuestionBlock={handleRemoveQuestionBlock}
        onAddCustomQuestion={onAddQuestion}
        onUpdateCustomQuestion={onUpdateQuestion}
        onRemoveCustomQuestion={onRemoveQuestion}
      />

      <CriteriaSection
        criteriaIds={caseStudy.evaluationCriteriaIds}
        customCriteria={caseStudy.customCriteria}
        contentBlocks={contentBlocks}
        onDropCriteria={handleDropCriteria}
        onRemoveCriteriaBlock={handleRemoveCriteriaBlock}
        onAddCustomCriteria={onAddCriteria}
        onUpdateCustomCriteria={onUpdateCriteria}
        onRemoveCustomCriteria={onRemoveCriteria}
      />
    </div>
  );
}
