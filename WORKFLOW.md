# Architecture Compliance Workflow

This document illustrates how the Architecture Compliance Agent works.

## 🔄 Complete Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Developer Creates PR                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              GitHub Actions: ADR Compliance Check                │
│  (.github/workflows/adr-compliance.yml)                         │
│                                                                  │
│  ✓ Detects changed files                                        │
│  ✓ Runs pattern matching for common violations                  │
│  ✓ Lists potential issues                                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│          GitHub Copilot Code Review Triggered                    │
│  (Uses .github/copilot-instructions.md)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Copilot Reads ADRs                              │
│                                                                  │
│  📄 docs/adr/0001-numeric-ids.md                                │
│  📄 docs/adr/0002-response-envelope.md                          │
│  📄 docs/adr/0003-service-layer.md                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Copilot Analyzes Code Changes                       │
│                                                                  │
│  🔍 Compares diff against ADR rules                             │
│  🔍 Checks for violations                                        │
│  🔍 Identifies architectural anti-patterns                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
    ┌──────────────────┐      ┌──────────────────┐
    │  No Violations   │      │   Violations     │
    │     Found        │      │     Found        │
    └────────┬─────────┘      └────────┬─────────┘
             │                         │
             ▼                         ▼
    ┌──────────────────┐      ┌──────────────────┐
    │  ✅ Approve PR   │      │ ⛔ Request       │
    │                  │      │    Changes       │
    │  Comments:       │      │                  │
    │  "Looks good!"   │      │  Posts comments: │
    │                  │      │  • Cite ADR ID   │
    │                  │      │  • Explain issue │
    │                  │      │  • Suggest fix   │
    └──────────────────┘      └────────┬─────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Developer      │
                              │  Fixes Issues   │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Push New       │
                              │  Commits        │
                              └────────┬────────┘
                                       │
                                       │ (Loops back to
                                       │  Copilot Review)
                                       └──────────┐
                                                  │
                                                  ▼
                                       ┌──────────────────┐
                                       │  Re-Review &     │
                                       │  Approve         │
                                       └──────────────────┘
```

## 📝 ADR Enforcement Examples

### Example 1: ADR-0001 Violation Detected

```
Code Change:
───────────
export interface Author {
-  id: number;
+  id: string;  // ❌ Violation!
   name: string;
}

Copilot Action:
───────────────
🚫 Architecture Violation: ADR-0001

Issue: Author model uses string IDs instead of numeric IDs
ADR: docs/adr/0001-numeric-ids.md
Rule: "All resource IDs must be numeric integers"
Fix: Change id: string back to id: number

Status: 🔴 Changes Requested
```

### Example 2: ADR-0002 Violation Detected

```
Code Change:
───────────
async getStatus(req, res) {
-  res.json({ data: { status: 'ok' } });
+  res.json({ status: 'ok' });  // ❌ Violation!
}

Copilot Action:
───────────────
🚫 Architecture Violation: ADR-0002

Issue: Response missing required data envelope
ADR: docs/adr/0002-response-envelope.md
Rule: "All responses must wrap payload in { data: ... }"
Fix: res.json({ data: { status: 'ok' } })

Status: 🔴 Changes Requested
```

### Example 3: ADR-0003 Violation Detected

```
Code Change:
───────────
// In OrderController.ts
async createOrder(req, res) {
   const order = req.body;
+  db.orders.push(order);  // ❌ Violation!
   res.json({ data: order });
}

Copilot Action:
───────────────
🚫 Architecture Violation: ADR-0003

Issue: Controller performs direct database operations
ADR: docs/adr/0003-service-layer.md
Rule: "Controllers must delegate to services for data access"
Fix: Move db.orders.push() to OrderService.create()

Status: 🔴 Changes Requested
```

## 🎯 Key Components

### 1. ADR Documents (`docs/adr/*.md`)
```
┌─────────────────────────────┐
│   Architecture Decision     │
│         Records             │
├─────────────────────────────┤
│ • Rules are clearly stated  │
│ • Examples provided         │
│ • Consequences documented   │
│ • Machine-readable format   │
└─────────────────────────────┘
```

### 2. Copilot Instructions (`.github/copilot-instructions.md`)
```
┌─────────────────────────────┐
│     Review Instructions     │
├─────────────────────────────┤
│ • Act as Senior Architect   │
│ • Cross-reference ADRs      │
│ • Cite violations clearly   │
│ • Provide actionable fixes  │
└─────────────────────────────┘
```

### 3. GitHub Actions (`.github/workflows/adr-compliance.yml`)
```
┌─────────────────────────────┐
│   Automated CI/CD Checks    │
├─────────────────────────────┤
│ • Detect changed files      │
│ • Run pattern matching      │
│ • Verify ADR files exist    │
│ • Display summary           │
└─────────────────────────────┘
```

## 🔐 Branch Protection Flow

```
┌──────────────────┐
│  Developer       │
│  Creates PR      │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│   Branch Protection Rules    │
│   (Optional but Recommended) │
└────────┬─────────────────────┘
         │
         ├─ ✓ Require Copilot Review passing
         ├─ ✓ Require GitHub Actions passing
         ├─ ✓ Require up-to-date branch
         └─ ✓ Require review approval
         │
         ▼
┌──────────────────┐      ┌──────────────────┐
│   All Checks     │  NO  │   Merge Blocked  │
│   Passing?       ├─────→│   ⛔             │
└────────┬─────────┘      └──────────────────┘
         │ YES
         ▼
┌──────────────────┐
│  Merge Allowed   │
│  ✅             │
└──────────────────┘
```

## 📊 Repository Structure Map

```
ai-adr-review-demo/
│
├── 📁 .github/
│   ├── 📄 copilot-instructions.md  ← Copilot's "brain"
│   └── 📁 workflows/
│       └── 📄 adr-compliance.yml    ← Automated checks
│
├── 📁 docs/adr/                     ← Source of truth
│   ├── 📄 0001-numeric-ids.md       ← Rule #1
│   ├── 📄 0002-response-envelope.md ← Rule #2
│   └── 📄 0003-service-layer.md     ← Rule #3
│
├── 📁 src/
│   ├── 📁 controllers/              ← HTTP handlers (thin)
│   │   ├── 📄 BookController.ts     ✅ Compliant
│   │   └── 📄 AuthorController.ts   ✅ Compliant
│   │
│   ├── 📁 services/                 ← Business logic
│   │   ├── 📄 BookService.ts        ✅ Compliant
│   │   └── 📄 AuthorService.ts      ✅ Compliant
│   │
│   └── 📁 models/                   ← Data structures
│       ├── 📄 Book.ts               ✅ Compliant
│       └── 📄 Author.ts             ✅ Compliant
│
├── 📁 Demo Branches/
│   ├── 🔀 feat/authors-uuid         ❌ Violates ADR-0001
│   ├── 🔀 feat/health-check         ❌ Violates ADR-0002
│   └── 🔀 feat/order-logic          ❌ Violates ADR-0003
│
└── 📄 Documentation
    ├── README.md                    ← Overview
    ├── SETUP.md                     ← Detailed setup
    ├── QUICKSTART.md                ← 5-minute start
    ├── DEMO-BRANCHES.md             ← Violation examples
    └── WORKFLOW.md                  ← This file
```

## 🎓 Learning Path

```
Step 1: Read README.md
   ↓
Step 2: Follow QUICKSTART.md
   ↓
Step 3: Enable Copilot Review
   ↓
Step 4: Test with feat/authors-uuid
   ↓
Step 5: Observe Copilot's feedback
   ↓
Step 6: Test remaining demo branches
   ↓
Step 7: Read SETUP.md for details
   ↓
Step 8: Customize for your project
```

## 💡 Key Insights

1. **ADRs are Machine-Readable:** Write them clearly so AI can parse them
2. **Instructions Matter:** `.github/copilot-instructions.md` guides the AI
3. **Automation Scales:** Once set up, enforcement is automatic
4. **Fast Feedback:** Violations caught in PR review, not production
5. **Living Documentation:** ADRs stay synced with code via enforcement

---

For more details, see:
- [README.md](README.md) - Full overview
- [SETUP.md](SETUP.md) - Setup instructions
- [DEMO-BRANCHES.md](DEMO-BRANCHES.md) - Violation examples
