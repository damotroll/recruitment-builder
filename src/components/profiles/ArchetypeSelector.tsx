import type { CandidateArchetype } from '../../types';

interface ArchetypeSelectorProps {
  archetypes: CandidateArchetype[];
  onSelect: (archetype: CandidateArchetype) => void;
  onCancel: () => void;
}

export default function ArchetypeSelector({
  archetypes,
  onSelect,
  onCancel
}: ArchetypeSelectorProps) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Choose an Archetype</h2>
          <button onClick={onCancel} className="modal-close">
            ×
          </button>
        </div>

        <div className="archetype-list">
          {archetypes.map((archetype) => (
            <div
              key={archetype.id}
              className="archetype-card"
              onClick={() => onSelect(archetype)}
            >
              <div className="archetype-header">
                <h3>{archetype.name}</h3>
                <span className="archetype-level">{archetype.seniorityLevel}</span>
              </div>
              <p className="archetype-description">{archetype.description}</p>
              <div className="archetype-meta">
                <span className="archetype-skills">
                  {archetype.baselineSkillIds.length} skills
                </span>
                <span className="archetype-requirements">
                  {archetype.baselineRequirementIds.length} requirements
                </span>
              </div>
              {archetype.sourceDocument && (
                <div className="archetype-source">
                  📄 {archetype.sourceDocument}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
