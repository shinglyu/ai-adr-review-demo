# ADR-0003: Service Layer Pattern

## Status
Accepted

## Context
Our codebase has grown complex, and mixing business logic with HTTP request handling creates several problems:
- Controllers become bloated and hard to test
- Business rules are duplicated across different endpoints
- Database queries are scattered throughout the codebase
- Unit testing requires mocking HTTP request/response objects

## Decision
Implement a strict **Service Layer Pattern** where:
1. **Controllers** (`src/controllers/`) handle HTTP concerns only (request parsing, response formatting, status codes)
2. **Services** (`src/services/`) contain all business logic and database operations
3. Controllers must delegate to services for any data access or business rules

### Architecture:
```
┌─────────────┐
│ Controller  │  ← HTTP only: req/res handling
└──────┬──────┘
       │ calls
       ▼
┌─────────────┐
│  Service    │  ← Business logic + DB queries
└──────┬──────┘
       │ uses
       ▼
┌─────────────┐
│   Model     │  ← Data structure definitions
└─────────────┘
```

### Examples:

```typescript
// ✅ CORRECT - Controller delegates to service
class BookController {
  async getBook(req, res) {
    const book = await bookService.findById(req.params.id);
    res.json({ data: book });
  }
}

// ❌ WRONG - Controller has DB logic
class BookController {
  async getBook(req, res) {
    const book = await db.books.findOne({ id: req.params.id }); // ❌ Direct DB access
    res.json({ data: book });
  }
}
```

```typescript
// ✅ CORRECT - Service handles business logic
class BookService {
  async findById(id: number) {
    return await db.books.findOne({ id });
  }
  
  async applyDiscount(bookId: number, discountPercent: number) {
    // Business logic here
    const book = await db.books.findOne({ id: bookId });
    book.price = book.price * (1 - discountPercent / 100);
    return await db.books.save(book);
  }
}
```

## Consequences
### Positive:
- Clear separation of concerns
- Business logic is reusable across different controllers or even APIs
- Easier unit testing (services can be tested without HTTP mocking)
- Controllers stay thin and focused

### Negative:
- More files to maintain
- Simple CRUD operations may feel over-engineered initially
- Slight learning curve for new developers

## Compliance
**Controllers must NOT contain:**
- Direct database queries (e.g., `db.*.find()`, `db.*.save()`)
- Business logic or calculations
- Data validation beyond basic type checking

**All business logic and data access must be in `src/services/`.**

Violations of this ADR will be flagged during code review.
