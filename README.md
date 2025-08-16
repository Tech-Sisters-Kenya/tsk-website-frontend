# Tech Sisters Kenya Website Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Tech-Sisters-Kenya/tsk-website-frontend/pulls)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

The official website for Tech Sisters Kenya, built with Next.js. This platform showcases our mission, programs, and provides resources for women in tech across Kenya.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Resources](#resources)
- [License](#license)

## Quick Start

### Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm/yarn
- Docker (optional, for containerized development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tech-Sisters-Kenya/tsk-website-frontend.git
   cd tsk-website-frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Setup (Optional)

```bash
# Build the Docker image
docker build -t tsk-website-frontend .

# Run the container
docker run -p 3000:3000 tsk-website-frontend
```

## Project Overview

### About

Tech Sisters Kenya is a community-driven platform empowering women in technology across Kenya. Our website serves as a hub for resources, programs, and networking opportunities.

### Key Features

- 🎨 **Modern, Responsive Design** - Optimized for all devices
- ⚡ **Performance Optimized** - Fast loading with Next.js optimizations
- 🔒 **Type Safety** - Built with TypeScript for better developer experience
- 🧪 **Comprehensive Testing** - Unit and E2E tests with Jest and Playwright
- 🚀 **CI/CD Pipeline** - Automated testing and deployment
- ♿ **Accessibility** - WCAG 2.1 compliant components

### Tech Stack

| Category             | Technology                               |
| -------------------- | ---------------------------------------- |
| **Framework**        | Next.js 15 with React 19                 |
| **Language**         | TypeScript                               |
| **Styling**          | Tailwind CSS                             |
| **State Management** | Zustand (global), React Query (server)   |
| **Forms**            | React Hook Form                          |
| **Animation**        | Framer Motion                            |
| **Testing**          | Jest + React Testing Library, Playwright |
| **Build Tool**       | Next.js (Vite-powered)                   |

## Project Structure

```
.
# Core Application
├── src/
│   ├── app/                 # App router pages and API routes
│   │   ├── about-us/        # About Us page and components
│   │   ├── blogs/           # Blog listing and detail pages
│   │   ├── get-involved/    # Get involved section
│   │   ├── landing-page/    # Homepage components
│   │   ├── meet-the-team/   # Team member pages
│   │   └── (auth)/          # Authentication pages (login, signup, password reset)
│   │
│   ├── assets/              # Static assets (images, icons, fonts)
│   ├── components/          # Reusable UI components
│   ├── data/                # Static data and content
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and configurations
│   ├── stores/              # State management (Zustand stores)
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Helper utilities
│
# Testing
├── tests/
│   ├── unit/                # Unit tests
│   │   ├── about-us-page/   # Tests for about us page
│   │   └── components/      # Component tests
│   └── e2e/                 # End-to-end tests
│       ├── about-us.spec.ts
│       ├── demo-todo-app.spec.ts
│       └── example.spec.ts
│
# Configuration
├── public/                  # Publicly accessible files
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
├── jest.config.js           # Jest test configuration
├── next.config.js           # Next.js configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run E2E tests
```

### Code Organization

Our codebase follows these principles:

- **Feature-based Structure** - Code organized by feature/module
- **Component Library** - Reusable components in `src/components`
- **Custom Hooks** - Shared logic in `src/hooks`
- **Type Safety** - Centralized types in `src/types`
- **Utility Functions** - Helpers in `src/utils` and `src/lib`

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style (Prettier + ESLint)
- Write tests for new features
- Ensure accessibility compliance
- Optimize for performance

## Testing

### Running Tests

```bash
# All tests
pnpm test

# Unit tests
pnpm test:unit
pnpm test:unit:watch    # Watch mode
pnpm test:unit:coverage # Coverage report

# E2E tests
pnpm test:e2e
pnpm test:e2e:ui       # Interactive UI mode
pnpm test:e2e:report   # View HTML report

# Specific test file
pnpm exec playwright test tests/e2e/specific-test.spec.ts
```

### Testing Strategy

- **Unit Tests** - Test individual components and utilities
- **Integration Tests** - Test component interactions
- **E2E Tests** - Test critical user flows
- **Visual Regression** - Ensure UI consistency

### Writing Tests

#### Unit Tests

- Place tests next to components with `.test.tsx` extension
- Follow "Arrange-Act-Assert" pattern
- Use descriptive test names
- Test one behavior per test case

#### E2E Tests

- Use Page Object Model pattern
- Keep tests independent and isolated
- Focus on critical user flows
- Use `test.only` for debugging

## Contributing

We welcome contributions! Here's how to get started:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with descriptive messages**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Branching Strategy

| Branch Type | Prefix     | Target                 | Description    |
| ----------- | ---------- | ---------------------- | -------------- |
| Feature     | `feature/` | `development`          | New features   |
| Bug Fix     | `fix/`     | `development`          | Bug fixes      |
| Hotfix      | `hotfix/`  | `main` & `development` | Critical fixes |

> **⚠️ Important:** Never push directly to `main`

### Pull Request Guidelines

Before submitting a PR, ensure:

- ✅ Code is properly formatted
- ✅ All tests pass
- ✅ PR title and description are clear
- ✅ Documentation is updated if needed
- ✅ UI matches the Figma design
- ✅ Screenshots or recordings included for UI changes

### Code Style

- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure TypeScript types are properly defined

## Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server locally
pnpm start
```

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## Resources

### Design

🎨 **Figma Design**: [TSK Website UI](https://www.figma.com/design/PCywTXwNGbjDGFh2TAJk0w/TSK-Website-UI?node-id=0-1&p=f&t=nqnfbXnunkdgC6ur-0)

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev/docs/intro)

### Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs using GitHub Issues
- 📧 **Contact**: Reach out to the Tech Sisters Kenya team

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
