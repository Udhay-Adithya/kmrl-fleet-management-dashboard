# Contributing to Kochi Metro Fleet Management Dashboard

First off, thank you for considering contributing to the Kochi Metro Fleet Management Dashboard! 🎉

## 🤝 How to Contribute

### Reporting Bugs 🐛

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, please include as many details as possible:

**Bug Report Template:**
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. iOS, Windows, macOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone X, Desktop]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Features 💡

We welcome feature suggestions! Please:

1. **Check existing feature requests** to avoid duplicates
2. **Provide detailed context** about the use case
3. **Explain the expected behavior** and why it would be valuable
4. **Consider the scope** - does it align with the project's goals?

**Feature Request Template:**
```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm/pnpm/yarn
- Git

### Local Development
1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/kmrl-fleet-management-dashboard.git
   cd kmrl-fleet-management-dashboard
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Adding tests

Example: `feature/mobile-navigation` or `fix/table-responsive-layout`

## 📝 Code Style Guidelines

### TypeScript & React
- **Use TypeScript** for all new code
- **Functional components** with hooks
- **Proper type definitions** for props and state
- **Meaningful component names** (PascalCase)
- **Custom hooks** for reusable logic

### File Organization
```
components/
├── ui/              # Base UI components (from shadcn/ui)
├── feature-name/    # Feature-specific components
│   ├── component.tsx
│   └── index.ts
└── shared/          # Shared components
```

### Naming Conventions
- **Components**: PascalCase (`TrainsetCard.tsx`)
- **Files**: kebab-case (`trainset-list.tsx`)
- **Functions**: camelCase (`getTrainsetStatus`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_TRAINSET_COUNT`)

### CSS & Styling
- **Use Tailwind CSS** for styling
- **Responsive design** first (mobile-first approach)
- **Consistent spacing** using Tailwind's spacing scale
- **Semantic color usage** (primary, secondary, success, warning, error)

### Example Component Structure
```tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TrainsetCardProps {
  id: string
  number: string
  status: "active" | "maintenance" | "standby" | "out-of-service"
  availability: number
}

export function TrainsetCard({ id, number, status, availability }: TrainsetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{number}</span>
          <Badge variant={getStatusVariant(status)}>
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  )
}

function getStatusVariant(status: string) {
  // Helper function implementation
}
```

## 🎨 Design Guidelines

### Mobile Responsiveness
- **Mobile-first approach**: Design for mobile, then enhance for desktop
- **Touch-friendly targets**: Minimum 44px touch targets
- **Readable text**: Minimum 16px font size on mobile
- **Appropriate spacing**: Adequate padding and margins for touch

### Accessibility
- **Semantic HTML**: Use proper HTML elements
- **ARIA labels**: Add ARIA labels for screen readers
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Color contrast**: Meet WCAG AA standards

### Component Guidelines
- **Reusable components**: Create modular, reusable components
- **Consistent API**: Similar props patterns across components
- **Error states**: Handle loading and error states gracefully
- **Loading states**: Provide feedback during async operations

## 🧪 Testing

### Before Submitting
- [ ] **Cross-browser testing**: Test in Chrome, Firefox, Safari, Edge
- [ ] **Mobile testing**: Test on actual mobile devices or browser dev tools
- [ ] **Theme testing**: Verify both light and dark themes work correctly
- [ ] **Accessibility testing**: Use screen reader or accessibility tools
- [ ] **Performance**: Check for any performance regressions

### Testing Checklist
- [ ] Component renders correctly
- [ ] Props are properly typed
- [ ] Error boundaries work as expected
- [ ] Mobile responsive design is maintained
- [ ] Accessibility features are preserved

## 📦 Pull Request Process

### Before Creating a PR
1. **Update your fork**:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "feat: add mobile navigation component"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Description Template
```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Screenshots (if applicable)
Add screenshots to show the changes.

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested with dark/light theme
- [ ] Accessibility tested

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on multiple devices/browsers
4. **Documentation** updates if needed
5. **Merge** after approval

## 🚀 Release Process

We use semantic versioning (semver) for releases:
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

## 🔒 Security

If you discover a security vulnerability, please send an e-mail to [security@example.com]. All security vulnerabilities will be promptly addressed.

## ❓ Questions?

- **General questions**: Create a GitHub Discussion
- **Bug reports**: Create a GitHub Issue
- **Feature requests**: Create a GitHub Issue
- **Documentation**: Create a GitHub Issue

## 🙏 Recognition

Contributors will be recognized in:
- README acknowledgments
- Release notes
- GitHub contributor graph

Thank you for contributing to making metro fleet management more efficient! 🚇✨