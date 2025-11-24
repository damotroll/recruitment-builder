import { useMemo } from 'react';
import type { CaseStudy, ContentBlock } from '../../types';

interface CaseStudyPreviewProps {
  caseStudy: CaseStudy;
  contentBlocks: ContentBlock[];
}

export default function CaseStudyPreview({ caseStudy, contentBlocks }: CaseStudyPreviewProps) {
  const markdown = useMemo(() => {
    let md = `# ${caseStudy.title}\n\n`;

    md += `**Seniority Level:** ${caseStudy.seniorityLevel}  \n`;
    md += `**Domain:** ${caseStudy.domain}  \n`;
    md += `**Duration:** ${caseStudy.duration} minutes\n\n`;
    md += '---\n\n';

    // Scenario
    md += '## Scenario\n\n';
    if (caseStudy.scenario.context) {
      md += `### Context\n\n${caseStudy.scenario.context}\n\n`;
    }
    if (caseStudy.scenario.challenge) {
      md += `### Challenge\n\n${caseStudy.scenario.challenge}\n\n`;
    }
    if (caseStudy.scenario.constraints.length > 0) {
      md += '### Constraints\n\n';
      caseStudy.scenario.constraints.forEach((constraint) => {
        if (constraint.trim()) {
          md += `- ${constraint}\n`;
        }
      });
      md += '\n';
    }

    // Deliverables
    if (caseStudy.deliverables.length > 0) {
      md += '## Expected Deliverables\n\n';
      caseStudy.deliverables.forEach((deliverable) => {
        if (deliverable.trim()) {
          md += `- ${deliverable}\n`;
        }
      });
      md += '\n';
    }

    // Questions
    const libraryQuestions = contentBlocks.filter((block) =>
      caseStudy.questionIds.includes(block.id)
    );

    if (libraryQuestions.length > 0 || caseStudy.customQuestions.length > 0) {
      md += '## Interview Questions\n\n';

      libraryQuestions.forEach((block, index) => {
        md += `${index + 1}. **${block.title}**\n\n   ${block.content}\n\n`;
      });

      const customStart = libraryQuestions.length;
      caseStudy.customQuestions
        .sort((a, b) => a.position - b.position)
        .forEach((question, index) => {
          if (question.text.trim()) {
            md += `${customStart + index + 1}. ${question.text} *(${question.type})*\n\n`;
          }
        });
    }

    // Evaluation Criteria
    const libraryCriteria = contentBlocks.filter((block) =>
      caseStudy.evaluationCriteriaIds.includes(block.id)
    );

    if (libraryCriteria.length > 0 || caseStudy.customCriteria.length > 0) {
      md += '## Evaluation Criteria\n\n';

      libraryCriteria.forEach((block) => {
        md += `### ${block.title}\n\n${block.content}\n\n`;
      });

      caseStudy.customCriteria
        .sort((a, b) => a.position - b.position)
        .forEach((criteria) => {
          if (criteria.name.trim()) {
            md += `### ${criteria.name}\n\n`;
            if (criteria.description) {
              md += `${criteria.description}\n\n`;
            }
            if (criteria.lookingFor.length > 0) {
              md += '**Looking For:**\n\n';
              criteria.lookingFor.forEach((item) => {
                if (item.trim()) {
                  md += `- ${item}\n`;
                }
              });
              md += '\n';
            }
            if (criteria.redFlags.length > 0) {
              md += '**Red Flags:**\n\n';
              criteria.redFlags.forEach((item) => {
                if (item.trim()) {
                  md += `- ${item}\n`;
                }
              });
              md += '\n';
            }
          }
        });
    }

    md += '---\n\n';
    md += `*Generated with Recruitment Builder on ${new Date().toLocaleDateString()}*\n`;

    return md;
  }, [caseStudy, contentBlocks]);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert('Markdown copied to clipboard!');
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${caseStudy.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const libraryQuestions = contentBlocks.filter((block) =>
    caseStudy.questionIds.includes(block.id)
  );

  const libraryCriteria = contentBlocks.filter((block) =>
    caseStudy.evaluationCriteriaIds.includes(block.id)
  );

  return (
    <div className="casestudy-preview">
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
          <h1>{caseStudy.title}</h1>

          <div className="preview-metadata">
            <p>
              <strong>Seniority Level:</strong> {caseStudy.seniorityLevel}
            </p>
            <p>
              <strong>Domain:</strong> {caseStudy.domain}
            </p>
            <p>
              <strong>Duration:</strong> {caseStudy.duration} minutes
            </p>
          </div>

          <hr />

          {/* Scenario */}
          <h2>Scenario</h2>
          {caseStudy.scenario.context && (
            <>
              <h3>Context</h3>
              <p>{caseStudy.scenario.context}</p>
            </>
          )}
          {caseStudy.scenario.challenge && (
            <>
              <h3>Challenge</h3>
              <p>{caseStudy.scenario.challenge}</p>
            </>
          )}
          {caseStudy.scenario.constraints.length > 0 && (
            <>
              <h3>Constraints</h3>
              <ul>
                {caseStudy.scenario.constraints.map(
                  (constraint, index) =>
                    constraint.trim() && <li key={index}>{constraint}</li>
                )}
              </ul>
            </>
          )}

          {/* Deliverables */}
          {caseStudy.deliverables.length > 0 && (
            <>
              <h2>Expected Deliverables</h2>
              <ul>
                {caseStudy.deliverables.map(
                  (deliverable, index) =>
                    deliverable.trim() && <li key={index}>{deliverable}</li>
                )}
              </ul>
            </>
          )}

          {/* Questions */}
          {(libraryQuestions.length > 0 || caseStudy.customQuestions.length > 0) && (
            <>
              <h2>Interview Questions</h2>
              <ol>
                {libraryQuestions.map((block) => (
                  <li key={block.id}>
                    <strong>{block.title}</strong>
                    <p>{block.content}</p>
                  </li>
                ))}
                {caseStudy.customQuestions
                  .sort((a, b) => a.position - b.position)
                  .map(
                    (question) =>
                      question.text.trim() && (
                        <li key={question.id}>
                          {question.text} <em>({question.type})</em>
                        </li>
                      )
                  )}
              </ol>
            </>
          )}

          {/* Evaluation Criteria */}
          {(libraryCriteria.length > 0 || caseStudy.customCriteria.length > 0) && (
            <>
              <h2>Evaluation Criteria</h2>
              {libraryCriteria.map((block) => (
                <div key={block.id} className="criteria-preview">
                  <h3>{block.title}</h3>
                  <p>{block.content}</p>
                </div>
              ))}
              {caseStudy.customCriteria
                .sort((a, b) => a.position - b.position)
                .map(
                  (criteria) =>
                    criteria.name.trim() && (
                      <div key={criteria.id} className="criteria-preview">
                        <h3>{criteria.name}</h3>
                        {criteria.description && <p>{criteria.description}</p>}
                        {criteria.lookingFor.length > 0 && (
                          <>
                            <p>
                              <strong>Looking For:</strong>
                            </p>
                            <ul>
                              {criteria.lookingFor.map(
                                (item, index) =>
                                  item.trim() && <li key={index}>{item}</li>
                              )}
                            </ul>
                          </>
                        )}
                        {criteria.redFlags.length > 0 && (
                          <>
                            <p>
                              <strong>Red Flags:</strong>
                            </p>
                            <ul>
                              {criteria.redFlags.map(
                                (item, index) =>
                                  item.trim() && <li key={index}>{item}</li>
                              )}
                            </ul>
                          </>
                        )}
                      </div>
                    )
                )}
            </>
          )}

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
