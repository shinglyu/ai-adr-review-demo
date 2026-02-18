# Quick Start Guide

Get the Architecture Compliance Agent demo running in 5 minutes!

## 🚀 Quick Start

### 1. Enable GitHub Copilot Code Review (2 minutes)

1. Go to your repository **Settings**
2. Click **Code security and analysis**
3. Find **GitHub Copilot** section
4. Click **Enable** for "Code review"

### 2. Test with a Demo Branch (3 minutes)

```bash
# Push one of the demo branches
git push origin feat/authors-uuid

# Or push all three demo branches
git push origin feat/authors-uuid
git push origin feat/health-check
git push origin feat/order-logic
```

### 3. Create a Pull Request

1. Go to **Pull requests** → **New pull request**
2. Base: `main` | Compare: `feat/authors-uuid`
3. Click **Create pull request**

### 4. Watch GitHub Copilot Review! 🤖

Within a few minutes, GitHub Copilot will:
- ✅ Analyze the code changes
- 🚫 Detect the ADR-0001 violation (UUID usage)
- 💬 Post a detailed review comment
- ⛔ Request changes

## 📋 What's in This Demo?

### 3 ADRs (Architecture Rules):
- **ADR-0001:** Use numeric IDs, not UUIDs
- **ADR-0002:** Wrap all responses in `{ data: ... }`
- **ADR-0003:** No database logic in controllers

### 3 Demo Violations:
- `feat/authors-uuid` → Uses string/UUID IDs ❌
- `feat/health-check` → Missing data wrapper ❌
- `feat/order-logic` → DB operations in controller ❌

## 🎯 Expected Results

### Demo 1: UUID Violation
**Branch:** `feat/authors-uuid`

Copilot will comment:
```
🚫 Architecture Violation: ADR-0001

Issue: Uses id: string instead of id: number
ADR Reference: docs/adr/0001-numeric-ids.md
Required Action: Change to numeric IDs for legacy compatibility
```

### Demo 2: Response Envelope Violation
**Branch:** `feat/health-check`

Copilot will comment:
```
🚫 Architecture Violation: ADR-0002

Issue: Response missing { data: ... } wrapper
ADR Reference: docs/adr/0002-response-envelope.md
Required Action: Wrap response: res.json({ data: { status: 'ok' } })
```

### Demo 3: Service Layer Violation
**Branch:** `feat/order-logic`

Copilot will comment:
```
🚫 Architecture Violation: ADR-0003

Issue: Direct database operations in controller
ADR Reference: docs/adr/0003-service-layer.md
Required Action: Move db.orders.push() to OrderService
```

## 📖 Next Steps

1. ✅ **Read the full docs:**
   - [`README.md`](README.md) - Overview and features
   - [`SETUP.md`](SETUP.md) - Detailed setup instructions
   - [`DEMO-BRANCHES.md`](DEMO-BRANCHES.md) - Explanation of violations

2. 🔧 **Customize for your project:**
   - Add your own ADRs to `docs/adr/`
   - Edit `.github/copilot-instructions.md`
   - Create your own violation examples

3. 🎓 **Learn more:**
   - [GitHub Copilot Docs](https://docs.github.com/en/copilot)
   - [ADR Best Practices](https://adr.github.io/)

## 🆘 Troubleshooting

**Copilot not reviewing?**
- ✅ Check Copilot is enabled in Settings
- ✅ Verify you have an active Copilot subscription
- ✅ Ensure PR is from the same repo (not a fork)

**Need help?**
- 📚 Check `SETUP.md` for detailed instructions
- 💬 Open an issue in this repository

---

**That's it!** You now have an automated architecture compliance system powered by AI. 🎉
