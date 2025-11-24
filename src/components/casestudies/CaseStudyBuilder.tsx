import { useState } from 'react';
import type {
  CaseStudy,
  CaseStudyModuleState,
  ContentBlock,
  CustomQuestion,
  CustomCriteria
} from '../../types';
import CaseStudyCanvas from './CaseStudyCanvas';
import CaseStudyPreview from './CaseStudyPreview';
import './CaseStudyBuilder.css';

interface CaseStudyBuilderProps {
  moduleState: CaseStudyModuleState;
  contentBlocks: ContentBlock[];
  onUpdateCaseStudy: (caseStudyId: string, updates: Partial<CaseStudy>) => void;
  onSelectCaseStudy: (caseStudyId: string | null) => void;
  onAddCaseStudy: (caseStudy: CaseStudy) => void;
  onDeleteCaseStudy: (caseStudyId: string) => void;
}

export default function CaseStudyBuilder({
  moduleState,
  contentBlocks,
  onUpdateCaseStudy,
  onSelectCaseStudy: _onSelectCaseStudy,
  onAddCaseStudy,
  onDeleteCaseStudy
}: CaseStudyBuilderProps) {
  const [showPreview, setShowPreview] = useState(false);

  const selectedCaseStudy = moduleState.caseStudies.find(
    (c) => c.id === moduleState.selectedCaseStudyId
  );

  const handleCreateBlank = () => {
    const newCaseStudy: CaseStudy = {
      id: `casestudy-${Date.now()}`,
      title: 'New Case Study',
      seniorityLevel: 'mid',
      domain: 'product',
      candidateProfileId: null,
      scenario: {
        context: '',
        challenge: '',
        constraints: []
      },
      questionIds: [],
      evaluationCriteriaIds: [],
      customQuestions: [],
      customCriteria: [],
      duration: 60,
      deliverables: [],
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAddCaseStudy(newCaseStudy);
  };

  if (!selectedCaseStudy) {
    return (
      <div className="casestudy-builder-empty">
        <div className="empty-state-content">
          <h2>📝 Create a Case Study</h2>
          <p>
            Design interview case studies with scenarios, questions, and evaluation criteria.
          </p>
          <div className="empty-state-actions">
            <button
              className="btn-primary"
              onClick={handleCreateBlank}
            >
              Create New Case Study
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddQuestion = () => {
    const newQuestion: CustomQuestion = {
      id: `question-${Date.now()}`,
      text: '',
      type: 'open-ended',
      position: selectedCaseStudy.customQuestions.length
    };

    onUpdateCaseStudy(selectedCaseStudy.id, {
      customQuestions: [...selectedCaseStudy.customQuestions, newQuestion]
    });
  };

  const handleUpdateQuestion = (questionId: string, updates: Partial<CustomQuestion>) => {
    const updatedQuestions = selectedCaseStudy.customQuestions.map((q) =>
      q.id === questionId ? { ...q, ...updates } : q
    );
    onUpdateCaseStudy(selectedCaseStudy.id, { customQuestions: updatedQuestions });
  };

  const handleRemoveQuestion = (questionId: string) => {
    const updatedQuestions = selectedCaseStudy.customQuestions.filter((q) => q.id !== questionId);
    onUpdateCaseStudy(selectedCaseStudy.id, { customQuestions: updatedQuestions });
  };

  const handleAddCriteria = () => {
    const newCriteria: CustomCriteria = {
      id: `criteria-${Date.now()}`,
      name: '',
      description: '',
      lookingFor: [],
      redFlags: [],
      position: selectedCaseStudy.customCriteria.length
    };

    onUpdateCaseStudy(selectedCaseStudy.id, {
      customCriteria: [...selectedCaseStudy.customCriteria, newCriteria]
    });
  };

  const handleUpdateCriteria = (criteriaId: string, updates: Partial<CustomCriteria>) => {
    const updatedCriteria = selectedCaseStudy.customCriteria.map((c) =>
      c.id === criteriaId ? { ...c, ...updates } : c
    );
    onUpdateCaseStudy(selectedCaseStudy.id, { customCriteria: updatedCriteria });
  };

  const handleRemoveCriteria = (criteriaId: string) => {
    const updatedCriteria = selectedCaseStudy.customCriteria.filter((c) => c.id !== criteriaId);
    onUpdateCaseStudy(selectedCaseStudy.id, { customCriteria: updatedCriteria });
  };

  const handleAddConstraint = () => {
    const updatedConstraints = [...selectedCaseStudy.scenario.constraints, ''];
    onUpdateCaseStudy(selectedCaseStudy.id, {
      scenario: { ...selectedCaseStudy.scenario, constraints: updatedConstraints }
    });
  };

  const handleUpdateConstraint = (index: number, value: string) => {
    const updatedConstraints = [...selectedCaseStudy.scenario.constraints];
    updatedConstraints[index] = value;
    onUpdateCaseStudy(selectedCaseStudy.id, {
      scenario: { ...selectedCaseStudy.scenario, constraints: updatedConstraints }
    });
  };

  const handleRemoveConstraint = (index: number) => {
    const updatedConstraints = selectedCaseStudy.scenario.constraints.filter((_, i) => i !== index);
    onUpdateCaseStudy(selectedCaseStudy.id, {
      scenario: { ...selectedCaseStudy.scenario, constraints: updatedConstraints }
    });
  };

  const handleAddDeliverable = () => {
    const updatedDeliverables = [...selectedCaseStudy.deliverables, ''];
    onUpdateCaseStudy(selectedCaseStudy.id, { deliverables: updatedDeliverables });
  };

  const handleUpdateDeliverable = (index: number, value: string) => {
    const updatedDeliverables = [...selectedCaseStudy.deliverables];
    updatedDeliverables[index] = value;
    onUpdateCaseStudy(selectedCaseStudy.id, { deliverables: updatedDeliverables });
  };

  const handleRemoveDeliverable = (index: number) => {
    const updatedDeliverables = selectedCaseStudy.deliverables.filter((_, i) => i !== index);
    onUpdateCaseStudy(selectedCaseStudy.id, { deliverables: updatedDeliverables });
  };

  return (
    <div className="casestudy-builder">
      {/* Controls Bar */}
      <div className="casestudy-controls">
        <div className="casestudy-header">
          <input
            type="text"
            value={selectedCaseStudy.title}
            onChange={(e) =>
              onUpdateCaseStudy(selectedCaseStudy.id, { title: e.target.value })
            }
            className="casestudy-title-input"
            placeholder="Case Study Title"
          />
          <div className="casestudy-meta">
            <select
              value={selectedCaseStudy.seniorityLevel}
              onChange={(e) =>
                onUpdateCaseStudy(selectedCaseStudy.id, {
                  seniorityLevel: e.target.value as any
                })
              }
              className="meta-select"
            >
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="principal">Principal</option>
            </select>
            <input
              type="text"
              value={selectedCaseStudy.domain}
              onChange={(e) =>
                onUpdateCaseStudy(selectedCaseStudy.id, { domain: e.target.value })
              }
              placeholder="Domain (e.g., platform, growth)"
              className="meta-input"
            />
            <input
              type="number"
              value={selectedCaseStudy.duration}
              onChange={(e) =>
                onUpdateCaseStudy(selectedCaseStudy.id, {
                  duration: parseInt(e.target.value) || 60
                })
              }
              placeholder="Duration (min)"
              className="meta-input duration-input"
              min="15"
              step="15"
            />
          </div>
        </div>

        <div className="casestudy-actions">
          <button onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? '✏️ Edit' : '👁️ Preview'}
          </button>
          <button onClick={() => {/* TODO: Export */}}>
            📥 Export
          </button>
          <button
            onClick={() => {
              if (confirm('Delete this case study?')) {
                onDeleteCaseStudy(selectedCaseStudy.id);
              }
            }}
            className="btn-danger"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      {showPreview ? (
        <CaseStudyPreview caseStudy={selectedCaseStudy} contentBlocks={contentBlocks} />
      ) : (
        <CaseStudyCanvas
          caseStudy={selectedCaseStudy}
          contentBlocks={contentBlocks}
          onUpdateCaseStudy={onUpdateCaseStudy}
          onAddQuestion={handleAddQuestion}
          onUpdateQuestion={handleUpdateQuestion}
          onRemoveQuestion={handleRemoveQuestion}
          onAddCriteria={handleAddCriteria}
          onUpdateCriteria={handleUpdateCriteria}
          onRemoveCriteria={handleRemoveCriteria}
          onAddConstraint={handleAddConstraint}
          onUpdateConstraint={handleUpdateConstraint}
          onRemoveConstraint={handleRemoveConstraint}
          onAddDeliverable={handleAddDeliverable}
          onUpdateDeliverable={handleUpdateDeliverable}
          onRemoveDeliverable={handleRemoveDeliverable}
        />
      )}
    </div>
  );
}
