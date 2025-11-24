import { useMemo } from 'react';
import type { JobAd, ContentBlock } from '../../types';

interface JobAdPreviewProps {
  jobAd: JobAd;
  contentBlocks: ContentBlock[];
}

export default function JobAdPreview({ jobAd, contentBlocks }: JobAdPreviewProps) {
  const markdown = useMemo(() => {
    const sortedSections = [...jobAd.sections].sort((a, b) => a.position - b.position);

    let md = `# ${jobAd.roleTitle || jobAd.title}\n\n`;

    // Add metadata
    if (jobAd.department || jobAd.location || jobAd.employmentType) {
      md += `**Department:** ${jobAd.department || 'N/A'}  \n`;
      md += `**Location:** ${jobAd.location || 'N/A'}  \n`;
      md += `**Employment Type:** ${jobAd.employmentType}  \n`;
      md += `**Seniority Level:** ${jobAd.seniorityLevel}\n\n`;
    }

    if (jobAd.metadata?.salaryRange) {
      md += `**Salary Range:** ${jobAd.metadata.salaryRange}\n\n`;
    }

    md += '---\n\n';

    // Add sections
    sortedSections.forEach((section) => {
      md += `## ${section.title}\n\n`;

      // Add custom markdown for custom sections
      if (section.type === 'custom' && section.customMarkdown) {
        md += `${section.customMarkdown}\n\n`;
      }

      // Add content blocks
      const sectionBlocks = contentBlocks.filter((block) =>
        section.contentBlockIds.includes(block.id)
      );

      if (sectionBlocks.length > 0) {
        sectionBlocks.forEach((block) => {
          if (section.type === 'responsibilities' || section.type === 'requirements') {
            md += `- **${block.title}**: ${block.content}\n`;
          } else {
            md += `### ${block.title}\n\n${block.content}\n\n`;
          }
        });
        md += '\n';
      }

      // Add static content
      if (section.content) {
        md += `${section.content}\n\n`;
      }
    });

    md += '---\n\n';
    md += `*Generated with Recruitment Builder on ${new Date().toLocaleDateString()}*\n`;

    return md;
  }, [jobAd, contentBlocks]);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert('Markdown copied to clipboard!');
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jobAd.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="jobad-preview">
      <div className="preview-toolbar">
        <button onClick={handleCopyMarkdown} className="btn-secondary">
          📋 Copy Markdown
        </button>
        <button onClick={handleDownloadMarkdown} className="btn-secondary">
          💾 Download .md
        </button>
      </div>

      <div className="preview-content">
        <div className="markdown-preview">
          {/* Header */}
          <h1>{jobAd.roleTitle || jobAd.title}</h1>

          {/* Metadata */}
          <div className="preview-metadata">
            {jobAd.department && (
              <p>
                <strong>Department:</strong> {jobAd.department}
              </p>
            )}
            {jobAd.location && (
              <p>
                <strong>Location:</strong> {jobAd.location}
              </p>
            )}
            <p>
              <strong>Employment Type:</strong> {jobAd.employmentType}
            </p>
            <p>
              <strong>Seniority Level:</strong> {jobAd.seniorityLevel}
            </p>
            {jobAd.metadata?.salaryRange && (
              <p>
                <strong>Salary Range:</strong> {jobAd.metadata.salaryRange}
              </p>
            )}
          </div>

          <hr />

          {/* Sections */}
          {[...jobAd.sections]
            .sort((a, b) => a.position - b.position)
            .map((section) => {
              const sectionBlocks = contentBlocks.filter((block) =>
                section.contentBlockIds.includes(block.id)
              );

              return (
                <div key={section.id} className="preview-section">
                  <h2>{section.title}</h2>

                  {section.type === 'custom' && section.customMarkdown && (
                    <div className="custom-content">
                      <pre>{section.customMarkdown}</pre>
                    </div>
                  )}

                  {sectionBlocks.length > 0 && (
                    <div className="section-blocks-preview">
                      {section.type === 'responsibilities' ||
                      section.type === 'requirements' ? (
                        <ul>
                          {sectionBlocks.map((block) => (
                            <li key={block.id}>
                              <strong>{block.title}:</strong> {block.content}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        sectionBlocks.map((block) => (
                          <div key={block.id} className="block-preview">
                            <h3>{block.title}</h3>
                            <p>{block.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {section.content && (
                    <div className="section-static-content">
                      <p>{section.content}</p>
                    </div>
                  )}
                </div>
              );
            })}

          <hr />

          <p className="preview-footer">
            <em>
              Generated with Recruitment Builder on {new Date().toLocaleDateString()}
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}
