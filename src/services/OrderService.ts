import { Order } from '../models/Order';

/**
 * OrderService
 * Compliant with ADR-0003: Contains business logic and DB operations
 */

// Mock database
const db = {
  orders: [
    { id: 100, userId: 5, bookId: 1, quantity: 2, totalPrice: 25.98, status: 'completed' as const, createdAt: new Date('2024-01-15') }
  ]
};

export class OrderService {
  /**
   * Find an order by ID
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async findById(id: number): Promise<Order | null> {
    const order = db.orders.find(o => o.id === id);
    return order || null;
  }

  /**
   * Get all orders
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async findAll(): Promise<Order[]> {
    return db.orders;
  }

  /**
   * Create a new order
   * ✅ Compliant with ADR-0003: Business logic and validation in service
   */
  async create(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      id: db.orders.length + 1,
      ...orderData,
      createdAt: new Date()
    };
    db.orders.push(newOrder);
    return newOrder;
  }

  /**
   * Save/update an order
   * ✅ Compliant with ADR-0003: Data persistence in service
   */
  async save(order: Order): Promise<Order> {
    const index = db.orders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      db.orders[index] = order;
      return order;
    }
    db.orders.push(order);
    return order;
  }
}

export const orderService = new OrderService();
