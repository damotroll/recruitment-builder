import { useState } from 'react';
import type { JobAdSection, ContentBlock } from '../../types';

interface JobAdSectionProps {
  section: JobAdSection;
  contentBlocks: ContentBlock[];
  isFirst: boolean;
  isLast: boolean;
  onUpdate: (updates: Partial<JobAdSection>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDropContentBlock: (blockId: string) => void;
  onRemoveContentBlock: (blockId: string) => void;
}

export default function JobAdSectionComponent({
  section,
  contentBlocks,
  isFirst,
  isLast,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  onDropContentBlock,
  onRemoveContentBlock
}: JobAdSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isEditingCustom, setIsEditingCustom] = useState(false);

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
        onDropContentBlock(data.blockId);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const sectionBlocks = contentBlocks.filter((block) =>
    section.contentBlockIds.includes(block.id)
  );

  return (
    <div className="jobad-section">
      <div className="section-header">
        <div className="section-title-group">
          <input
            type="text"
            value={section.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="section-title-input"
            placeholder="Section Title"
          />
          <span className="section-type-badge">{section.type}</span>
        </div>
        <div className="section-controls">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            title="Move Up"
            className="btn-icon"
          >
            ↑
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            title="Move Down"
            className="btn-icon"
          >
            ↓
          </button>
          <button
            onClick={onRemove}
            title="Remove Section"
            className="btn-icon btn-danger"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="section-content">
        {/* Custom Markdown Editor */}
        {section.type === 'custom' && (
          <div className="custom-markdown-editor">
            <div className="editor-toolbar">
              <button
                onClick={() => setIsEditingCustom(!isEditingCustom)}
                className="btn-sm"
              >
                {isEditingCustom ? '👁️ Preview' : '✏️ Edit Markdown'}
              </button>
            </div>
            {isEditingCustom ? (
              <textarea
                value={section.customMarkdown || ''}
                onChange={(e) => onUpdate({ customMarkdown: e.target.value })}
                className="custom-markdown-textarea"
                placeholder="Write custom markdown content..."
                rows={8}
              />
            ) : (
              <div className="custom-markdown-preview">
                {section.customMarkdown || 'No custom content yet.'}
              </div>
            )}
          </div>
        )}

        {/* Content Blocks Drop Zone */}
        <div
          className={`section-drop-zone ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {sectionBlocks.length === 0 ? (
            <p className="drop-zone-hint">
              Drag content blocks from the library to add them here
            </p>
          ) : (
            <div className="section-blocks">
              {sectionBlocks.map((block) => (
                <div key={block.id} className="section-block-item">
                  <div className="block-item-header">
                    <strong>{block.title}</strong>
                    <span className="block-type-badge">{block.type}</span>
                    <button
                      onClick={() => onRemoveContentBlock(block.id)}
                      className="btn-remove-block"
                      title="Remove from section"
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

        {/* Static Content Editor */}
        <div className="section-static-content">
          <label className="content-label">Additional Content (optional)</label>
          <textarea
            value={section.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="section-content-textarea"
            placeholder="Add custom text for this section..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
