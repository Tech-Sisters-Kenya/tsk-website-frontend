# Code Guidelines & Pre-Commit Checklist

## Code Guidelines

### 1. Core Development Principles

#### DRY (Don't Repeat Yourself)

- Extract repeated code into reusable functions, components, or utilities.
- If you write the same logic twice, refactor it into a shared module.
- Use composition and inheritance appropriately to avoid duplication.

#### KISS (Keep It Simple, Stupid)

- Favor simple, readable solutions over clever or complex ones.
- Write code that others (and future you) can easily understand.
- Avoid over-engineering; solve the problem at hand, not hypothetical future problems.

#### YAGNI (You Aren't Gonna Need It)

- Don't add functionality until it's actually required.
- Avoid speculative features or premature abstractions.
- Build incrementally based on real needs.

#### SOLID Principles

- **Single Responsibility Principle (SRP)**  
  Each module, class, or function should do **one thing** and have **one reason to change**.  
  _Example:_ A `UserService` should handle user operations, not also send emails. Create a separate `EmailService` for that.  
  _Why:_ Makes code easier to understand, test, and maintain. Changes to email logic won't affect user management.

- **Open/Closed Principle (OCP)**  
  Code should be **open for extension** (you can add new features) but **closed for modification** (without changing existing code).  
  _Example:_ Instead of adding `if/else` statements for each payment type, use a `PaymentProcessor` interface that new payment methods can implement.  
  _Why:_ Reduces risk of breaking existing functionality when adding new features.

- **Liskov Substitution Principle (LSP)**  
  Subtypes must be **interchangeable** with their base types without breaking functionality.  
  _Example:_ If `Bird` has a `fly()` method, then `Penguin extends Bird` violates LSP because penguins can't fly. Better: separate `FlyingBird` and `FlightlessBird` interfaces.  
  _Why:_ Ensures polymorphism works correctly and prevents unexpected behavior.

- **Interface Segregation Principle (ISP)**  
  Don't force clients to depend on methods they don't use. **Split large interfaces** into smaller, specific ones.  
  _Example:_ Instead of one massive `IWorker` interface with `work()`, `eat()`, `sleep()`, create separate `IWorkable`, `IEatable`, `ISleepable` interfaces.  
  _Why:_ Classes only implement what they actually need, reducing unnecessary dependencies.

- **Dependency Inversion Principle (DIP)**  
  Depend on **abstractions** (interfaces/abstract classes), not concrete implementations.  
  _Example:_ Instead of `class UserController { private db = new MySQLDatabase() }`, use `class UserController { constructor(private db: IDatabase) }`.  
  _Why:_ Makes code flexible and testable. You can swap MySQL for PostgreSQL or a mock database without changing UserController.

#### Separation of Concerns

- Keep business logic separate from UI components.
- Separate data fetching, state management, and presentation.
- Use clear boundaries between layers (e.g., API, services, components).

#### Boy Scout Rule

- Leave code cleaner than you found it.
- Refactor legacy code when you touch it (within reason).
- Fix small issues and improve readability as you go.

---

### 2. Accessibility & Responsiveness

- Follow [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) accessibility standards.
- All components must be responsive on all devices (mobile-first Tailwind design).
- Test responsiveness using different dimensions (e.g., iPhone, iPad).

---

### 3. Type Safety & Code Quality

- Use **TypeScript** with `strict` mode enabled.
- No implicit `any` or `unknown` types.
- Every function must define a return type and stay under **100 lines** (prefer smaller, modular functions).
- Avoid magic numbers — use constants or enums.
- No unused variables, imports, or hardcoded credentials.

---

### 4. Structure & Naming

- One component or controller per file (single responsibility).
- Follow naming conventions:
  - **camelCase** for variables and functions
  - **PascalCase** for components and classes
  - **UPPER_SNAKE_CASE** for constants
  - **lowercase** for folders
- Use descriptive and consistent names; avoid abbreviations or single-letter variables (except common loop indices).
- Check for existing components or files before creating new ones to avoid duplication.

---

### 5. Libraries & UI

- Use existing icon libraries and UI components.
- Avoid custom styling if a reusable component exists.
- Prefer well-maintained, widely-used libraries over custom implementations.

---

### 6. Formatting & Tools

- Code must pass **lint**, **format**, and **build** checks before PR.
- Format with **Prettier** and lint with **ESLint**.
- Recommended VS Code extensions:
  - `esbenp.prettier-vscode` (Prettier)

---

### 7. Environment & Security

- No hardcoded API URLs, credentials, or secrets.
- `.env` files must be in `.gitignore`.
- Provide `.env.example` with required variables.
- Ensure code runs cross-platform (Mac, Linux, Windows) and cross-browser (latest Chrome, Safari, Firefox, Edge).

---

### 8. Source Control & Commits

- Never commit directly to `main` and/or `development`.
- Branch naming:
  - Single repo: `feature|bugfix|chore/task-name`
    _Example:_ `feature/landing-page`
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Work must be in English; no personal identifiers in commits or files.
- PRs must:
  - Pass all CI checks (lint, format, build, tests)
  - Include relevant documentation updates

---

## Pre-Commit Checklist

Before committing, verify the following:

1. **Naming & Structure** — follows conventions and one responsibility per file.
2. **Magic Numbers** — replaced with constants or enums.
3. **Type Safety** — no implicit `any` or `unknown`.
4. **Responsiveness** — verified on multiple device sizes.
5. **Accessibility** — WCAG standards met.
6. **Duplicate Code** — none; reusable logic extracted to `lib/`, `utils/`, or shared components (DRY principle).
7. **Simplicity** — code is readable and maintainable (KISS principle).
8. **No Unnecessary Features** — only required functionality implemented (YAGNI principle).
9. **Linting & Formatting** — passes Prettier, ESLint, and build checks.
10. **Testing** — critical functions and components have unit or behavior tests.
11. **Secrets & ENVs** — no sensitive data committed; `.env` handled correctly.
12. **Comments** — only meaningful ones kept; no placeholders or LLM traces.
13. **Git Hygiene** — correct branch naming, descriptive commits, and `.gitignore` verified.
14. **Code Cleanliness** — code left cleaner than you found it (Boy Scout Rule).

---

**Final Step Before Push:**

```bash
pnpm lint && pnpm format && pnpm typecheck && pnpm test && pnpm build
```

---

## Additional Resources

- [DRY Principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
