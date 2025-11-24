import { useState } from 'react';
import type { ContentBlock, CustomQuestion } from '../../types';

interface QuestionsSectionProps {
  questionIds: string[];
  customQuestions: CustomQuestion[];
  contentBlocks: ContentBlock[];
  onDropQuestion: (blockId: string) => void;
  onRemoveQuestionBlock: (blockId: string) => void;
  onAddCustomQuestion: () => void;
  onUpdateCustomQuestion: (questionId: string, updates: Partial<CustomQuestion>) => void;
  onRemoveCustomQuestion: (questionId: string) => void;
}

export default function QuestionsSection({
  questionIds,
  customQuestions,
  contentBlocks,
  onDropQuestion,
  onRemoveQuestionBlock,
  onAddCustomQuestion,
  onUpdateCustomQuestion,
  onRemoveCustomQuestion
}: QuestionsSectionProps) {
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
        if (block && block.type === 'question') {
          onDropQuestion(data.blockId);
        }
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const libraryQuestions = contentBlocks.filter((block) =>
    questionIds.includes(block.id)
  );

  return (
    <div className="casestudy-section questions-section">
      <h3 className="section-title">❓ Interview Questions</h3>

      {/* Library Questions */}
      <div className="subsection">
        <h4 className="subsection-title">Questions from Library</h4>
        <div
          className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {libraryQuestions.length === 0 ? (
            <p className="drop-zone-hint">
              Drag question blocks from the content library here
            </p>
          ) : (
            <div className="content-blocks-list">
              {libraryQuestions.map((block) => (
                <div key={block.id} className="content-block-item">
                  <div className="block-item-header">
                    <strong>{block.title}</strong>
                    <button
                      onClick={() => onRemoveQuestionBlock(block.id)}
                      className="btn-remove-block"
                      title="Remove question"
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

      {/* Custom Questions */}
      <div className="subsection">
        <div className="subsection-header">
          <h4 className="subsection-title">Custom Questions</h4>
          <button onClick={onAddCustomQuestion} className="btn-add-item">
            + Add Custom Question
          </button>
        </div>

        {customQuestions.length === 0 ? (
          <p className="empty-hint">No custom questions yet</p>
        ) : (
          <div className="custom-questions-list">
            {customQuestions
              .sort((a, b) => a.position - b.position)
              .map((question) => (
                <div key={question.id} className="custom-question-item">
                  <div className="question-header">
                    <select
                      value={question.type}
                      onChange={(e) =>
                        onUpdateCustomQuestion(question.id, {
                          type: e.target.value as any
                        })
                      }
                      className="question-type-select"
                    >
                      <option value="open-ended">Open-Ended</option>
                      <option value="framework">Framework-Based</option>
                      <option value="technical">Technical</option>
                      <option value="strategic">Strategic</option>
                    </select>
                    <button
                      onClick={() => onRemoveCustomQuestion(question.id)}
                      className="btn-remove-item"
                      title="Remove question"
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    value={question.text}
                    onChange={(e) =>
                      onUpdateCustomQuestion(question.id, { text: e.target.value })
                    }
                    placeholder="Enter your interview question here..."
                    rows={3}
                    className="question-textarea"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
