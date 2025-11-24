import { useState } from 'react';
import type {
  CandidateProfile,
  ProfileModuleState,
  ContentBlock,
  CandidateArchetype
} from '../../types';
import ArchetypeSelector from './ArchetypeSelector';
import ProfileCanvas from './ProfileCanvas';
import ProfilePreview from './ProfilePreview';
import './ProfileBuilder.css';

interface ProfileBuilderProps {
  moduleState: ProfileModuleState;
  contentBlocks: ContentBlock[];
  archetypes: CandidateArchetype[];
  onUpdateProfile: (profileId: string, updates: Partial<CandidateProfile>) => void;
  onSelectProfile: (profileId: string | null) => void;
  onAddProfile: (profile: CandidateProfile) => void;
  onDeleteProfile: (profileId: string) => void;
  onAddSkillToProfile: (profileId: string, skillId: string, required: boolean) => void;
  onRemoveSkillFromProfile: (profileId: string, skillId: string, required: boolean) => void;
}

export default function ProfileBuilder({
  moduleState,
  contentBlocks,
  archetypes,
  onUpdateProfile,
  onSelectProfile,
  onAddProfile,
  onDeleteProfile,
  onAddSkillToProfile,
  onRemoveSkillFromProfile
}: ProfileBuilderProps) {
  const [showArchetypeSelector, setShowArchetypeSelector] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const selectedProfile = moduleState.profiles.find(
    (p) => p.id === moduleState.selectedProfileId
  );

  const handleCreateFromArchetype = (archetype: CandidateArchetype) => {
    const newProfile: CandidateProfile = {
      id: `profile-${Date.now()}`,
      name: `${archetype.name} Profile`,
      archetypeId: archetype.id,
      seniorityLevel: archetype.seniorityLevel as any,
      domain: 'product',
      requiredSkillIds: [...archetype.baselineSkillIds],
      preferredSkillIds: [],
      requiredExperienceIds: [...archetype.baselineRequirementIds],
      aiToolRequirementIds: [],
      responsibilityIds: [],
      redFlagIds: [],
      customSections: [],
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAddProfile(newProfile);
    setShowArchetypeSelector(false);
  };

  const handleCreateBlank = () => {
    const newProfile: CandidateProfile = {
      id: `profile-${Date.now()}`,
      name: 'New Candidate Profile',
      archetypeId: null,
      seniorityLevel: 'mid',
      domain: 'product',
      requiredSkillIds: [],
      preferredSkillIds: [],
      requiredExperienceIds: [],
      aiToolRequirementIds: [],
      responsibilityIds: [],
      redFlagIds: [],
      customSections: [],
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAddProfile(newProfile);
    setShowArchetypeSelector(false);
  };

  if (!selectedProfile) {
    return (
      <div className="profile-builder-empty">
        <div className="empty-state-content">
          <h2>📋 Create a Candidate Profile</h2>
          <p>
            Build ideal candidate requirement profiles using archetype templates or start from scratch.
          </p>
          <div className="empty-state-actions">
            <button
              className="btn-primary"
              onClick={() => setShowArchetypeSelector(true)}
            >
              Create from Archetype
            </button>
            <button
              className="btn-secondary"
              onClick={handleCreateBlank}
            >
              Start Blank Profile
            </button>
          </div>
        </div>

        {showArchetypeSelector && (
          <ArchetypeSelector
            archetypes={archetypes}
            onSelect={handleCreateFromArchetype}
            onCancel={() => setShowArchetypeSelector(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="profile-builder">
      {/* Controls Bar */}
      <div className="profile-controls">
        <div className="profile-header">
          <input
            type="text"
            value={selectedProfile.name}
            onChange={(e) =>
              onUpdateProfile(selectedProfile.id, { name: e.target.value })
            }
            className="profile-name-input"
          />
          <div className="profile-meta">
            <select
              value={selectedProfile.seniorityLevel}
              onChange={(e) =>
                onUpdateProfile(selectedProfile.id, {
                  seniorityLevel: e.target.value as any
                })
              }
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="principal">Principal</option>
              <option value="staff">Staff</option>
            </select>
            <input
              type="text"
              value={selectedProfile.domain}
              onChange={(e) =>
                onUpdateProfile(selectedProfile.id, { domain: e.target.value })
              }
              placeholder="Domain (e.g., platform, growth)"
              className="domain-input"
            />
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? '✏️ Edit' : '👁️ Preview'}
          </button>
          <button onClick={() => {/* TODO: Export */}}>
            📥 Export
          </button>
          <button
            onClick={() => {
              if (confirm('Delete this profile?')) {
                onDeleteProfile(selectedProfile.id);
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
        <ProfilePreview profile={selectedProfile} contentBlocks={contentBlocks} />
      ) : (
        <ProfileCanvas
          profile={selectedProfile}
          contentBlocks={contentBlocks}
          onAddSkill={onAddSkillToProfile}
          onRemoveSkill={onRemoveSkillFromProfile}
          onUpdateProfile={onUpdateProfile}
        />
      )}
    </div>
  );
}
