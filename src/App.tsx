import { useReducer, useEffect } from 'react';
import { appReducer } from './state/appReducer';
import { INITIAL_STATE } from './initialData';
import type { RecruitmentBuilderState, ProfileModuleState, JobAdModuleState, CaseStudyModuleState } from './types';
import ProfileBuilder from './components/profiles/ProfileBuilder';
import JobAdBuilder from './components/jobads/JobAdBuilder';
import CaseStudyBuilder from './components/casestudies/CaseStudyBuilder';
import ContentLibraryPanel from './components/shared/ContentLibraryPanel';
import './App.css';

const STORAGE_KEY = 'recruitment-builder-state';

function App() {
  // Load initial state from localStorage or use default
  const loadInitialState = (): RecruitmentBuilderState => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with INITIAL_STATE to ensure new fields are added
        return {
          ...INITIAL_STATE,
          ...parsed,
          // Ensure content blocks and archetypes from INITIAL_STATE are preserved if missing
          contentBlocks: parsed.contentBlocks || INITIAL_STATE.contentBlocks,
          candidateArchetypes: parsed.candidateArchetypes || INITIAL_STATE.candidateArchetypes
        };
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
    return INITIAL_STATE;
  };

  const [state, dispatch] = useReducer(appReducer, null, loadInitialState);

  // Persist to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, [state]);

  // Apply dark mode class to body
  useEffect(() => {
    if (state.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [state.darkMode]);

  const handleModuleChange = (module: typeof state.activeModule) => {
    dispatch({ type: 'SET_ACTIVE_MODULE', module });
  };

  const handleAddTab = (moduleType: 'profiles' | 'jobads' | 'casestudies') => {
    dispatch({ type: 'ADD_TAB', moduleType });
  };

  const handleToggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  // Get active tab (must match current module type)
  const activeTab = state.tabs.find(
    (tab) =>
      tab.id === state.activeTabId &&
      (state.activeModule === 'library' || tab.moduleType === state.activeModule)
  );

  // Filter content blocks based on library filter
  const filteredBlocks = state.contentBlocks.filter((block) => {
    if (state.libraryFilter.type && block.type !== state.libraryFilter.type) {
      return false;
    }
    if (state.libraryFilter.category && block.category !== state.libraryFilter.category) {
      return false;
    }
    if (state.libraryFilter.searchQuery) {
      const query = state.libraryFilter.searchQuery.toLowerCase();
      return (
        block.title.toLowerCase().includes(query) ||
        block.content.toLowerCase().includes(query) ||
        block.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  // Group blocks by type
  const blocksByType = filteredBlocks.reduce((acc, block) => {
    if (!acc[block.type]) {
      acc[block.type] = [];
    }
    acc[block.type].push(block);
    return acc;
  }, {} as Record<string, typeof filteredBlocks>);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>Recruitment Builder</h1>
        <div className="header-actions">
          <button onClick={handleToggleDarkMode}>
            {state.darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Module Navigation */}
      <nav className="module-nav">
        <button
          className={state.activeModule === 'profiles' ? 'active' : ''}
          onClick={() => handleModuleChange('profiles')}
        >
          📋 Candidate Profiles
        </button>
        <button
          className={state.activeModule === 'jobads' ? 'active' : ''}
          onClick={() => handleModuleChange('jobads')}
        >
          📄 Job Ads
        </button>
        <button
          className={state.activeModule === 'casestudies' ? 'active' : ''}
          onClick={() => handleModuleChange('casestudies')}
        >
          📝 Case Studies
        </button>
        <button
          className={state.activeModule === 'library' ? 'active' : ''}
          onClick={() => handleModuleChange('library')}
        >
          📚 Content Library
        </button>
      </nav>

      {/* Tab Bar (for non-library modules) */}
      {state.activeModule !== 'library' && (
        <div className="tab-bar">
          {state.tabs
            .filter((tab) => {
              const moduleType =
                state.activeModule === 'profiles'
                  ? 'profiles'
                  : state.activeModule === 'jobads'
                  ? 'jobads'
                  : 'casestudies';
              return tab.moduleType === moduleType;
            })
            .map((tab) => (
              <button
                key={tab.id}
                className={tab.id === state.activeTabId ? 'active' : ''}
                onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', tabId: tab.id })}
              >
                {tab.name}
                <span
                  className="tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: 'REMOVE_TAB', tabId: tab.id });
                  }}
                >
                  ×
                </span>
              </button>
            ))}
          <button
            className="add-tab"
            onClick={() => {
              const moduleType =
                state.activeModule === 'profiles'
                  ? 'profiles'
                  : state.activeModule === 'jobads'
                  ? 'jobads'
                  : 'casestudies';
              handleAddTab(moduleType);
            }}
          >
            + New Tab
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {state.activeModule === 'library' ? (
          <div className="library-view">
            <div className="library-header">
              <h2>Content Library</h2>
              <p className="library-stats">
                {state.contentBlocks.length} total blocks · {filteredBlocks.length} shown
              </p>
            </div>

            <div className="library-filters">
              <input
                type="text"
                placeholder="Search blocks..."
                value={state.libraryFilter.searchQuery || ''}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_LIBRARY_FILTER',
                    filter: { searchQuery: e.target.value }
                  })
                }
              />
              <select
                value={state.libraryFilter.type || ''}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_LIBRARY_FILTER',
                    filter: { type: e.target.value || undefined }
                  })
                }
              >
                <option value="">All Types</option>
                <option value="skill">Skills</option>
                <option value="requirement">Requirements</option>
                <option value="benefit">Benefits</option>
                <option value="value">Values</option>
                <option value="question">Questions</option>
                <option value="evaluation_criteria">Evaluation Criteria</option>
                <option value="red_flag">Red Flags</option>
              </select>
            </div>

            <div className="library-blocks">
              {Object.entries(blocksByType).map(([type, blocks]) => (
                <div key={type} className="block-group">
                  <h3>{type.replace('_', ' ').toUpperCase()}</h3>
                  <div className="block-list">
                    {blocks.map((block) => (
                      <div key={block.id} className="content-block" draggable>
                        <div className="block-header">
                          <strong>{block.title}</strong>
                          <span className="block-category">{block.category}</span>
                        </div>
                        <p className="block-content">{block.content.substring(0, 150)}...</p>
                        <div className="block-tags">
                          {block.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="module-with-library">
            {/* Content Library Panel */}
            <ContentLibraryPanel
              contentBlocks={state.contentBlocks}
              libraryFilter={state.libraryFilter}
              onSetFilter={(filter) =>
                dispatch({ type: 'SET_LIBRARY_FILTER', filter })
              }
            />

            {/* Module Content */}
            <div className="module-content">
              {state.activeModule === 'profiles' && activeTab ? (
                <ProfileBuilder
                  moduleState={activeTab.state as ProfileModuleState}
                  contentBlocks={state.contentBlocks}
                  archetypes={state.candidateArchetypes}
                  onUpdateProfile={(profileId, updates) =>
                    dispatch({
                      type: 'UPDATE_PROFILE',
                      tabId: activeTab.id,
                      profileId,
                      updates
                    })
                  }
                  onSelectProfile={(profileId) =>
                    dispatch({
                      type: 'SELECT_PROFILE',
                      tabId: activeTab.id,
                      profileId
                    })
                  }
                  onAddProfile={(profile) =>
                    dispatch({
                      type: 'ADD_PROFILE',
                      tabId: activeTab.id,
                      profile
                    })
                  }
                  onDeleteProfile={(profileId) =>
                    dispatch({
                      type: 'DELETE_PROFILE',
                      tabId: activeTab.id,
                      profileId
                    })
                  }
                  onAddSkillToProfile={(profileId, skillId, required) =>
                    dispatch({
                      type: 'ADD_SKILL_TO_PROFILE',
                      tabId: activeTab.id,
                      profileId,
                      skillId,
                      required
                    })
                  }
                  onRemoveSkillFromProfile={(profileId, skillId, required) =>
                    dispatch({
                      type: 'REMOVE_SKILL_FROM_PROFILE',
                      tabId: activeTab.id,
                      profileId,
                      skillId,
                      required
                    })
                  }
                />
              ) : state.activeModule === 'jobads' && activeTab ? (
                <JobAdBuilder
                  moduleState={activeTab.state as JobAdModuleState}
                  contentBlocks={state.contentBlocks}
                  onUpdateJobAd={(jobAdId, updates) =>
                    dispatch({
                      type: 'UPDATE_JOB_AD',
                      tabId: activeTab.id,
                      jobAdId,
                      updates
                    })
                  }
                  onSelectJobAd={(jobAdId) =>
                    dispatch({
                      type: 'SELECT_JOB_AD',
                      tabId: activeTab.id,
                      jobAdId
                    })
                  }
                  onAddJobAd={(jobAd) =>
                    dispatch({
                      type: 'ADD_JOB_AD',
                      tabId: activeTab.id,
                      jobAd
                    })
                  }
                  onDeleteJobAd={(jobAdId) =>
                    dispatch({
                      type: 'DELETE_JOB_AD',
                      tabId: activeTab.id,
                      jobAdId
                    })
                  }
                  onAddSection={(jobAdId, section) =>
                    dispatch({
                      type: 'ADD_SECTION_TO_JOB_AD',
                      tabId: activeTab.id,
                      jobAdId,
                      section
                    })
                  }
                  onUpdateSection={(jobAdId, sectionId, updates) =>
                    dispatch({
                      type: 'UPDATE_SECTION',
                      tabId: activeTab.id,
                      jobAdId,
                      sectionId,
                      updates
                    })
                  }
                  onRemoveSection={(jobAdId, sectionId) =>
                    dispatch({
                      type: 'REMOVE_SECTION',
                      tabId: activeTab.id,
                      jobAdId,
                      sectionId
                    })
                  }
                  onReorderSection={(jobAdId, sectionId, newPosition) =>
                    dispatch({
                      type: 'REORDER_SECTION',
                      tabId: activeTab.id,
                      jobAdId,
                      sectionId,
                      newPosition
                    })
                  }
                />
              ) : state.activeModule === 'casestudies' && activeTab ? (
                <CaseStudyBuilder
                  moduleState={activeTab.state as CaseStudyModuleState}
                  contentBlocks={state.contentBlocks}
                  onUpdateCaseStudy={(caseStudyId, updates) =>
                    dispatch({
                      type: 'UPDATE_CASE_STUDY',
                      tabId: activeTab.id,
                      caseStudyId,
                      updates
                    })
                  }
                  onSelectCaseStudy={(caseStudyId) =>
                    dispatch({
                      type: 'SELECT_CASE_STUDY',
                      tabId: activeTab.id,
                      caseStudyId
                    })
                  }
                  onAddCaseStudy={(caseStudy) =>
                    dispatch({
                      type: 'ADD_CASE_STUDY',
                      tabId: activeTab.id,
                      caseStudy
                    })
                  }
                  onDeleteCaseStudy={(caseStudyId) =>
                    dispatch({
                      type: 'DELETE_CASE_STUDY',
                      tabId: activeTab.id,
                      caseStudyId
                    })
                  }
                />
              ) : (
                <div className="module-view">
                  {activeTab ? (
                    <div className="tab-content">
                      <h2>{state.activeModule.toUpperCase()} Module</h2>
                      <p>Active Tab: {activeTab.name}</p>
                      <p className="coming-soon">
                        Module UI coming soon. This demonstrates the foundation is working!
                      </p>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No tabs open. Click "+ New Tab" to get started.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
