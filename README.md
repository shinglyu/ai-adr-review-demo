# Architecture Compliance Agent Demo

A demonstration repository showcasing automated **Architecture Decision Record (ADR) compliance** using **GitHub Copilot Code Review**.

## 🎯 Project Goal

This repository demonstrates how to use GitHub Copilot as an automated "Architecture Compliance Agent" that reviews Pull Requests against documented Architecture Decision Records (ADRs).

## 📁 Repository Structure

```
bookstore-api/
├── .github/
│   ├── copilot-instructions.md    # AI Reviewer "Brain" - Defines review criteria
│   └── workflows/
│       └── adr-compliance.yml     # Automated ADR compliance checks
├── docs/adr/                      # Source of Truth
│   ├── 0001-numeric-ids.md        # ADR: Use numeric IDs, not UUIDs
│   ├── 0002-response-envelope.md  # ADR: Wrap responses in { data: ... }
│   └── 0003-service-layer.md      # ADR: Business logic in services, not controllers
├── src/
│   ├── controllers/               # HTTP request handlers (thin layer)
│   ├── services/                  # Business logic and data access
│   └── models/                    # Data structure definitions
└── package.json
```

## 📋 Architecture Decision Records (ADRs)

This project enforces three key architectural rules:

### ADR-0001: Use Numeric IDs
**Rule:** All primary keys and public resource IDs must be integers.  
**Reason:** Compatibility with legacy systems.  
**Location:** [`docs/adr/0001-numeric-ids.md`](docs/adr/0001-numeric-ids.md)

### ADR-0002: Standard Response Envelope
**Rule:** API responses must be wrapped in `{ "data": <payload> }`.  
**Reason:** Scalability for metadata/pagination.  
**Location:** [`docs/adr/0002-response-envelope.md`](docs/adr/0002-response-envelope.md)

### ADR-0003: Service Layer Pattern
**Rule:** Business logic and DB queries are forbidden in `src/controllers/`.  
**Reason:** Separation of concerns.  
**Location:** [`docs/adr/0003-service-layer.md`](docs/adr/0003-service-layer.md)

## 🤖 The AI Reviewer

The file `.github/copilot-instructions.md` contains specific instructions for GitHub Copilot to:

- Act as a **Senior Architect**
- Cross-reference every PR against ADRs in `docs/adr/`
- Mark reviews as **"Changes Requested"** when violations are found
- Cite the specific violated ADR with clear remediation guidance

## 🧪 Demo Pull Requests

This repository includes three demo branches with **intentional violations** to showcase the compliance checking:

| Branch | File | Violation | ADR |
|--------|------|-----------|-----|
| `feat/authors-uuid` | `src/models/Author.ts` | Uses `id: string` (UUID) instead of `id: number` | **ADR-0001** |
| `feat/health-check` | `src/controllers/status.ts` | Returns `{ status: 'ok' }` without `"data"` wrapper | **ADR-0002** |
| `feat/order-logic` | `src/controllers/OrderController.ts` | Performs `db.orders.push()` directly in controller | **ADR-0003** |

### How to Test the Demo

1. **Create Pull Requests** from each demo branch to see violations flagged:
   ```bash
   # These branches already exist locally with violations
   git push origin feat/authors-uuid
   git push origin feat/health-check
   git push origin feat/order-logic
   ```

2. **Enable GitHub Copilot Code Review** in your repository:
   - Go to **Settings** → **Code security and analysis**
   - Enable **GitHub Copilot Code Review**

3. **Set Branch Protection** (Optional):
   - Go to **Settings** → **Branches** → **Add rule**
   - Require **Copilot Code Review** to pass before merging

4. **Open PRs** for each branch and observe how GitHub Copilot flags the violations based on `.github/copilot-instructions.md`.

## 🚀 Setup Instructions

### Prerequisites
- GitHub repository with GitHub Copilot enabled
- GitHub Copilot Code Review feature enabled (in repository settings)

### Enable GitHub Copilot Code Review

1. Navigate to your repository on GitHub
2. Go to **Settings** → **Code security and analysis**
3. Find **GitHub Copilot** section
4. Enable **Code review**

### Set Branch Protection (Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add rule** for your main branch
3. Check **Require status checks to pass before merging**
4. Search for and select **GitHub Copilot Code Review**
5. Save the branch protection rule

## 📖 How It Works

1. **Developer creates a PR** with code changes
2. **GitHub Actions** runs automated checks (`adr-compliance.yml`) to detect potential violations
3. **GitHub Copilot** reviews the PR using instructions from `.github/copilot-instructions.md`
4. **Copilot flags violations** by:
   - Citing the specific ADR (e.g., "Violates ADR-0001")
   - Explaining the issue
   - Suggesting how to fix it
   - Requesting changes if violations exist

## 🔍 Example Violation Review

When you create a PR from `feat/authors-uuid`, GitHub Copilot will comment:

```
🚫 Architecture Violation: ADR-0001

Issue: The Author model uses id: string instead of numeric IDs.

ADR Reference: docs/adr/0001-numeric-ids.md

Rule: "All primary keys and public resource IDs must use numeric integers"

Required Action: Change id: string to id: number to maintain compatibility 
with legacy systems.
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

## 📚 Learn More

- [Architecture Decision Records (ADR)](https://adr.github.io/)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Writing Good ADRs](https://github.blog/2020-08-13-why-write-adrs/)

## 🤝 Contributing

This is a demo repository. Feel free to:
- Fork it and adapt it for your own ADR compliance needs
- Add more ADRs to `docs/adr/`
- Customize `.github/copilot-instructions.md` for your architecture
- Create additional demo violations

## 📄 License

MIT

---

**Note:** This is a demonstration repository. The "violations" are intentional to showcase the automated review capabilities of GitHub Copilot.