# Quick Start Guide

Get the Architecture Compliance Agent demo running in 5 minutes!

## 🚀 Quick Start

### 1. Enable GitHub Copilot Code Review (2 minutes)

1. Go to your repository **Settings**
2. Click **Code security and analysis**
3. Find **GitHub Copilot** section
4. Click **Enable** for "Code review"

### 2. Create a Demo Violation (3 minutes)

To test the compliance checking, create a simple violation in your own branch:

```bash
# Create a test branch
git checkout -b test/my-adr-violation

# Make a simple violation (example: use UUID instead of number)
# Edit src/models/Book.ts and change:
#   id: number;
# to:
#   id: string;  // This violates ADR-0001

# Commit and push
git add src/models/Book.ts
git commit -m "test: Try using string ID"
git push origin test/my-adr-violation
```

**Alternative:** Review the compliant code in the `main` branch to see examples of ADR-following code.

### 3. Create a Pull Request

1. Go to **Pull requests** → **New pull request**
2. Base: `main` (or your default branch) | Compare: `test/my-adr-violation`
3. Click **Create pull request**

### 4. Watch GitHub Copilot Review! 🤖

Within a few minutes, GitHub Copilot will:
- ✅ Analyze the code changes
- 🚫 Detect ADR violations (if any)
- 💬 Post detailed review comments
- ⛔ Request changes if violations found

## 📋 What's in This Demo?

### 3 ADRs (Architecture Rules):
- **ADR-0001:** Use numeric IDs, not UUIDs
- **ADR-0002:** Wrap all responses in `{ data: ... }`
- **ADR-0003:** No database logic in controllers

### 3 Demo Violation Examples:

You can create your own test branches with these violations:

- **UUID instead of numeric ID** → Change `id: number` to `id: string` in any model (violates ADR-0001)
- **Missing data wrapper** → Return `res.json({ status: 'ok' })` instead of `res.json({ data: { status: 'ok' } })` (violates ADR-0002)
- **DB operations in controller** → Add `db.orders.push()` directly in a controller (violates ADR-0003)

## 🎯 Expected Results

### Example: UUID Violation (ADR-0001)

If you change a model to use `id: string`:

Copilot will comment:
```
🚫 Architecture Violation: ADR-0001

Issue: Uses id: string instead of id: number
ADR Reference: docs/adr/0001-numeric-ids.md
Required Action: Change to numeric IDs for legacy compatibility
```

### Example: Response Envelope Violation (ADR-0002)

If you return unwrapped responses:

Copilot will comment:
```
🚫 Architecture Violation: ADR-0002

Issue: Response missing { data: ... } wrapper
ADR Reference: docs/adr/0002-response-envelope.md
Required Action: Wrap response: res.json({ data: { status: 'ok' } })
```

### Example: Service Layer Violation (ADR-0003)

If you add database operations in a controller:

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
