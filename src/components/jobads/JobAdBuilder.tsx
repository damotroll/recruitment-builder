import { useState } from 'react';
import type {
  JobAd,
  JobAdModuleState,
  ContentBlock,
  JobAdSection
} from '../../types';
import JobAdCanvas from './JobAdCanvas';
import JobAdPreview from './JobAdPreview';
import './JobAdBuilder.css';

interface JobAdBuilderProps {
  moduleState: JobAdModuleState;
  contentBlocks: ContentBlock[];
  onUpdateJobAd: (jobAdId: string, updates: Partial<JobAd>) => void;
  onSelectJobAd: (jobAdId: string | null) => void;
  onAddJobAd: (jobAd: JobAd) => void;
  onDeleteJobAd: (jobAdId: string) => void;
  onAddSection: (jobAdId: string, section: JobAdSection) => void;
  onUpdateSection: (jobAdId: string, sectionId: string, updates: Partial<JobAdSection>) => void;
  onRemoveSection: (jobAdId: string, sectionId: string) => void;
  onReorderSection: (jobAdId: string, sectionId: string, newPosition: number) => void;
}

export default function JobAdBuilder({
  moduleState,
  contentBlocks,
  onUpdateJobAd,
  onSelectJobAd: _onSelectJobAd,
  onAddJobAd,
  onDeleteJobAd,
  onAddSection,
  onUpdateSection,
  onRemoveSection,
  onReorderSection
}: JobAdBuilderProps) {
  const [showPreview, setShowPreview] = useState(false);

  const selectedJobAd = moduleState.jobAds.find(
    (j) => j.id === moduleState.selectedJobAdId
  );

  const handleCreateBlank = () => {
    const newJobAd: JobAd = {
      id: `jobad-${Date.now()}`,
      title: 'New Job Advertisement',
      roleTitle: '',
      department: '',
      location: '',
      employmentType: 'full-time',
      seniorityLevel: 'mid',
      sections: [],
      metadata: {
        salaryRange: '',
        benefits: [],
        requiresVisaSponsorship: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAddJobAd(newJobAd);
  };

  if (!selectedJobAd) {
    return (
      <div className="jobad-builder-empty">
        <div className="empty-state-content">
          <h2>📄 Create a Job Advertisement</h2>
          <p>
            Build compelling job ads using modular content blocks and templates.
          </p>
          <div className="empty-state-actions">
            <button
              className="btn-primary"
              onClick={handleCreateBlank}
            >
              Create New Job Ad
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jobad-builder">
      {/* Controls Bar */}
      <div className="jobad-controls">
        <div className="jobad-header">
          <div className="jobad-title-group">
            <input
              type="text"
              value={selectedJobAd.title}
              onChange={(e) =>
                onUpdateJobAd(selectedJobAd.id, { title: e.target.value })
              }
              className="jobad-title-input"
              placeholder="Job Ad Title"
            />
            <input
              type="text"
              value={selectedJobAd.roleTitle}
              onChange={(e) =>
                onUpdateJobAd(selectedJobAd.id, { roleTitle: e.target.value })
              }
              className="jobad-role-input"
              placeholder="Role Title (e.g., Senior Product Manager)"
            />
          </div>
          <div className="jobad-meta">
            <input
              type="text"
              value={selectedJobAd.department}
              onChange={(e) =>
                onUpdateJobAd(selectedJobAd.id, { department: e.target.value })
              }
              placeholder="Department"
              className="meta-input"
            />
            <input
              type="text"
              value={selectedJobAd.location}
              onChange={(e) =>
                onUpdateJobAd(selectedJobAd.id, { location: e.target.value })
              }
              placeholder="Location"
              className="meta-input"
            />
            <select
              value={selectedJobAd.employmentType}
              onChange={(e) =>
                onUpdateJobAd(selectedJobAd.id, {
                  employmentType: e.target.value as any
                })
              }
              className="meta-select"
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            <select
              value={selectedJobAd.seniorityLevel}
              onChange={(e) =>
                onUpdateJobAd(selectedJobAd.id, {
                  seniorityLevel: e.target.value as any
                })
              }
              className="meta-select"
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="principal">Principal</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>

        <div className="jobad-actions">
          <button onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? '✏️ Edit' : '👁️ Preview'}
          </button>
          <button onClick={() => {/* TODO: Export */}}>
            📥 Export
          </button>
          <button
            onClick={() => {
              if (confirm('Delete this job ad?')) {
                onDeleteJobAd(selectedJobAd.id);
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
        <JobAdPreview jobAd={selectedJobAd} contentBlocks={contentBlocks} />
      ) : (
        <JobAdCanvas
          jobAd={selectedJobAd}
          contentBlocks={contentBlocks}
          onAddSection={onAddSection}
          onUpdateSection={onUpdateSection}
          onRemoveSection={onRemoveSection}
          onReorderSection={onReorderSection}
        />
      )}
    </div>
  );
}
