import type { CandidateProfile, ContentBlock } from '../../types';

interface ProfilePreviewProps {
  profile: CandidateProfile;
  contentBlocks: ContentBlock[];
}

export default function ProfilePreview({
  profile,
  contentBlocks
}: ProfilePreviewProps) {
  // Helper to get block by ID
  const getBlock = (id: string) => contentBlocks.find((b) => b.id === id);

  // Collect all required blocks
  const requiredBlocks = [
    ...profile.requiredSkillIds,
    ...profile.requiredExperienceIds,
    ...profile.aiToolRequirementIds
  ]
    .map(getBlock)
    .filter(Boolean) as ContentBlock[];

  const preferredBlocks = profile.preferredSkillIds
    .map(getBlock)
    .filter(Boolean) as ContentBlock[];

  const redFlagBlocks = profile.redFlagIds
    .map(getBlock)
    .filter(Boolean) as ContentBlock[];

  // Generate markdown
  const markdown = `# ${profile.name}

**Seniority Level:** ${profile.seniorityLevel.charAt(0).toUpperCase() + profile.seniorityLevel.slice(1)}
**Domain:** ${profile.domain}
${profile.archetypeId ? `**Based on Archetype:** ${profile.archetypeId}` : ''}

## Required Skills & Requirements

${requiredBlocks.length > 0
  ? requiredBlocks.map(block => `- **${block.title}**: ${block.content}`).join('\n\n')
  : '*No required skills defined*'
}

## Preferred Skills

${preferredBlocks.length > 0
  ? preferredBlocks.map(block => `- **${block.title}**: ${block.content}`).join('\n\n')
  : '*No preferred skills defined*'
}

## Red Flags

${redFlagBlocks.length > 0
  ? redFlagBlocks.map(block => `- **${block.title}**: ${block.content}`).join('\n\n')
  : '*No red flags defined*'
}

${profile.notes ? `## Additional Notes\n\n${profile.notes}` : ''}

---
*Generated: ${new Date(profile.updatedAt).toLocaleDateString()}*
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert('Markdown copied to clipboard!');
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="profile-preview">
      <div className="preview-toolbar">
        <button onClick={handleCopyMarkdown} className="btn-secondary">
          📋 Copy Markdown
        </button>
        <button onClick={handleDownloadMarkdown} className="btn-primary">
          💾 Download .md
        </button>
      </div>

      <div className="preview-content">
        {/* Rendered Preview */}
        <div className="markdown-preview">
          <h1>{profile.name}</h1>

          <div className="profile-meta-preview">
            <p><strong>Seniority Level:</strong> {profile.seniorityLevel.charAt(0).toUpperCase() + profile.seniorityLevel.slice(1)}</p>
            <p><strong>Domain:</strong> {profile.domain}</p>
            {profile.archetypeId && (
              <p><strong>Based on Archetype:</strong> {profile.archetypeId}</p>
            )}
          </div>

          <h2>Required Skills & Requirements</h2>
          {requiredBlocks.length > 0 ? (
            <ul className="preview-list">
              {requiredBlocks.map((block) => (
                <li key={block.id}>
                  <strong>{block.title}:</strong> {block.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-section">No required skills defined</p>
          )}

          <h2>Preferred Skills</h2>
          {preferredBlocks.length > 0 ? (
            <ul className="preview-list">
              {preferredBlocks.map((block) => (
                <li key={block.id}>
                  <strong>{block.title}:</strong> {block.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-section">No preferred skills defined</p>
          )}

          <h2>Red Flags</h2>
          {redFlagBlocks.length > 0 ? (
            <ul className="preview-list">
              {redFlagBlocks.map((block) => (
                <li key={block.id}>
                  <strong>{block.title}:</strong> {block.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-section">No red flags defined</p>
          )}

          {profile.notes && (
            <>
              <h2>Additional Notes</h2>
              <p className="notes-preview">{profile.notes}</p>
            </>
          )}

          <hr />
          <p className="preview-footer">
            <em>Generated: {new Date(profile.updatedAt).toLocaleDateString()}</em>
          </p>
        </div>
      </div>
    </div>
  );
}
