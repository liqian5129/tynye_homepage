# CLAUDE.md - AI Assistant Guide for tynye Homepage

## Project Overview

**tynye AI** is a marketing and dashboard website for an AI-powered intelligent reading bookmark device. The application helps users capture, understand, and retain knowledge from physical books without phone distractions.

**Key Features:**
- Landing page with product information and marketing content
- User authentication system (login/signup)
- User dashboard for note management
- Multi-language support (English & Chinese)
- Google Gemini AI integration for reading assistance

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | ^19.2.1 |
| Language | TypeScript | ~5.8.2 |
| Build Tool | Vite | ^6.2.0 |
| UI Icons | Lucide React | ^0.556.0 |
| AI API | @google/genai | ^1.31.0 |
| Styling | Tailwind CSS | via CDN |

## Project Structure

```
/home/user/tynye_homepage/
├── App.tsx                    # Main app component with routing
├── index.tsx                  # React DOM entry point
├── index.html                 # HTML entry with Tailwind config
├── types.ts                   # TypeScript type definitions
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── package.json               # Dependencies & scripts
│
├── components/                # Reusable UI components
│   ├── Button.tsx             # Reusable button component
│   ├── Navbar.tsx             # Navigation header with auth
│   ├── Hero.tsx               # Landing page hero section
│   ├── Features.tsx           # Product features section
│   ├── UsageScenarios.tsx     # Use case scenarios
│   ├── HowItWorks.tsx         # Step-by-step guide
│   ├── DataSecurity.tsx       # Security/privacy info
│   ├── Testimonials.tsx       # User testimonials
│   ├── Comparison.tsx         # Feature comparison table
│   ├── Pricing.tsx            # Pricing section
│   ├── DemoSection.tsx        # Interactive demo
│   └── Footer.tsx             # Footer section
│
├── pages/                     # Page-level components
│   ├── LoginPage.tsx          # Auth form (email/phone + password)
│   └── DashboardPage.tsx      # User dashboard with note management
│
├── contexts/                  # React Context providers
│   ├── AuthContext.tsx        # Authentication state management
│   ├── RouterContext.tsx      # Simple routing (page navigation)
│   └── LanguageContext.tsx    # i18n support (EN & CN)
│
└── services/                  # API/business logic
    ├── geminiService.ts       # Google Gemini API integration
    └── mockData.ts            # Mock notes and insights for demo
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** Never commit `.env.local` to version control (it's in .gitignore).

## Architecture Patterns

### State Management
- **Context API** for global state (no Redux/Zustand)
- Three main contexts:
  - `AuthContext` - User authentication state
  - `RouterContext` - Simple client-side routing
  - `LanguageContext` - Internationalization

### Component Organization
- **Pages** (`/pages`) - Full page components rendered by router
- **Components** (`/components`) - Reusable UI building blocks
- **Services** (`/services`) - API calls and business logic
- **Contexts** (`/contexts`) - Global state providers

### Styling Approach
- Tailwind CSS via CDN with custom configuration in `index.html`
- Custom CSS classes: glass-morphism, fadeIn/slideUp animations
- Custom color palette defined in Tailwind config

## Key Type Definitions

Located in `types.ts`:

```typescript
- User              // User profile with plan, tokens, storage
- Note              // Notes with various types (text, audio, excerpt, chat)
- Insight           // AI-generated insights from notes
- ChatMessage       // Conversation messages (user/model)
- Feature           // Product feature with icon
- ComparisonRow     // Feature comparison data
- LoadingState      // IDLE, LOADING, SUCCESS, ERROR
```

## API Integration

### Google Gemini Service (`services/geminiService.ts`)
- Model: `gemini-3-flash-preview`
- Configured as "tynye" AI reading buddy
- Methods:
  - Takes scanned text + optional user question
  - Returns summaries, insights, Q&A responses

## Internationalization

Full i18n support via `LanguageContext`:
- Languages: English (`en`) and Chinese (`zh`)
- Language toggle in Navbar
- All UI strings stored in translation object
- Access via `useLanguage()` hook: `t('key')`

## Code Conventions

### File Naming
- React components: PascalCase (e.g., `DashboardPage.tsx`)
- Services/utilities: camelCase (e.g., `geminiService.ts`)
- Contexts: PascalCase with `Context` suffix

### Component Structure
```tsx
// Standard component pattern
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ComponentName: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="...">
      {/* Component content */}
    </section>
  );
};

export default ComponentName;
```

### Import Order
1. React and React hooks
2. Third-party libraries (lucide-react, etc.)
3. Contexts and hooks
4. Components
5. Services and utilities
6. Types

## Important Files to Know

| File | Purpose |
|------|---------|
| `App.tsx` | Main routing and layout orchestration |
| `DashboardPage.tsx` | Core feature - user dashboard (largest file) |
| `LanguageContext.tsx` | Contains all translation strings |
| `types.ts` | Central type definitions |
| `geminiService.ts` | AI API integration |

## Testing

**Current Status:** No testing framework configured

When adding tests, consider:
- Vitest (recommended for Vite projects)
- React Testing Library for component tests

## Common Tasks for AI Assistants

### Adding a New Component
1. Create file in `/components` with PascalCase naming
2. Import `useLanguage` if text content needed
3. Add any new translation keys to `LanguageContext.tsx`
4. Export default the component

### Adding a New Page
1. Create file in `/pages` with `Page` suffix (e.g., `SettingsPage.tsx`)
2. Add route case in `App.tsx` switch statement
3. Update `RouterContext.tsx` if new page type needed

### Adding New Translations
1. Open `contexts/LanguageContext.tsx`
2. Add keys to both `en` and `zh` translation objects
3. Access via `t('your.key.path')`

### Modifying AI Behavior
- Edit system instruction in `services/geminiService.ts`
- Model configuration is in the same file

## Build & Deployment

### Vite Configuration Highlights
- Dev server: port 3000, host 0.0.0.0
- Path alias: `@/*` maps to project root
- Environment variables loaded via `import.meta.env`

### Production Build
```bash
npm run build
# Output in /dist folder
```

## Notes for AI Assistants

1. **No external routing library** - Uses custom `RouterContext` for simple navigation
2. **Mock data in use** - `services/mockData.ts` provides demo content
3. **CDN imports** - Some libraries loaded via import maps in `index.html`
4. **Tailwind via CDN** - Not installed as npm package, config is in HTML
5. **TypeScript strict mode** - Full type safety expected
6. **React 19** - Uses latest React version with modern patterns
