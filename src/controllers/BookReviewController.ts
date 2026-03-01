import { bookReviewService } from '../services/BookReviewService';

/**
 * BookReviewController
 * ✅ Compliant with ADR-0002: Uses response envelope { data: ... }
 * ✅ Compliant with ADR-0003: Delegates to service layer
 */
export class BookReviewController {
  /**
   * GET /books/:bookId/reviews
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async getReviewsByBook(req: any, res: any) {
    const bookId = parseInt(req.params.bookId);
    const reviews = await bookReviewService.findByBookId(bookId);
    res.json({ data: reviews });
  }

  /**
   * GET /books/:bookId/reviews/:id
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async getReview(req: any, res: any) {
    const id = parseInt(req.params.id);
    const review = await bookReviewService.findById(id);

    if (!review) {
      return res.status(404).json({ data: null, error: 'Review not found' });
    }

    res.json({ data: review });
  }

  /**
   * POST /books/:bookId/reviews
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async createReview(req: any, res: any) {
    try {
      const bookId = parseInt(req.params.bookId);
      const newReview = await bookReviewService.create({ bookId, ...req.body });
      res.status(201).json({ data: newReview });
    } catch (err: any) {
      res.status(400).json({ data: null, error: err.message });
    }
  }

  /**
   * PUT /books/:bookId/reviews/:id
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async updateReview(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const updated = await bookReviewService.update(id, req.body);

      if (!updated) {
        return res.status(404).json({ data: null, error: 'Review not found' });
      }

      res.json({ data: updated });
    } catch (err: any) {
      res.status(400).json({ data: null, error: err.message });
    }
  }

  /**
   * DELETE /books/:bookId/reviews/:id
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async deleteReview(req: any, res: any) {
    const id = parseInt(req.params.id);
    const deleted = await bookReviewService.delete(id);

    if (!deleted) {
      return res.status(404).json({ data: null, error: 'Review not found' });
    }

    res.json({ data: { deleted: true } });
  }

  /**
   * GET /books/:bookId/reviews/average
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service for average rating calculation
   */
  async getAverageRating(req: any, res: any) {
    const bookId = parseInt(req.params.bookId);
    const average = await bookReviewService.getAverageRating(bookId);

    if (average === null) {
      return res.status(404).json({ data: null, error: 'No reviews found for this book' });
    }

    res.json({ data: { bookId, averageRating: average } });
  }
}

export const bookReviewController = new BookReviewController();
