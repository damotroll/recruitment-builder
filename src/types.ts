// ============================================
// SHARED CONTENT LIBRARY (Cross-module reuse)
// ============================================

export interface ContentBlock {
  id: string;
  type: 'skill' | 'requirement' | 'benefit' | 'value' | 'question' |
        'evaluation_criteria' | 'process_step' | 'red_flag' | 'experience' |
        'ai_tool' | 'responsibility';
  title: string;
  content: string;
  category: string;              // For filtering: 'technical', 'ai-fluency', 'soft-skill', etc.
  tags: string[];                // Free-form tags
  metadata?: {
    seniorityLevel?: string[];   // ['mid', 'senior', 'principal']
    domain?: string[];           // ['platform', 'growth', 'api', etc.]
    weight?: number;             // For scoring/importance
  };
}

// ============================================
// MODULE 1: CANDIDATE PROFILE BUILDER
// ============================================

export interface CandidateProfile {
  id: string;
  name: string;                  // e.g., "Senior PM - Platform Focus"
  archetypeId: string | null;    // Reference to base archetype template
  seniorityLevel: 'junior' | 'mid' | 'senior' | 'principal' | 'staff';
  domain: string;                // 'platform', 'growth', 'api', 'mobile', etc.

  // Drag-dropped content blocks
  requiredSkillIds: string[];    // Must-have skills
  preferredSkillIds: string[];   // Nice-to-have skills
  requiredExperienceIds: string[]; // Must-have experiences
  aiToolRequirementIds: string[]; // AI fluency requirements
  responsibilityIds: string[];    // Role responsibilities
  redFlagIds: string[];          // Deal-breakers

  // Custom sections not from library
  customSections: CustomSection[];

  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  position: number;
}

// Archetype templates (like research profiles)
export interface CandidateArchetype {
  id: string;
  name: string;                  // "Mid-Level PM (Team-Embedded)"
  description: string;
  seniorityLevel: string;
  baselineSkillIds: string[];    // Default skills for this archetype
  baselineRequirementIds: string[];
  sourceDocument?: string;       // Reference to research doc
}

// ============================================
// MODULE 2: JOB AD BUILDER
// ============================================

export interface JobAd {
  id: string;
  title: string;                 // Internal title for the job ad
  roleTitle: string;             // "Product Manager - API & Integrations"
  department: string;            // "Product", "Engineering", etc.
  location: string;              // "Remote", "Oslo, Norway", etc.
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  seniorityLevel: 'junior' | 'mid' | 'senior' | 'principal' | 'staff';

  // Structured sections (drag-dropped content blocks)
  sections: JobAdSection[];

  // Metadata for customization
  metadata?: {
    salaryRange?: string;
    benefits?: string[];
    requiresVisaSponsorship?: boolean;
    hiringManager?: {
      name: string;
      title: string;
      message: string;             // Personalized message
    };
    variableSubstitutions?: {
      [key: string]: string;       // e.g., {{SIM_WORK_WITH_GREAT_PEOPLE}} → contentBlockId
    };
  };

  candidateProfileId?: string | null; // Optional reference to profile
  status?: 'draft' | 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface JobAdSection {
  id: string;
  type: 'intro' | 'responsibilities' | 'requirements' | 'benefits' | 'process' | 'company' | 'custom';
  title: string;                 // "What We Offer", "Skills & Requirements"
  position: number;              // Order in job ad

  // Content can come from multiple sources
  contentBlockIds: string[];     // References to content blocks
  content?: string;              // Additional static content
  customMarkdown?: string;       // For custom sections
}

// ============================================
// MODULE 3: CASE STUDY BUILDER
// ============================================

export interface CaseStudy {
  id: string;
  title: string;                 // "Platform API Design Case"
  seniorityLevel: 'mid' | 'senior' | 'principal';
  domain: string;                // 'platform', 'growth', etc.
  candidateProfileId: string | null; // Optional reference

  // Case structure
  scenario: {
    context: string;             // Background/setup
    challenge: string;           // Problem to solve
    constraints: string[];       // Time, resources, etc.
  };

  // Drag-dropped questions
  questionIds: string[];         // References to ContentBlocks (type: 'question')

  // Drag-dropped evaluation criteria
  evaluationCriteriaIds: string[]; // References to ContentBlocks (type: 'evaluation_criteria')

  // Custom sections
  customQuestions: CustomQuestion[];
  customCriteria: CustomCriteria[];

  duration: number;              // Minutes
  deliverables: string[];        // What candidate should produce

  status: 'draft' | 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CustomQuestion {
  id: string;
  text: string;
  type: 'open-ended' | 'framework' | 'technical' | 'strategic';
  position: number;
}

export interface CustomCriteria {
  id: string;
  name: string;
  description: string;
  lookingFor: string[];
  redFlags: string[];
  position: number;
}

// ============================================
// TAB SYSTEM (Version management)
// ============================================

export interface Tab {
  id: string;
  name: string;
  moduleType: 'profiles' | 'jobads' | 'casestudies';
  state: ModuleState;
  createdAt: string;
}

export type ModuleState =
  | ProfileModuleState
  | JobAdModuleState
  | CaseStudyModuleState;

export interface ProfileModuleState {
  profiles: CandidateProfile[];
  selectedProfileId: string | null;
}

export interface JobAdModuleState {
  jobAds: JobAd[];
  selectedJobAdId: string | null;
}

export interface CaseStudyModuleState {
  caseStudies: CaseStudy[];
  selectedCaseStudyId: string | null;
}

// ============================================
// COMPLETE APP STATE
// ============================================

export interface RecruitmentBuilderState {
  // Shared content library
  contentBlocks: ContentBlock[];

  // Archetype templates
  candidateArchetypes: CandidateArchetype[];

  // Tab system
  tabs: Tab[];
  activeTabId: string | null;

  // UI state
  activeModule: 'profiles' | 'jobads' | 'casestudies' | 'library';
  darkMode: boolean;
  libraryFilter: {
    type?: string;
    category?: string;
    tags?: string[];
    searchQuery?: string;
  };
  previewVisible: boolean;
}

// ============================================
// REDUCER ACTIONS
// ============================================

export type Action =
  // Tab actions
  | { type: 'ADD_TAB'; moduleType: 'profiles' | 'jobads' | 'casestudies'; name?: string }
  | { type: 'REMOVE_TAB'; tabId: string }
  | { type: 'RENAME_TAB'; tabId: string; name: string }
  | { type: 'CLONE_TAB'; tabId: string }
  | { type: 'SET_ACTIVE_TAB'; tabId: string | null }

  // Module navigation
  | { type: 'SET_ACTIVE_MODULE'; module: 'profiles' | 'jobads' | 'casestudies' | 'library' }

  // Content block actions
  | { type: 'ADD_CONTENT_BLOCK'; block: ContentBlock }
  | { type: 'UPDATE_CONTENT_BLOCK'; blockId: string; updates: Partial<ContentBlock> }
  | { type: 'DELETE_CONTENT_BLOCK'; blockId: string }

  // Candidate profile actions
  | { type: 'ADD_PROFILE'; tabId: string; profile: CandidateProfile }
  | { type: 'UPDATE_PROFILE'; tabId: string; profileId: string; updates: Partial<CandidateProfile> }
  | { type: 'DELETE_PROFILE'; tabId: string; profileId: string }
  | { type: 'SELECT_PROFILE'; tabId: string; profileId: string | null }
  | { type: 'ADD_SKILL_TO_PROFILE'; tabId: string; profileId: string; skillId: string; required: boolean }
  | { type: 'REMOVE_SKILL_FROM_PROFILE'; tabId: string; profileId: string; skillId: string; required: boolean }

  // Job ad actions
  | { type: 'ADD_JOB_AD'; tabId: string; jobAd: JobAd }
  | { type: 'UPDATE_JOB_AD'; tabId: string; jobAdId: string; updates: Partial<JobAd> }
  | { type: 'DELETE_JOB_AD'; tabId: string; jobAdId: string }
  | { type: 'SELECT_JOB_AD'; tabId: string; jobAdId: string | null }
  | { type: 'ADD_SECTION_TO_JOB_AD'; tabId: string; jobAdId: string; section: JobAdSection }
  | { type: 'UPDATE_SECTION'; tabId: string; jobAdId: string; sectionId: string; updates: Partial<JobAdSection> }
  | { type: 'REMOVE_SECTION'; tabId: string; jobAdId: string; sectionId: string }
  | { type: 'REORDER_SECTION'; tabId: string; jobAdId: string; sectionId: string; newPosition: number }

  // Case study actions
  | { type: 'ADD_CASE_STUDY'; tabId: string; caseStudy: CaseStudy }
  | { type: 'UPDATE_CASE_STUDY'; tabId: string; caseStudyId: string; updates: Partial<CaseStudy> }
  | { type: 'DELETE_CASE_STUDY'; tabId: string; caseStudyId: string }
  | { type: 'SELECT_CASE_STUDY'; tabId: string; caseStudyId: string | null }

  // UI actions
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_LIBRARY_FILTER'; filter: Partial<RecruitmentBuilderState['libraryFilter']> }
  | { type: 'TOGGLE_PREVIEW' }

  // Data import/export
  | { type: 'IMPORT_STATE'; state: Partial<RecruitmentBuilderState> }
  | { type: 'RESET_STATE' };

// ============================================
// UTILITY TYPES
// ============================================

export interface DragItem {
  type: 'contentBlock' | 'section';
  id: string;
  sourceType?: string;
}

export interface ExportOptions {
  format: 'markdown' | 'json' | 'pdf';
  includeComments?: boolean;
  template?: string;
}
