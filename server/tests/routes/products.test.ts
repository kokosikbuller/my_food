import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import { Elysia } from 'elysia';
import { productsRoutes } from '../../src/api/routes/product.routes';
import { mockDb } from '../mocks/db.mock';

const app = new Elysia()
  .state('db', mockDb)
  .use(productsRoutes);


describe('GET /products', () => {
  it('Get /products => should return 200 and array of products', async () => {
    const response = await app.handle(
      new Request('http://localhost:3000/products')
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');

    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThanOrEqual(1);
  });

  it('Get /products => should return valid fields', async () => {
    const response = await app.handle(
      new Request('http://localhost:3000/products')
    );

    const body = await response.json();

    expect(body).toBeArray();
    expect(body.length).toBeGreaterThan(0);

    const product = body[0];

    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('count');
    expect(product).toHaveProperty('categoryId');

    expect(['number', 'bigint']).toContain(typeof product.price);
    expect(['number', 'bigint']).toContain(typeof product.count);

    const price = Number(product.price);
    const count = Number(product.count);

    expect(price).not.toBeNaN();
    expect(count).not.toBeNaN();

    expect(price).toBeGreaterThan(0);
    expect(count).toBeGreaterThanOrEqual(0);

    expect(typeof product.title).toBe('string');

    expect(typeof product.id).toBe('string');
    expect(typeof product.categoryId).toBe('string');
  });
});