/**
 * Order Model
 * Compliant with ADR-0001: Uses numeric ID
 */
export interface Order {
  id: number;  // ✅ Compliant with ADR-0001: Numeric IDs
  userId: number;
  bookId: number;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

/**
 * Example of a compliant order object
 */
export const exampleOrder: Order = {
  id: 100,
  userId: 5,
  bookId: 1,
  quantity: 2,
  totalPrice: 25.98,
  status: 'completed',
  createdAt: new Date('2024-01-15')
};
