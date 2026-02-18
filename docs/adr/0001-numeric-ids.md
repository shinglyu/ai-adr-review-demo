# ADR-0001: Use Numeric IDs for All Resources

## Status
Accepted

## Context
Our bookstore API needs to maintain compatibility with legacy systems that were built before modern UUID adoption. These systems expect and are optimized for integer-based identifiers.

## Decision
All primary keys and public resource IDs must use **numeric integers** (e.g., `id: number` in TypeScript, `INTEGER` in databases).

### Examples of Compliance:
```typescript
// ✅ CORRECT
interface Book {
  id: number;
  title: string;
}

// ❌ WRONG
interface Book {
  id: string; // UUID or any string-based ID
  title: string;
}
```

## Consequences
### Positive:
- Seamless integration with legacy systems
- Smaller payload sizes and better database indexing performance
- Simpler human-readable URLs (e.g., `/books/42` vs `/books/550e8400-e29b-41d4-a716-446655440000`)

### Negative:
- Sequential IDs may expose business metrics (e.g., total number of orders)
- Requires careful handling of distributed ID generation in microservices

## Compliance
**All models in `src/models/` must use `id: number`.**

Violations of this ADR will be flagged during code review.
