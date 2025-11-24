import { useState } from 'react';
import type { ContentBlock } from '../../types';

interface ProfileSectionProps {
  title: string;
  description: string;
  blocks: ContentBlock[];
  onDrop: (blockId: string) => void;
  onRemove: (blockId: string) => void;
  emptyMessage: string;
}

export default function ProfileSection({
  title,
  description,
  blocks,
  onDrop,
  onRemove,
  emptyMessage
}: ProfileSectionProps) {
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
        onDrop(data.blockId);
      }
    } catch (error) {
      console.error('Failed to parse drop data:', error);
    }
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h3>{title}</h3>
        <p className="section-description">{description}</p>
      </div>

      <div
        className={`section-drop-zone ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {blocks.length === 0 ? (
          <div className="empty-drop-zone">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className="section-blocks">
            {blocks.map((block) => (
              <div key={block.id} className="profile-block">
                <div className="block-content-preview">
                  <div className="block-header-mini">
                    <strong>{block.title}</strong>
                    <span className="block-type-badge">{block.type}</span>
                  </div>
                  <p className="block-text">{block.content.substring(0, 200)}...</p>
                  {block.tags.length > 0 && (
                    <div className="block-tags-mini">
                      {block.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag-mini">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onRemove(block.id)}
                  className="remove-block-btn"
                  title="Remove from profile"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
