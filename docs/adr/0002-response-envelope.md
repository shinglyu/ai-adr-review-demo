# ADR-0002: Standard Response Envelope

## Status
Accepted

## Context
As our API grows, we need a consistent way to include metadata (pagination, error details, versioning) alongside the actual data payload. Directly returning raw data makes it difficult to add these fields later without breaking clients.

## Decision
All API responses must be wrapped in a standard envelope with a `data` field containing the actual payload.

### Standard Format:
```typescript
// ✅ CORRECT
{
  "data": <payload>
}

// For single resources
{
  "data": {
    "id": 1,
    "title": "The Great Gatsby"
  }
}

// For collections
{
  "data": [
    { "id": 1, "title": "Book 1" },
    { "id": 2, "title": "Book 2" }
  ]
}

// ❌ WRONG - Direct response without envelope
{
  "id": 1,
  "title": "The Great Gatsby"
}
```

### Future Extensions:
```typescript
// Room to add metadata
{
  "data": [...],
  "meta": {
    "page": 1,
    "totalPages": 10
  }
}
```

## Consequences
### Positive:
- Future-proof API design for pagination and metadata
- Consistent response structure across all endpoints
- Easier to implement error standardization

### Negative:
- Slightly larger response payloads
- Clients need to access `.data` for the actual content

## Compliance
**All controllers in `src/controllers/` must wrap responses using `{ "data": ... }`.**

Violations of this ADR will be flagged during code review.
