# Recruitment Builder

A lightweight, AI-powered recruitment authoring tool for building candidate profiles, job ads, and case studies.

## 🎯 Overview

Recruitment Builder is a template authoring tool designed to streamline the creation of recruitment materials. Built with React, TypeScript, and Vite, it provides a visual drag-and-drop interface for composing recruitment documents from reusable content blocks.

## ✨ Features

### Three Core Modules

1. **📋 Candidate Profile Builder**
   - Create ideal candidate requirement profiles
   - Use archetype templates (Mid/Senior/Principal PM)
   - Define required and preferred skills
   - Export as markdown requirement documents

2. **📄 Job Ad Builder**
   - Visual section-based editor
   - Drag & drop content blocks
   - Variable substitution support
   - Link to candidate profiles
   - Export in multiple formats

3. **📝 Case Study Builder**
   - Scenario editor (context, challenge, constraints)
   - Question bank with drag & drop
   - Evaluation criteria library
   - Export as PDF for candidates

### Shared Content Library

- **36+ pre-loaded content blocks** based on AI-savvy PM hiring research
- Skills, requirements, benefits, values, interview questions
- Searchable and filterable
- Tag-based organization
- Reusable across all modules

### Key Capabilities

- **Tab-based workflow** - Manage multiple versions/scenarios
- **Dark mode support** - Toggle between light and dark themes
- **localStorage persistence** - Work survives page refresh
- **Export options** - Markdown, JSON, PDF (coming soon)
- **Archetype templates** - Start from research-backed PM profiles
- **Lightweight & fast** - Pure frontend, no backend required

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/damotroll/recruitment-builder.git
cd recruitment-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory, ready for deployment to Vercel or any static hosting.

## 🏗️ Architecture

### Technology Stack

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server
- **html2canvas** - PDF export
- **lz-string** - URL compression for sharing
- **react-markdown** - Preview rendering

### Design Patterns

Following [org-designer](https://github.com/anthropics/org-designer) patterns:

- Single source of truth in App.tsx
- useReducer for state management
- Flat JSON data structures
- HTML5 Drag & Drop API
- CSS variables for theming
- localStorage auto-persistence

### Data Model

All data stored in flat JSON structures:

```typescript
{
  contentBlocks: ContentBlock[],      // Reusable content
  candidateArchetypes: Archetype[],   // Template profiles
  tabs: Tab[],                        // Version management
  // Module-specific data in tab state
}
```

## 📊 Included Content

### Candidate Archetypes

Based on comprehensive AI-savvy PM hiring research:

- **Mid-Level PM** (Team-Embedded) - 3-5 years, squad execution, AI fluency
- **Senior PM** (Cross-Product, AI Chapter Leader) - 6-8 years, strategic leadership
- **Principal PM** (Platform & AI Enablement) - 8-12 years, org-wide impact

### Content Blocks

- **12 skills** - Product execution, AI fluency, platform thinking, etc.
- **11 requirements** - Experience levels, AI portfolios, governance
- **3 benefits** - AI tools ($2,400/year), learning budget, growth paths
- **3 values** - Learn, Lead, Deliver (Simployer values)
- **3 red flags** - Screening criteria
- **4 interview questions** - AI-focused assessment
- **4 evaluation criteria** - Scoring rubrics

## 🎨 UI Features

- **Module navigation** - Switch between Profiles, Job Ads, Case Studies, Library
- **Tab system** - Multiple versions per module (clone, rename, compare)
- **Search & filter** - Find content blocks by type, category, tags
- **Drag & drop** - Visual content assembly (foundation in place)
- **Live preview** - Markdown rendering (coming soon)
- **Dark mode** - Respects system preference, manual toggle

## 🔮 Roadmap

### Phase 2: Profile Builder (In Progress)
- Visual canvas with drag & drop
- Archetype selection
- Required/Preferred skill sections
- Markdown export

### Phase 3: Job Ad Builder
- Section-based editor
- Content block composition
- Hiring manager message editor
- Variable substitution
- Export in job ad template format

### Phase 4: Case Study Builder
- Scenario editor (rich text)
- Question bank
- Evaluation criteria
- PDF export via html2canvas

### Phase 5: Advanced Features
- URL sharing (LZ-String compression)
- Tab comparison (diff view)
- Import from existing markdown
- AI-assisted content generation
- Keyboard shortcuts

## 📝 Development Notes

### localStorage Keys

```
recruitment-builder-state          // Complete app state
```

State automatically persists on every change.

### Adding Content Blocks

Edit `src/initialData.ts`:

```typescript
{
  id: 'new-block-id',
  type: 'skill',
  title: 'Block Title',
  content: 'Block content...',
  category: 'technical',
  tags: ['tag1', 'tag2'],
  metadata: { seniorityLevel: ['senior'] }
}
```

### Creating New Modules

Follow the pattern in `src/components/`:

1. Create module directory (e.g., `profiles/`)
2. Add module state to types.ts
3. Add reducer actions to appReducer.ts
4. Build module components
5. Wire up in App.tsx

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repository to Vercel for automatic deployments.

### Manual Deployment

```bash
npm run build
# Upload dist/ directory to any static host
```

## 📚 Research Foundation

This tool is built on extensive research into AI-savvy PM hiring practices, including:

- McKinsey data on 40% productivity gains
- 300% increase in AI PM demand (2022-2025)
- Interview question frameworks
- Red flag detection (AI fraud crisis)
- Compensation benchmarks (15-20% premium for AI-savvy PMs)

Research documents available in `/Research/` directory.

## 🤝 Contributing

This is a personal project but open to feedback and suggestions. Open an issue to discuss improvements.

## 📄 License

MIT

## 🙏 Acknowledgments

- Architecture inspired by [org-designer](https://github.com/anthropics/org-designer)
- Content based on comprehensive AI-savvy PM hiring research (November 2025)
- Built with Claude Code

---

**Status**: Foundation complete ✅ | Building modules 🚧

Visit the live app: [recruitment-builder.vercel.app](https://recruitment-builder.vercel.app) (coming soon)
