import type { CandidateProfile, ContentBlock } from '../../types';
import ProfileSection from './ProfileSection';

interface ProfileCanvasProps {
  profile: CandidateProfile;
  contentBlocks: ContentBlock[];
  onAddSkill: (profileId: string, skillId: string, required: boolean) => void;
  onRemoveSkill: (profileId: string, skillId: string, required: boolean) => void;
  onUpdateProfile: (profileId: string, updates: Partial<CandidateProfile>) => void;
}

export default function ProfileCanvas({
  profile,
  contentBlocks,
  onAddSkill,
  onRemoveSkill,
  onUpdateProfile
}: ProfileCanvasProps) {
  // Get blocks for each section
  const requiredSkillBlocks = contentBlocks.filter(
    (block) =>
      profile.requiredSkillIds.includes(block.id) ||
      profile.requiredExperienceIds.includes(block.id) ||
      profile.aiToolRequirementIds.includes(block.id)
  );

  const preferredSkillBlocks = contentBlocks.filter((block) =>
    profile.preferredSkillIds.includes(block.id)
  );

  const redFlagBlocks = contentBlocks.filter((block) =>
    profile.redFlagIds.includes(block.id)
  );

  const handleDropInSection = (
    sectionType: 'required' | 'preferred' | 'redflags',
    blockId: string
  ) => {
    const block = contentBlocks.find((b) => b.id === blockId);
    if (!block) return;

    // Determine which array to add to based on block type and section
    if (sectionType === 'required') {
      if (block.type === 'skill') {
        onAddSkill(profile.id, blockId, true);
      } else if (block.type === 'requirement' || block.type === 'experience') {
        onUpdateProfile(profile.id, {
          requiredExperienceIds: [...profile.requiredExperienceIds, blockId]
        });
      } else if (block.type === 'ai_tool') {
        onUpdateProfile(profile.id, {
          aiToolRequirementIds: [...profile.aiToolRequirementIds, blockId]
        });
      }
    } else if (sectionType === 'preferred') {
      if (block.type === 'skill') {
        onAddSkill(profile.id, blockId, false);
      }
    } else if (sectionType === 'redflags') {
      if (block.type === 'red_flag') {
        onUpdateProfile(profile.id, {
          redFlagIds: [...profile.redFlagIds, blockId]
        });
      }
    }
  };

  const handleRemoveBlock = (
    sectionType: 'required' | 'preferred' | 'redflags',
    blockId: string
  ) => {
    const block = contentBlocks.find((b) => b.id === blockId);
    if (!block) return;

    if (sectionType === 'required') {
      if (block.type === 'skill') {
        onRemoveSkill(profile.id, blockId, true);
      } else if (block.type === 'requirement' || block.type === 'experience') {
        onUpdateProfile(profile.id, {
          requiredExperienceIds: profile.requiredExperienceIds.filter(
            (id) => id !== blockId
          )
        });
      } else if (block.type === 'ai_tool') {
        onUpdateProfile(profile.id, {
          aiToolRequirementIds: profile.aiToolRequirementIds.filter(
            (id) => id !== blockId
          )
        });
      }
    } else if (sectionType === 'preferred') {
      if (block.type === 'skill') {
        onRemoveSkill(profile.id, blockId, false);
      }
    } else if (sectionType === 'redflags') {
      onUpdateProfile(profile.id, {
        redFlagIds: profile.redFlagIds.filter((id) => id !== blockId)
      });
    }
  };

  return (
    <div className="profile-canvas">
      <div className="canvas-instructions">
        <p>
          💡 <strong>Tip:</strong> Drag content blocks from the library on the left into the
          sections below to build your candidate profile.
        </p>
      </div>

      <ProfileSection
        title="Required Skills & Requirements"
        description="Must-have qualifications for this role"
        blocks={requiredSkillBlocks}
        onDrop={(blockId) => handleDropInSection('required', blockId)}
        onRemove={(blockId) => handleRemoveBlock('required', blockId)}
        emptyMessage="Drag required skills, requirements, and AI tool proficiencies here"
      />

      <ProfileSection
        title="Preferred Skills"
        description="Nice-to-have qualifications"
        blocks={preferredSkillBlocks}
        onDrop={(blockId) => handleDropInSection('preferred', blockId)}
        onRemove={(blockId) => handleRemoveBlock('preferred', blockId)}
        emptyMessage="Drag preferred skills here"
      />

      <ProfileSection
        title="Red Flags"
        description="Deal-breakers to watch for during screening"
        blocks={redFlagBlocks}
        onDrop={(blockId) => handleDropInSection('redflags', blockId)}
        onRemove={(blockId) => handleRemoveBlock('redflags', blockId)}
        emptyMessage="Drag red flags here"
      />

      <div className="profile-notes">
        <label>
          <strong>Additional Notes</strong>
        </label>
        <textarea
          value={profile.notes}
          onChange={(e) =>
            onUpdateProfile(profile.id, { notes: e.target.value })
          }
          placeholder="Add any additional context, specific requirements, or notes for recruiters..."
          rows={4}
        />
      </div>
    </div>
  );
}
