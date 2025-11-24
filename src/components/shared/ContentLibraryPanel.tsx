import { useState } from 'react';
import type { ContentBlock, RecruitmentBuilderState } from '../../types';
import './ContentLibraryPanel.css';

interface ContentLibraryPanelProps {
  contentBlocks: ContentBlock[];
  libraryFilter: RecruitmentBuilderState['libraryFilter'];
  onSetFilter: (filter: Partial<RecruitmentBuilderState['libraryFilter']>) => void;
}

export default function ContentLibraryPanel({
  contentBlocks,
  libraryFilter,
  onSetFilter
}: ContentLibraryPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Filter blocks
  const filteredBlocks = contentBlocks.filter((block) => {
    if (libraryFilter.type && block.type !== libraryFilter.type) {
      return false;
    }
    if (libraryFilter.category && block.category !== libraryFilter.category) {
      return false;
    }
    if (libraryFilter.searchQuery) {
      const query = libraryFilter.searchQuery.toLowerCase();
      return (
        block.title.toLowerCase().includes(query) ||
        block.content.toLowerCase().includes(query) ||
        block.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const handleDragStart = (e: React.DragEvent, block: ContentBlock) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        type: 'contentBlock',
        blockId: block.id
      })
    );
  };

  if (collapsed) {
    return (
      <div className="library-panel collapsed">
        <button
          onClick={() => setCollapsed(false)}
          className="expand-btn"
          title="Expand library"
        >
          📚 →
        </button>
      </div>
    );
  }

  return (
    <div className="library-panel">
      <div className="library-panel-header">
        <h2>Content Library</h2>
        <button
          onClick={() => setCollapsed(true)}
          className="collapse-btn"
          title="Collapse library"
        >
          ←
        </button>
      </div>

      <div className="library-panel-filters">
        <input
          type="text"
          placeholder="Search..."
          value={libraryFilter.searchQuery || ''}
          onChange={(e) => onSetFilter({ searchQuery: e.target.value })}
          className="library-search"
        />

        <select
          value={libraryFilter.type || ''}
          onChange={(e) => onSetFilter({ type: e.target.value || undefined })}
          className="library-filter-select"
        >
          <option value="">All Types</option>
          <option value="skill">Skills</option>
          <option value="requirement">Requirements</option>
          <option value="benefit">Benefits</option>
          <option value="value">Values</option>
          <option value="question">Questions</option>
          <option value="evaluation_criteria">Criteria</option>
          <option value="red_flag">Red Flags</option>
          <option value="ai_tool">AI Tools</option>
          <option value="experience">Experience</option>
        </select>
      </div>

      <div className="library-panel-stats">
        {filteredBlocks.length} of {contentBlocks.length} blocks
      </div>

      <div className="library-panel-blocks">
        {filteredBlocks.map((block) => (
          <div
            key={block.id}
            className="library-block"
            draggable
            onDragStart={(e) => handleDragStart(e, block)}
          >
            <div className="library-block-header">
              <strong>{block.title}</strong>
              <span className="library-block-type">{block.type}</span>
            </div>
            <p className="library-block-content">
              {block.content.substring(0, 100)}...
            </p>
            <div className="library-block-tags">
              {block.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="library-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
