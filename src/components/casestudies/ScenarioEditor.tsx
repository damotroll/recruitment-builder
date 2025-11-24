import type { CaseStudy } from '../../types';

interface ScenarioEditorProps {
  scenario: CaseStudy['scenario'];
  deliverables: string[];
  onUpdateScenario: (updates: Partial<CaseStudy['scenario']>) => void;
  onAddConstraint: () => void;
  onUpdateConstraint: (index: number, value: string) => void;
  onRemoveConstraint: (index: number) => void;
  onAddDeliverable: () => void;
  onUpdateDeliverable: (index: number, value: string) => void;
  onRemoveDeliverable: (index: number) => void;
}

export default function ScenarioEditor({
  scenario,
  deliverables,
  onUpdateScenario,
  onAddConstraint,
  onUpdateConstraint,
  onRemoveConstraint,
  onAddDeliverable,
  onUpdateDeliverable,
  onRemoveDeliverable
}: ScenarioEditorProps) {
  return (
    <div className="casestudy-section scenario-section">
      <h3 className="section-title">📖 Scenario</h3>

      <div className="scenario-field">
        <label>Context / Background</label>
        <textarea
          value={scenario.context}
          onChange={(e) => onUpdateScenario({ context: e.target.value })}
          placeholder="Provide background information and context for the case study..."
          rows={4}
          className="scenario-textarea"
        />
      </div>

      <div className="scenario-field">
        <label>Challenge / Problem</label>
        <textarea
          value={scenario.challenge}
          onChange={(e) => onUpdateScenario({ challenge: e.target.value })}
          placeholder="Describe the core problem or challenge the candidate needs to solve..."
          rows={4}
          className="scenario-textarea"
        />
      </div>

      <div className="scenario-field">
        <div className="field-header">
          <label>Constraints</label>
          <button onClick={onAddConstraint} className="btn-add-item">
            + Add Constraint
          </button>
        </div>
        <div className="list-items">
          {scenario.constraints.length === 0 ? (
            <p className="empty-hint">No constraints added yet</p>
          ) : (
            scenario.constraints.map((constraint, index) => (
              <div key={index} className="list-item">
                <input
                  type="text"
                  value={constraint}
                  onChange={(e) => onUpdateConstraint(index, e.target.value)}
                  placeholder="e.g., 2 hour time limit, Budget: $10K, Limited data access"
                  className="list-item-input"
                />
                <button
                  onClick={() => onRemoveConstraint(index)}
                  className="btn-remove-item"
                  title="Remove constraint"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="scenario-field">
        <div className="field-header">
          <label>Expected Deliverables</label>
          <button onClick={onAddDeliverable} className="btn-add-item">
            + Add Deliverable
          </button>
        </div>
        <div className="list-items">
          {deliverables.length === 0 ? (
            <p className="empty-hint">No deliverables specified yet</p>
          ) : (
            deliverables.map((deliverable, index) => (
              <div key={index} className="list-item">
                <input
                  type="text"
                  value={deliverable}
                  onChange={(e) => onUpdateDeliverable(index, e.target.value)}
                  placeholder="e.g., Written PRD, Slide deck presentation, Architecture diagram"
                  className="list-item-input"
                />
                <button
                  onClick={() => onRemoveDeliverable(index)}
                  className="btn-remove-item"
                  title="Remove deliverable"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
