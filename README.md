# 💻 Tech Sisters Kenya Website Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🖌️ UI/UX Design

You can view the design prototype on Figma:  
🔗 [TSK Website UI – Figma](https://www.figma.com/design/PCywTXwNGbjDGFh2TAJk0w/TSK-Website-UI?node-id=0-1&p=f&t=nqnfbXnunkdgC6ur-0)

---

## 🚀 Getting Started

### ⚙️ Prerequisites

Ensure you have the following installed:

- Node.js >= 18
- pnpm (preferred) / npm / yarn / bun
- Docker (for optional containerized development)

### 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/Tech-Sisters-Kenya/tsk-website-frontend.git
cd tsk-website-frontend
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open http://localhost:3000 to see the app in your browser.

### 🐳 Running with Docker

```bash
docker build -t tsk-website-frontend .
docker run -p 3000:3000 tsk-website-frontend
```

## 🧪 Testing

### Running All Tests

```bash
# Run all tests (unit + e2e)
pnpm test
```

### Unit Tests

- Location: `tests/unit/`
- Run all unit tests: `pnpm test:unit`
- Watch mode: `pnpm test:unit:watch`
- Coverage report: `pnpm test:unit:coverage`

### End-to-End Tests

- Location: `tests/e2e/`
- Run all e2e tests: `pnpm test:e2e`
- Run specific test file: `pnpm exec playwright test about-us.spec.ts`
  (Replace `about-us.spec.ts` with the test file you want to run)
- Interactive UI mode: `pnpm test:e2e:ui`
- View HTML report: `pnpm test:e2e:report`

### CI/CD

- Runs on push to main/develop and PRs
- Includes linting, unit tests, and E2E tests
- Coverage reports sent to Codecov

## 📁 Project Structure

- `app/` – Main application pages and routes
- `components/` – Reusable UI components
- `public/` – Static assets like images
- `styles/` – Global and module styles
- `lib/` – Utility functions and constants

### 📦 Font Optimization

This project uses next/font to optimize and load Geist, a modern font by Vercel.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## ☁️ Deployment

### 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

### 📝 Getting Started with Contributions

To contribute to this project, reach out to the Tech Sisters Kenya leads. All contributions should follow GitHub flow, with feature branches created from develop.

### 🌿 Branching Strategy

| Type    | Branch Prefix | Merge Target       |
| ------- | ------------- | ------------------ |
| Feature | `feature/*`   | `develop`          |
| Bug Fix | `fix/*`       | `develop`          |
| Hotfix  | `hotfix/*`    | `main` & `develop` |

**⚠️ NEVER PUSH DIRECTLY TO `main`**

### 🧹 Pull Request Guidelines

Before requesting a PR review:

- ✅ Ensure code is formatted
- ✅ Ensure your PR title and description are clear
- ✅ Add appropriate documentation for components/pages you've created
- ✅ Make sure your UI matches the Figma
- ✅ Screenshots or screen recordings are encouraged

## 📜 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
