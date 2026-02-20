import type { InferSelectModel } from 'drizzle-orm';
import { productsSchema } from '../../src/infrastructure/db/schema/products';

type Product = InferSelectModel<typeof productsSchema>;

export const mockProducts: Product[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    title: 'Espresso',
    shortDescription: 'Strong coffee',
    description: 'Rich taste...',
    count: 50,
    price: 2500,
    image: 'https://example.com/espresso.jpg',
    categoryId: 'cccc1111-cccc-cccc-cccc-cccccccccccc',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    title: 'Cappuccino',
    shortDescription: 'With milk foam',
    description: 'Creamy...',
    count: 40,
    price: 3500,
    image: 'https://example.com/cappuccino.jpg',
    categoryId: 'cccc1111-cccc-cccc-cccc-cccccccccccc',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02'),
  },
];

export const mockDb = {
  select: () => ({
    from: (table: any) => {
      if (table === productsSchema) {
        return {
          all: async () => mockProducts,
          where: (condition: any) => ({
            async all() {
              return mockProducts;
            },
            async get() {
              return mockProducts[0] || null;
            },
          }),
        };
      }
      throw new Error('Mock: unknown table');
    },
  }),

  query: {
    products: {
      findMany: async () => mockProducts,
      findFirst: async () => mockProducts[0] || null,
    },
  },

  insert: (table: any) => ({
    values: (values: any) => ({
      returning: async () => [{ ...values, id: crypto.randomUUID(), createdAt: new Date(), updatedAt: new Date() }],
    }),
  }),

  update: () => ({
    set: () => ({
      where: () => ({
        returning: async () => [mockProducts[0]],
      }),
    }),
  }),

  delete: () => ({
    where: () => ({
      returning: async () => [],
    }),
  }),
};
