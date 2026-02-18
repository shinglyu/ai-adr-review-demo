# Setup Guide: Architecture Compliance Agent

This guide walks you through setting up the Architecture Compliance Agent demo in your own GitHub repository.

## 📋 Prerequisites

- A GitHub repository (this one or your own fork)
- GitHub Copilot subscription (Individual, Business, or Enterprise)
- Repository admin access to configure settings

## 🔧 Step-by-Step Setup

### Step 1: Enable GitHub Copilot Code Review

GitHub Copilot Code Review is a feature that allows Copilot to review pull requests automatically.

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click **Settings** tab

2. **Enable Code Review**
   - In the left sidebar, click **Code security and analysis**
   - Scroll to the **GitHub Copilot** section
   - Click **Enable** next to "Code review"
   - Confirm the action

   > 💡 **Note:** This feature may require a GitHub Copilot Business or Enterprise subscription.

### Step 2: Configure Copilot Instructions

The file `.github/copilot-instructions.md` is already configured with ADR compliance rules. GitHub Copilot will automatically read this file when reviewing PRs.

**What it does:**
- Tells Copilot to act as a Senior Architect
- Instructs it to check all PRs against ADRs in `docs/adr/`
- Provides templates for violation comments
- Defines when to approve vs. request changes

**Customization (Optional):**
- Edit `.github/copilot-instructions.md` to add your own rules
- Adjust the tone and detail level of review comments
- Add additional compliance checks

### Step 3: Set Up Branch Protection (Recommended)

Make ADR compliance mandatory by requiring Copilot review approval before merging.

1. **Create Branch Protection Rule**
   - Go to **Settings** → **Branches**
   - Click **Add rule** (or edit existing rule)

2. **Configure Protection**
   - **Branch name pattern:** `main` (or your default branch)
   - Check ✅ **Require status checks to pass before merging**
   - In the search box, look for status checks from previous PRs
   - Select **GitHub Copilot Code Review** if available
   - Check ✅ **Require branches to be up to date before merging** (optional)

3. **Additional Recommended Settings**
   - ✅ **Require pull request reviews before merging**
   - ✅ **Dismiss stale pull request approvals when new commits are pushed**
   - ✅ **Include administrators** (enforce rules for everyone)

4. **Save the Rule**

### Step 4: Test with Demo Branches

This repository includes three pre-configured branches with intentional violations.

#### Option A: Test in This Repository

1. **Push the demo branches** (if you have write access):
   ```bash
   git push origin feat/authors-uuid
   git push origin feat/health-check
   git push origin feat/order-logic
   ```

2. **Create Pull Requests:**
   - Go to the repository on GitHub
   - Click **Pull requests** → **New pull request**
   - Select base: `main` and compare: `feat/authors-uuid`
   - Create the PR
   - Repeat for the other two branches

3. **Watch Copilot Review:**
   - GitHub Copilot will automatically review each PR
   - Look for comments citing ADR violations
   - See the "Changes Requested" status

#### Option B: Create Your Own Test PR

1. **Create a new branch:**
   ```bash
   git checkout -b test/my-violation
   ```

2. **Introduce a violation** (example):
   ```typescript
   // Edit src/models/Book.ts
   export interface Book {
     id: string;  // ❌ Violates ADR-0001
     title: string;
   }
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "test: Try using UUID for Book ID"
   git push origin test/my-violation
   ```

4. **Create PR and observe Copilot's review**

### Step 5: Understanding the Workflow

When a PR is created:

1. **GitHub Actions runs** (`.github/workflows/adr-compliance.yml`)
   - Detects changed files
   - Performs basic pattern matching for violations
   - Reports potential issues in the workflow summary

2. **GitHub Copilot reviews** (using `.github/copilot-instructions.md`)
   - Reads the ADRs from `docs/adr/`
   - Analyzes code changes in the PR diff
   - Posts review comments on specific lines
   - Requests changes if violations found

3. **Developer responds**
   - Fixes the violations
   - Pushes new commits
   - Copilot re-reviews automatically

## 🎯 Demo Violation Examples

### Violation 1: UUID Instead of Numeric ID (ADR-0001)

**Branch:** `feat/authors-uuid`

**File:** `src/models/Author.ts`

**Issue:**
```typescript
export interface Author {
  id: string;  // ❌ Should be: id: number
  name: string;
}
```

**Expected Copilot Response:**
> 🚫 **Architecture Violation: ADR-0001**
> 
> **Issue:** The Author model uses `id: string` instead of numeric IDs.
> 
> **ADR Reference:** `docs/adr/0001-numeric-ids.md`
> 
> **Rule:** "All primary keys and public resource IDs must use numeric integers"
> 
> **Required Action:** Change `id: string` to `id: number`

### Violation 2: Missing Response Envelope (ADR-0002)

**Branch:** `feat/health-check`

**File:** `src/controllers/status.ts`

**Issue:**
```typescript
res.json({ status: 'ok' });  // ❌ Should be: res.json({ data: { status: 'ok' } })
```

**Expected Copilot Response:**
> 🚫 **Architecture Violation: ADR-0002**
> 
> **Issue:** Response lacks required data envelope
> 
> **Required Action:** Wrap response: `res.json({ data: { status: 'ok' } })`

### Violation 3: Database Logic in Controller (ADR-0003)

**Branch:** `feat/order-logic`

**File:** `src/controllers/OrderController.ts`

**Issue:**
```typescript
db.orders.push(newOrder);  // ❌ DB operations should be in service layer
```

**Expected Copilot Response:**
> 🚫 **Architecture Violation: ADR-0003**
> 
> **Issue:** Controller performs direct database operations
> 
> **Required Action:** Move `db.orders.push()` to `OrderService`

## 🔍 Troubleshooting

### Copilot Doesn't Review PRs

**Possible Causes:**
1. ✅ GitHub Copilot Code Review not enabled in repository settings
2. ✅ Copilot subscription not active
3. ✅ PR is from a forked repository (Copilot may not review external forks for security)

**Solution:**
- Verify Copilot is enabled in Settings → Code security and analysis
- Check your Copilot subscription status
- Test with a branch from the same repository, not a fork

### Copilot Doesn't Cite ADRs

**Possible Causes:**
1. ✅ `.github/copilot-instructions.md` file is missing or improperly formatted
2. ✅ ADR files in `docs/adr/` are not accessible
3. ✅ Violation is too subtle for pattern matching

**Solution:**
- Verify `.github/copilot-instructions.md` exists and is valid Markdown
- Check that ADR files are committed to the repository
- Make violations more obvious in test cases

### Workflow Fails

**Possible Causes:**
1. ✅ ADR files missing from `docs/adr/`
2. ✅ Workflow file has syntax errors

**Solution:**
- Ensure all three ADR files exist: `0001-numeric-ids.md`, `0002-response-envelope.md`, `0003-service-layer.md`
- Validate `.github/workflows/adr-compliance.yml` YAML syntax

## 📚 Next Steps

1. **Add More ADRs:**
   - Create new files in `docs/adr/` (e.g., `0004-error-handling.md`)
   - Update `.github/copilot-instructions.md` to reference new ADRs

2. **Customize Review Tone:**
   - Edit `.github/copilot-instructions.md` to be more/less strict
   - Adjust comment templates for your team's culture

3. **Integrate with Your Codebase:**
   - Fork this repository
   - Replace demo code with your actual architecture
   - Write ADRs that reflect your real architectural decisions

4. **Extend Automation:**
   - Add linting rules that align with ADRs
   - Create pre-commit hooks for local validation
   - Integrate with other CI/CD tools

## 🤝 Getting Help

- **GitHub Copilot Docs:** https://docs.github.com/en/copilot
- **ADR Resources:** https://adr.github.io/
- **Issues:** Open an issue in this repository for questions

---

Happy architecture enforcement! 🎉
