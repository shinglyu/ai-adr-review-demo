# Demo Branches Guide

This document describes the three demo branches included in this repository, each containing intentional ADR violations.

## 🎯 Purpose

These branches demonstrate how GitHub Copilot Code Review detects and flags architectural violations based on the ADRs defined in `docs/adr/`.

## 📊 Demo Branches Overview

### 1. `feat/authors-uuid` - UUID Violation

**Status:** ❌ Violates ADR-0001: Use Numeric IDs

**Changes:**
- File: `src/models/Author.ts`
- Violation: Uses `id: string` (for UUIDs) instead of `id: number`

**What Changed:**
```diff
- id: number;  // ✅ Compliant
+ id: string;  // ❌ Violates ADR-0001
```

**Expected Review Feedback:**
GitHub Copilot should flag this with a comment citing **ADR-0001** and explaining that all resource IDs must be numeric integers for compatibility with legacy systems.

**How to Test:**
```bash
# Create a PR from this branch
git checkout feat/authors-uuid
git push origin feat/authors-uuid
# Then create a PR on GitHub: base: main, compare: feat/authors-uuid
```

**How to Fix:**
```typescript
export interface Author {
  id: number;  // ✅ Change back to number
  name: string;
  email: string;
  bio?: string;
}
```

---

### 2. `feat/health-check` - Response Envelope Violation

**Status:** ❌ Violates ADR-0002: Standard Response Envelope

**Changes:**
- File: `src/controllers/status.ts` (new file)
- Violation: Returns `{ status: 'ok' }` instead of `{ data: { status: 'ok' } }`

**What Changed:**
```typescript
// ❌ Violates ADR-0002
async getStatus(req: any, res: any) {
  res.json({ status: 'ok' });  // Missing data wrapper
}

async getHealth(req: any, res: any) {
  res.json({ 
    healthy: true,  // Missing data wrapper
    timestamp: Date.now() 
  });
}
```

**Expected Review Feedback:**
GitHub Copilot should flag this with a comment citing **ADR-0002** and explaining that all API responses must be wrapped in a `{ "data": <payload> }` envelope.

**How to Test:**
```bash
# Create a PR from this branch
git checkout feat/health-check
git push origin feat/health-check
# Then create a PR on GitHub: base: main, compare: feat/health-check
```

**How to Fix:**
```typescript
// ✅ Compliant version
async getStatus(req: any, res: any) {
  res.json({ data: { status: 'ok' } });
}

async getHealth(req: any, res: any) {
  res.json({ 
    data: {
      healthy: true,
      timestamp: Date.now()
    }
  });
}
```

---

### 3. `feat/order-logic` - Service Layer Violation

**Status:** ❌ Violates ADR-0003: Service Layer Pattern

**Changes:**
- File: `src/controllers/OrderController.ts` (new file)
- Violation: Performs direct database operations in the controller

**What Changed:**
```typescript
// ❌ Violates ADR-0003
export class OrderController {
  async createOrder(req: any, res: any) {
    const newOrder: Order = { /* ... */ };
    
    // ❌ Direct DB operation in controller
    db.orders.push(newOrder);
    
    res.status(201).json({ data: newOrder });
  }

  async updateOrder(req: any, res: any) {
    // ❌ Direct DB query in controller
    const order = db.orders.find(o => o.id === orderId);
    // ❌ Direct DB mutation
    Object.assign(order, updates);
  }
}
```

**Expected Review Feedback:**
GitHub Copilot should flag this with a comment citing **ADR-0003** and explaining that business logic and database operations must be in the service layer, not controllers.

**How to Test:**
```bash
# Create a PR from this branch
git checkout feat/order-logic
git push origin feat/order-logic
# Then create a PR on GitHub: base: main, compare: feat/order-logic
```

**How to Fix:**
```typescript
// ✅ Compliant version

// In src/controllers/OrderController.ts
import { orderService } from '../services/OrderService';

export class OrderController {
  async createOrder(req: any, res: any) {
    // ✅ Delegate to service
    const newOrder = await orderService.create(req.body);
    res.status(201).json({ data: newOrder });
  }

  async updateOrder(req: any, res: any) {
    const orderId = parseInt(req.params.id);
    // ✅ Delegate to service
    const order = await orderService.update(orderId, req.body);
    res.json({ data: order });
  }
}

// In src/services/OrderService.ts
export class OrderService {
  async create(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    // ✅ DB operations belong here
    const newOrder: Order = { /* ... */ };
    db.orders.push(newOrder);
    return newOrder;
  }
}
```

---

## 🔄 Testing Workflow

### For Each Demo Branch:

1. **Push the branch to GitHub** (if you have access)
   ```bash
   git push origin <branch-name>
   ```

2. **Create a Pull Request**
   - Go to GitHub repository
   - Click "Pull requests" → "New pull request"
   - Base: `main` (or your default branch)
   - Compare: `<demo-branch-name>`
   - Click "Create pull request"

3. **Wait for Copilot Review**
   - GitHub Actions will run automated checks
   - GitHub Copilot will analyze the changes
   - Review comments will appear within a few minutes

4. **Observe the Violation Comments**
   - Copilot should cite the specific ADR
   - Explain what's wrong
   - Suggest how to fix it
   - Mark the PR as "Changes Requested"

5. **Fix and Re-test (Optional)**
   - Apply the suggested fixes
   - Push new commits to the same branch
   - Copilot will re-review automatically

## 📝 Creating Your Own Test Violations

Want to test additional scenarios? Here are some ideas:

### Additional ADR-0001 Violations:
```typescript
// Using GUID/UUID packages
import { v4 as uuidv4 } from 'uuid';

export interface Book {
  id: string;  // ❌ Violation
  uuid: string;  // ❌ Even worse
}
```

### Additional ADR-0002 Violations:
```typescript
// Returning arrays directly
res.json([{ id: 1 }, { id: 2 }]);  // ❌ Should be: { data: [...] }

// Returning error objects directly
res.status(404).json({ error: 'Not found' });  // ❌ Should include data: null
```

### Additional ADR-0003 Violations:
```typescript
// Business logic in controller
async calculateDiscount(req: any, res: any) {
  const price = req.body.price;
  const discount = price * 0.1;  // ❌ Business logic
  res.json({ data: { discountedPrice: price - discount } });
}

// Validation in controller
if (req.body.email.indexOf('@') === -1) {  // ❌ Validation logic
  return res.status(400).json({ error: 'Invalid email' });
}
```

## 🎓 Learning Objectives

By testing these demo branches, you will learn:

1. ✅ How to document architectural decisions as ADRs
2. ✅ How to configure GitHub Copilot for automated reviews
3. ✅ How Copilot interprets and enforces architectural rules
4. ✅ The importance of clear, machine-readable ADR documentation
5. ✅ How to integrate architecture compliance into your CI/CD pipeline

## 🔗 Related Files

- **ADR Documents:** `docs/adr/*.md`
- **Copilot Instructions:** `.github/copilot-instructions.md`
- **GitHub Workflow:** `.github/workflows/adr-compliance.yml`
- **Setup Guide:** `SETUP.md`

---

**Remember:** These violations are intentional for demonstration purposes. In a real project, you would fix them before merging!
