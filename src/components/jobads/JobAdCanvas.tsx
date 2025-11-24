import { useState } from 'react';
import type { JobAd, ContentBlock, JobAdSection } from '../../types';
import JobAdSectionComponent from './JobAdSectionComponent';

interface JobAdCanvasProps {
  jobAd: JobAd;
  contentBlocks: ContentBlock[];
  onAddSection: (jobAdId: string, section: JobAdSection) => void;
  onUpdateSection: (jobAdId: string, sectionId: string, updates: Partial<JobAdSection>) => void;
  onRemoveSection: (jobAdId: string, sectionId: string) => void;
  onReorderSection: (jobAdId: string, sectionId: string, newPosition: number) => void;
}

export default function JobAdCanvas({
  jobAd,
  contentBlocks,
  onAddSection,
  onUpdateSection,
  onRemoveSection,
  onReorderSection
}: JobAdCanvasProps) {
  const [showAddSection, setShowAddSection] = useState(false);

  const handleAddSection = (type: JobAdSection['type']) => {
    const sectionTitles: Record<JobAdSection['type'], string> = {
      intro: 'Introduction',
      responsibilities: 'Key Responsibilities',
      requirements: 'Requirements',
      benefits: 'What We Offer',
      process: 'Hiring Process',
      company: 'About Us',
      custom: 'Custom Section'
    };

    const newSection: JobAdSection = {
      id: `section-${Date.now()}`,
      type,
      title: sectionTitles[type],
      content: '',
      contentBlockIds: [],
      position: jobAd.sections.length,
      customMarkdown: ''
    };

    onAddSection(jobAd.id, newSection);
    setShowAddSection(false);
  };

  const handleDropContentBlock = (sectionId: string, blockId: string) => {
    const section = jobAd.sections.find((s) => s.id === sectionId);
    if (!section) return;

    // Add block ID to section if not already present
    if (!section.contentBlockIds.includes(blockId)) {
      onUpdateSection(jobAd.id, sectionId, {
        contentBlockIds: [...section.contentBlockIds, blockId]
      });
    }
  };

  const handleRemoveContentBlock = (sectionId: string, blockId: string) => {
    const section = jobAd.sections.find((s) => s.id === sectionId);
    if (!section) return;

    onUpdateSection(jobAd.id, sectionId, {
      contentBlockIds: section.contentBlockIds.filter((id) => id !== blockId)
    });
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const currentIndex = jobAd.sections.findIndex((s) => s.id === sectionId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= jobAd.sections.length) return;

    onReorderSection(jobAd.id, sectionId, newIndex);
  };

  const sortedSections = [...jobAd.sections].sort((a, b) => a.position - b.position);

  return (
    <div className="jobad-canvas">
      <div className="canvas-toolbar">
        <button
          className="btn-add-section"
          onClick={() => setShowAddSection(!showAddSection)}
        >
          + Add Section
        </button>
        {showAddSection && (
          <div className="section-type-menu">
            <button onClick={() => handleAddSection('intro')}>Introduction</button>
            <button onClick={() => handleAddSection('responsibilities')}>Responsibilities</button>
            <button onClick={() => handleAddSection('requirements')}>Requirements</button>
            <button onClick={() => handleAddSection('benefits')}>Benefits</button>
            <button onClick={() => handleAddSection('process')}>Hiring Process</button>
            <button onClick={() => handleAddSection('company')}>About Company</button>
            <button onClick={() => handleAddSection('custom')}>Custom Section</button>
          </div>
        )}
      </div>

      <div className="canvas-sections">
        {sortedSections.length === 0 ? (
          <div className="canvas-empty-state">
            <p>No sections yet. Click "Add Section" to get started.</p>
          </div>
        ) : (
          sortedSections.map((section, index) => (
            <JobAdSectionComponent
              key={section.id}
              section={section}
              contentBlocks={contentBlocks}
              isFirst={index === 0}
              isLast={index === sortedSections.length - 1}
              onUpdate={(updates) => onUpdateSection(jobAd.id, section.id, updates)}
              onRemove={() => onRemoveSection(jobAd.id, section.id)}
              onMoveUp={() => handleMoveSection(section.id, 'up')}
              onMoveDown={() => handleMoveSection(section.id, 'down')}
              onDropContentBlock={(blockId) => handleDropContentBlock(section.id, blockId)}
              onRemoveContentBlock={(blockId) => handleRemoveContentBlock(section.id, blockId)}
            />
          ))
        )}
      </div>
    </div>
  );
}
