import type {
  ContentBlock,
  CandidateArchetype,
  RecruitmentBuilderState
} from './types';

// ============================================
// CANDIDATE ARCHETYPES (From Research)
// ============================================

export const CANDIDATE_ARCHETYPES: CandidateArchetype[] = [
  {
    id: 'archetype-mid-pm',
    name: 'Mid-Level PM (Team-Embedded)',
    description: 'PM who runs high-performing squad, ships iteratively, role-models AI for their team',
    seniorityLevel: 'mid',
    baselineSkillIds: [
      'skill-product-execution',
      'skill-ai-daily-use',
      'skill-team-enablement',
      'skill-ai-chapter-participation'
    ],
    baselineRequirementIds: [
      'req-3-5-years',
      'req-ai-tool-portfolio',
      'req-sprint-shipping',
      'req-outcome-measurement'
    ],
    sourceDocument: '/Research/pm-mid-embedded-perplexity.md'
  },
  {
    id: 'archetype-senior-pm',
    name: 'Senior PM (Cross-Product, AI Chapter Leader)',
    description: 'Strategic PM with multi-quarter vision, AI Chapter co-leadership, cross-team influence',
    seniorityLevel: 'senior',
    baselineSkillIds: [
      'skill-strategic-leadership',
      'skill-advanced-ai-fluency',
      'skill-ai-chapter-leadership',
      'skill-governance-standards'
    ],
    baselineRequirementIds: [
      'req-6-8-years',
      'req-ai-augmented-features',
      'req-cross-functional-influence',
      'req-ai-dr-authoring'
    ],
    sourceDocument: '/Research/pm-senior-cross-team-perplexity.md'
  },
  {
    id: 'archetype-principal-pm',
    name: 'Principal PM (Platform & AI Enablement)',
    description: 'Technical PM owning platform strategy, org-wide AI enablement, competitive moat',
    seniorityLevel: 'principal',
    baselineSkillIds: [
      'skill-platform-thinking',
      'skill-ai-native-vision',
      'skill-technical-fluency',
      'skill-ai-chapter-ownership'
    ],
    baselineRequirementIds: [
      'req-8-12-years',
      'req-ai-native-products',
      'req-ml-partnership',
      'req-thought-leadership'
    ],
    sourceDocument: '/Research/pm-principal-platform-ai-perplexity.md'
  }
];

// ============================================
// SEED CONTENT BLOCKS
// ============================================

export const SEED_CONTENT_BLOCKS: ContentBlock[] = [
  // ========== SKILLS ==========
  {
    id: 'skill-product-execution',
    type: 'skill',
    title: 'Product Execution',
    content: 'Runs weekly discovery and delivery cadence (interviews, prototypes, experiments, story mapping, prioritization). Ships improvements every sprint; measures outcomes, not just output.',
    category: 'product',
    tags: ['execution', 'agile', 'delivery'],
    metadata: { seniorityLevel: ['mid', 'senior'] }
  },
  {
    id: 'skill-ai-daily-use',
    type: 'skill',
    title: 'AI Fluency in Daily Work',
    content: 'Uses AI tools (Claude, Copilot, Cursor, etc.) to draft PRDs, analyze user feedback at scale, generate interview scripts, and synthesize competitive research.',
    category: 'ai-fluency',
    tags: ['ai', 'productivity', 'tools'],
    metadata: { seniorityLevel: ['mid', 'senior', 'principal'] }
  },
  {
    id: 'skill-team-enablement',
    type: 'skill',
    title: 'Team Enablement',
    content: 'Coaches designers and engineers on using AI in their workflows (e.g., AI-assisted design ideation, code review, test generation). Celebrates early adopters and nudges laggards.',
    category: 'leadership',
    tags: ['coaching', 'ai', 'team'],
    metadata: { seniorityLevel: ['mid', 'senior'] }
  },
  {
    id: 'skill-ai-chapter-participation',
    type: 'skill',
    title: 'AI Chapter Participation',
    content: 'Attends chapter meetings, shares team-level patterns (prompt libraries, tooling wins, gotchas), and participates in AI-DR reviews for cross-squad initiatives.',
    category: 'governance',
    tags: ['ai-chapter', 'collaboration'],
    metadata: { seniorityLevel: ['mid', 'senior', 'principal'] }
  },
  {
    id: 'skill-strategic-leadership',
    type: 'skill',
    title: 'Strategic Product Leadership',
    content: 'Defines multi-quarter strategy, aligns stakeholders, and makes tough scope trade-offs. Connects daily work to business outcomes (revenue, margin, strategic moats).',
    category: 'product',
    tags: ['strategy', 'leadership', 'stakeholders'],
    metadata: { seniorityLevel: ['senior', 'principal'] }
  },
  {
    id: 'skill-advanced-ai-fluency',
    type: 'skill',
    title: 'Advanced AI Fluency and Enablement',
    content: 'Not just uses AI tools, but designs AI-augmented workflows for their domain. Runs internal workshops and lunch-and-learns. Mentors 2–3 PMs on AI adoption.',
    category: 'ai-fluency',
    tags: ['ai', 'mentoring', 'workflows'],
    metadata: { seniorityLevel: ['senior', 'principal'] }
  },
  {
    id: 'skill-ai-chapter-leadership',
    type: 'skill',
    title: 'AI Chapter Leadership',
    content: 'Co-leads a Chapter guild. Proposes and shepherds AI-DRs for high-impact decisions. Evaluates third-party AI tools and makes buy/build/partner recommendations.',
    category: 'leadership',
    tags: ['ai-chapter', 'governance', 'leadership'],
    metadata: { seniorityLevel: ['senior', 'principal'] }
  },
  {
    id: 'skill-governance-standards',
    type: 'skill',
    title: 'Governance and Standards',
    content: 'Ensures product area adheres to AI Chapter standards for ethics, privacy, and data handling. Partners with legal and security on risk reviews.',
    category: 'governance',
    tags: ['compliance', 'ethics', 'security'],
    metadata: { seniorityLevel: ['senior', 'principal'] }
  },
  {
    id: 'skill-platform-thinking',
    type: 'skill',
    title: 'Platform & Ecosystem Thinking',
    content: 'Designs extensible platforms, APIs, and data models that multiple product lines consume. Balances near-term enablement with long-term architectural integrity.',
    category: 'technical',
    tags: ['platform', 'architecture', 'apis'],
    metadata: { seniorityLevel: ['principal'], domain: ['platform', 'api'] }
  },
  {
    id: 'skill-ai-native-vision',
    type: 'skill',
    title: 'AI-Native Product Vision',
    content: 'Defines how AI (models, agents, copilots) transforms core user journeys and internal operations. Can articulate a 3-year vision for AI-augmented product development.',
    category: 'product',
    tags: ['ai', 'vision', 'strategy'],
    metadata: { seniorityLevel: ['principal'] }
  },
  {
    id: 'skill-technical-fluency',
    type: 'skill',
    title: 'Technical Fluency & ML Partnership',
    content: 'Partners with ML engineers on model selection, fine-tuning, and evaluation. Defines guardrails, human-in-the-loop patterns, and responsible AI policies.',
    category: 'technical',
    tags: ['ml', 'technical', 'ai'],
    metadata: { seniorityLevel: ['principal'] }
  },
  {
    id: 'skill-ai-chapter-ownership',
    type: 'skill',
    title: 'AI Chapter Co-Leadership',
    content: 'Co-owns the AI Chapter roadmap with Engineering/AI leadership. Defines AI-DR templates, runs chapter-wide workshops, and sets literacy standards.',
    category: 'leadership',
    tags: ['ai-chapter', 'governance', 'org-wide'],
    metadata: { seniorityLevel: ['principal'] }
  },

  // ========== REQUIREMENTS ==========
  {
    id: 'req-3-5-years',
    type: 'requirement',
    title: '3–5 Years Experience',
    content: '3–5 years in product management, with at least 2 years in a tech/SaaS environment.',
    category: 'experience',
    tags: ['experience', 'years'],
    metadata: { seniorityLevel: ['mid'] }
  },
  {
    id: 'req-6-8-years',
    type: 'requirement',
    title: '6–8+ Years Experience',
    content: '6–8+ years in product management, with at least 3 years in B2B SaaS, platform, or infrastructure products.',
    category: 'experience',
    tags: ['experience', 'years'],
    metadata: { seniorityLevel: ['senior'] }
  },
  {
    id: 'req-8-12-years',
    type: 'requirement',
    title: '8–12+ Years Experience',
    content: '8–12+ years in product management, with significant depth in platform, infrastructure, or developer tools.',
    category: 'experience',
    tags: ['experience', 'years'],
    metadata: { seniorityLevel: ['principal'] }
  },
  {
    id: 'req-ai-tool-portfolio',
    type: 'requirement',
    title: 'AI Tool Portfolio',
    content: 'Demonstrable experience using AI productivity tools in product process (e.g., "I used Claude to analyze 500 support tickets and surfaced three new opportunity areas").',
    category: 'ai-fluency',
    tags: ['ai', 'portfolio', 'tools'],
    metadata: { seniorityLevel: ['mid', 'senior', 'principal'] }
  },
  {
    id: 'req-sprint-shipping',
    type: 'requirement',
    title: 'Sprint Shipping Cadence',
    content: 'Track record of driving measurable user or business outcomes (adoption, retention, revenue, or efficiency gains). Comfort with ambiguity and rapid iteration.',
    category: 'execution',
    tags: ['shipping', 'outcomes'],
    metadata: { seniorityLevel: ['mid', 'senior'] }
  },
  {
    id: 'req-outcome-measurement',
    type: 'requirement',
    title: 'Outcome Measurement',
    content: 'Can show examples of pivoting based on data or feedback. Measures outcomes, not just output.',
    category: 'data',
    tags: ['metrics', 'data-driven'],
    metadata: { seniorityLevel: ['mid', 'senior', 'principal'] }
  },
  {
    id: 'req-ai-augmented-features',
    type: 'requirement',
    title: 'AI-Augmented Features Launched',
    content: 'Proven track record of launching AI-augmented features or internal tooling that drove measurable productivity or revenue gains.',
    category: 'ai-fluency',
    tags: ['ai', 'features', 'shipping'],
    metadata: { seniorityLevel: ['senior', 'principal'] }
  },
  {
    id: 'req-cross-functional-influence',
    type: 'requirement',
    title: 'Cross-Functional Influence',
    content: 'Evidence of cross-functional influence: has led initiatives requiring engineering, design, data science, sales, and support alignment.',
    category: 'leadership',
    tags: ['influence', 'cross-functional'],
    metadata: { seniorityLevel: ['senior', 'principal'] }
  },
  {
    id: 'req-ai-dr-authoring',
    type: 'requirement',
    title: 'AI-DR Experience',
    content: 'Experience with governance, compliance, or technical standards (e.g., SOC2, GDPR, ADRs/AI-DRs). Can author and review AI Design Records.',
    category: 'governance',
    tags: ['ai-dr', 'governance', 'compliance'],
    metadata: { seniorityLevel: ['senior', 'principal'] }
  },
  {
    id: 'req-ai-native-products',
    type: 'requirement',
    title: 'AI-Native Product Experience',
    content: 'Demonstrable experience shipping AI-native products or major AI-enabled platforms (e.g., recommendation engines, agentic workflows, LLM-powered developer tools).',
    category: 'product',
    tags: ['ai', 'platform', 'shipping'],
    metadata: { seniorityLevel: ['principal'] }
  },
  {
    id: 'req-ml-partnership',
    type: 'requirement',
    title: 'ML/AI Engineering Partnership',
    content: 'Strong technical background: CS degree, engineering experience, or equivalent. Can read API docs, understand model trade-offs, and reason about latency/cost/quality.',
    category: 'technical',
    tags: ['ml', 'engineering', 'technical'],
    metadata: { seniorityLevel: ['principal'] }
  },
  {
    id: 'req-thought-leadership',
    type: 'requirement',
    title: 'Thought Leadership',
    content: 'Published thought leadership (blog posts, conference talks) on AI product management or platform strategy is a strong plus.',
    category: 'communication',
    tags: ['writing', 'speaking', 'leadership'],
    metadata: { seniorityLevel: ['principal'] }
  },

  // ========== BENEFITS ==========
  {
    id: 'benefit-ai-tools',
    type: 'benefit',
    title: 'AI-Powered Productivity',
    content: 'ChatGPT Pro ($200/month) and Claude Pro ($20/month) licenses to supercharge your work. Access to cutting-edge prototyping tools (Cursor Pro, Replit Teams, Lovable, GitHub Copilot). Perplexity Pro for research. NotebookLM for synthesis.',
    category: 'compensation',
    tags: ['ai', 'tools', 'productivity'],
    metadata: {}
  },
  {
    id: 'benefit-learning',
    type: 'benefit',
    title: 'Learning & Experimentation',
    content: '€10,000/quarter team experimentation budget for trying new AI tools and technologies. €2,000/year personal learning budget for courses, certifications, and conferences. 10% time dedicated to AI experimentation and side projects. Quarterly AI hackathons and innovation challenges.',
    category: 'growth',
    tags: ['learning', 'budget', 'growth'],
    metadata: {}
  },
  {
    id: 'benefit-growth',
    type: 'benefit',
    title: 'Professional Growth',
    content: 'Clear paths to Senior PM, Principal PM, and Director roles. Opportunity to shape AI strategy at company level. Active participation in our AI Chapter governance. Mentorship from AI-savvy product leaders.',
    category: 'career',
    tags: ['career', 'growth', 'mentorship'],
    metadata: {}
  },

  // ========== VALUES (Simployer) ==========
  {
    id: 'value-learn',
    type: 'value',
    title: 'Learn',
    content: 'We are continuous learners who embrace curiosity and adapt swiftly to changes. AI era requires lifetime learning.',
    category: 'culture',
    tags: ['values', 'learning'],
    metadata: {}
  },
  {
    id: 'value-lead',
    type: 'value',
    title: 'Lead',
    content: 'We take ownership and lead by example. We champion AI adoption and role-model effective use.',
    category: 'culture',
    tags: ['values', 'leadership'],
    metadata: {}
  },
  {
    id: 'value-deliver',
    type: 'value',
    title: 'Deliver',
    content: 'We ship outcomes, not just output. We measure impact and iterate based on data.',
    category: 'culture',
    tags: ['values', 'execution'],
    metadata: {}
  },

  // ========== RED FLAGS ==========
  {
    id: 'redflag-vague-ai',
    type: 'red_flag',
    title: 'Vague AI Experience',
    content: 'Claims AI experience but only "used ChatGPT once to summarize a meeting." Can\'t name specific daily AI tools. No portfolio of prototypes.',
    category: 'screening',
    tags: ['red-flag', 'ai'],
    metadata: {}
  },
  {
    id: 'redflag-no-learning',
    type: 'red_flag',
    title: 'No Learning Evidence',
    content: 'Haven\'t tried new AI tools recently. Can\'t explain failures/learnings. No online presence (GitHub, blogs, etc.).',
    category: 'screening',
    tags: ['red-flag', 'learning'],
    metadata: {}
  },
  {
    id: 'redflag-no-governance',
    type: 'red_flag',
    title: 'Avoids Governance',
    content: 'Treats AI Chapter as distraction. Cannot point to specific AI-DRs authored or reviewed. Defers all governance questions to legal.',
    category: 'screening',
    tags: ['red-flag', 'governance'],
    metadata: { seniorityLevel: ['senior', 'principal'] }
  },

  // ========== QUESTIONS (Interview) ==========
  {
    id: 'question-prototyping',
    type: 'question',
    title: 'Prototyping Skills Assessment',
    content: 'Walk me through a recent project where you built something with AI tools. What did you build, what tools did you use, and how long did it take?',
    category: 'interview',
    tags: ['ai', 'prototyping', 'technical'],
    metadata: { weight: 5 }
  },
  {
    id: 'question-technical-understanding',
    type: 'question',
    title: 'AI Feature Evaluation',
    content: 'Explain how you would evaluate whether an AI feature is performing well in production.',
    category: 'interview',
    tags: ['ai', 'metrics', 'technical'],
    metadata: { weight: 4 }
  },
  {
    id: 'question-learning',
    type: 'question',
    title: 'Continuous Learning',
    content: 'What AI tools or technologies have you experimented with in the last 3 months? What did you learn?',
    category: 'interview',
    tags: ['learning', 'curiosity'],
    metadata: { weight: 3 }
  },
  {
    id: 'question-strategic',
    type: 'question',
    title: 'Strategic Decision Making',
    content: 'Walk me through your process for deciding whether to build an AI feature vs. a traditional feature.',
    category: 'interview',
    tags: ['strategy', 'decision-making'],
    metadata: { weight: 4 }
  },

  // ========== EVALUATION CRITERIA ==========
  {
    id: 'criteria-technical-fluency',
    type: 'evaluation_criteria',
    title: 'Technical Fluency',
    content: 'AI/ML concept understanding. Prototyping tool experience. Data literacy.',
    category: 'evaluation',
    tags: ['technical', 'scoring'],
    metadata: {}
  },
  {
    id: 'criteria-execution',
    type: 'evaluation_criteria',
    title: 'Execution Capability',
    content: 'Portfolio of built projects. Speed of iteration. Evidence of shipping products.',
    category: 'evaluation',
    tags: ['execution', 'scoring'],
    metadata: {}
  },
  {
    id: 'criteria-learning',
    type: 'evaluation_criteria',
    title: 'Learning Mindset',
    content: 'Recent experimentation. Adaptation to new tools. Intellectual humility.',
    category: 'evaluation',
    tags: ['learning', 'scoring'],
    metadata: {}
  },
  {
    id: 'criteria-strategic',
    type: 'evaluation_criteria',
    title: 'Strategic Thinking',
    content: 'User value orientation. Ethical considerations. Business alignment.',
    category: 'evaluation',
    tags: ['strategy', 'scoring'],
    metadata: {}
  }
];

// ============================================
// INITIAL APP STATE
// ============================================

export const INITIAL_STATE: RecruitmentBuilderState = {
  contentBlocks: SEED_CONTENT_BLOCKS,
  candidateArchetypes: CANDIDATE_ARCHETYPES,
  tabs: [],
  activeTabId: null,
  activeModule: 'library',
  darkMode: true,
  libraryFilter: {},
  previewVisible: false
};
