import { useState } from 'react';
import type { ContentBlock, CustomCriteria } from '../../types';

interface CriteriaSectionProps {
  criteriaIds: string[];
  customCriteria: CustomCriteria[];
  contentBlocks: ContentBlock[];
  onDropCriteria: (blockId: string) => void;
  onRemoveCriteriaBlock: (blockId: string) => void;
  onAddCustomCriteria: () => void;
  onUpdateCustomCriteria: (criteriaId: string, updates: Partial<CustomCriteria>) => void;
  onRemoveCustomCriteria: (criteriaId: string) => void;
}

export default function CriteriaSection({
  criteriaIds,
  customCriteria,
  contentBlocks,
  onDropCriteria,
  onRemoveCriteriaBlock,
  onAddCustomCriteria,
  onUpdateCustomCriteria,
  onRemoveCustomCriteria
}: CriteriaSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type === 'contentBlock' && data.blockId) {
        const block = contentBlocks.find((b) => b.id === data.blockId);
        if (block && block.type === 'evaluation_criteria') {
          onDropCriteria(data.blockId);
        }
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const libraryCriteria = contentBlocks.filter((block) =>
    criteriaIds.includes(block.id)
  );

  const handleAddLookingFor = (criteriaId: string) => {
    const criteria = customCriteria.find((c) => c.id === criteriaId);
    if (criteria) {
      onUpdateCustomCriteria(criteriaId, {
        lookingFor: [...criteria.lookingFor, '']
      });
    }
  };

  const handleUpdateLookingFor = (criteriaId: string, index: number, value: string) => {
    const criteria = customCriteria.find((c) => c.id === criteriaId);
    if (criteria) {
      const updatedLookingFor = [...criteria.lookingFor];
      updatedLookingFor[index] = value;
      onUpdateCustomCriteria(criteriaId, { lookingFor: updatedLookingFor });
    }
  };

  const handleRemoveLookingFor = (criteriaId: string, index: number) => {
    const criteria = customCriteria.find((c) => c.id === criteriaId);
    if (criteria) {
      onUpdateCustomCriteria(criteriaId, {
        lookingFor: criteria.lookingFor.filter((_, i) => i !== index)
      });
    }
  };

  const handleAddRedFlag = (criteriaId: string) => {
    const criteria = customCriteria.find((c) => c.id === criteriaId);
    if (criteria) {
      onUpdateCustomCriteria(criteriaId, {
        redFlags: [...criteria.redFlags, '']
      });
    }
  };

  const handleUpdateRedFlag = (criteriaId: string, index: number, value: string) => {
    const criteria = customCriteria.find((c) => c.id === criteriaId);
    if (criteria) {
      const updatedRedFlags = [...criteria.redFlags];
      updatedRedFlags[index] = value;
      onUpdateCustomCriteria(criteriaId, { redFlags: updatedRedFlags });
    }
  };

  const handleRemoveRedFlag = (criteriaId: string, index: number) => {
    const criteria = customCriteria.find((c) => c.id === criteriaId);
    if (criteria) {
      onUpdateCustomCriteria(criteriaId, {
        redFlags: criteria.redFlags.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="casestudy-section criteria-section">
      <h3 className="section-title">✓ Evaluation Criteria</h3>

      {/* Library Criteria */}
      <div className="subsection">
        <h4 className="subsection-title">Criteria from Library</h4>
        <div
          className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {libraryCriteria.length === 0 ? (
            <p className="drop-zone-hint">
              Drag evaluation criteria blocks from the content library here
            </p>
          ) : (
            <div className="content-blocks-list">
              {libraryCriteria.map((block) => (
                <div key={block.id} className="content-block-item">
                  <div className="block-item-header">
                    <strong>{block.title}</strong>
                    <button
                      onClick={() => onRemoveCriteriaBlock(block.id)}
                      className="btn-remove-block"
                      title="Remove criteria"
                    >
                      ×
                    </button>
                  </div>
                  <p className="block-item-content">{block.content}</p>
                  {block.tags.length > 0 && (
                    <div className="block-item-tags">
                      {block.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom Criteria */}
      <div className="subsection">
        <div className="subsection-header">
          <h4 className="subsection-title">Custom Evaluation Criteria</h4>
          <button onClick={onAddCustomCriteria} className="btn-add-item">
            + Add Custom Criteria
          </button>
        </div>

        {customCriteria.length === 0 ? (
          <p className="empty-hint">No custom criteria yet</p>
        ) : (
          <div className="custom-criteria-list">
            {customCriteria
              .sort((a, b) => a.position - b.position)
              .map((criteria) => (
                <div key={criteria.id} className="custom-criteria-item">
                  <div className="criteria-header">
                    <input
                      type="text"
                      value={criteria.name}
                      onChange={(e) =>
                        onUpdateCustomCriteria(criteria.id, { name: e.target.value })
                      }
                      placeholder="Criteria name (e.g., Problem Solving)"
                      className="criteria-name-input"
                    />
                    <button
                      onClick={() => onRemoveCustomCriteria(criteria.id)}
                      className="btn-remove-item"
                      title="Remove criteria"
                    >
                      ×
                    </button>
                  </div>

                  <textarea
                    value={criteria.description}
                    onChange={(e) =>
                      onUpdateCustomCriteria(criteria.id, { description: e.target.value })
                    }
                    placeholder="Description of what you're evaluating..."
                    rows={2}
                    className="criteria-description-textarea"
                  />

                  <div className="criteria-subsection">
                    <div className="subsection-header">
                      <label>What We're Looking For</label>
                      <button
                        onClick={() => handleAddLookingFor(criteria.id)}
                        className="btn-add-small"
                      >
                        + Add
                      </button>
                    </div>
                    {criteria.lookingFor.map((item, index) => (
                      <div key={index} className="mini-list-item">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleUpdateLookingFor(criteria.id, index, e.target.value)
                          }
                          placeholder="Positive indicator..."
                          className="mini-list-input"
                        />
                        <button
                          onClick={() => handleRemoveLookingFor(criteria.id, index)}
                          className="btn-remove-mini"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="criteria-subsection">
                    <div className="subsection-header">
                      <label>Red Flags</label>
                      <button
                        onClick={() => handleAddRedFlag(criteria.id)}
                        className="btn-add-small"
                      >
                        + Add
                      </button>
                    </div>
                    {criteria.redFlags.map((item, index) => (
                      <div key={index} className="mini-list-item">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleUpdateRedFlag(criteria.id, index, e.target.value)
                          }
                          placeholder="Warning sign..."
                          className="mini-list-input"
                        />
                        <button
                          onClick={() => handleRemoveRedFlag(criteria.id, index)}
                          className="btn-remove-mini"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
