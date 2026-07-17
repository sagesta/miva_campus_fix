import request from 'supertest';
import { createApp } from '../../app.js';
import { prisma } from '../../config/prisma.js';

const app = createApp();
let userToken = '';

describe('Requests API Endpoints', () => {
  beforeAll(async () => {
    await prisma.serviceRequest.deleteMany();
    await prisma.requestCategory.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();

    const role = await prisma.role.create({ data: { name: 'REQUESTER' } });
    await prisma.requestCategory.create({ data: { name: 'Electrical', description: 'Elec issues' } });

    // Register a user to get token
    const res = await request(app).post('/api/auth/register').send({
      email: 'requester@example.com',
      password: 'password123',
      fullName: 'Req User',
      userType: 'STUDENT'
    });
    userToken = res.body.data.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new service request', async () => {
    const category = await prisma.requestCategory.findFirst();
    const res = await request(app)
      .post('/api/requests')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'Broken Light',
        description: 'Light in hallway is broken',
        location: 'Hallway A',
        categoryId: category.id,
        priority: 'MEDIUM'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Broken Light');
  });

  it('should list service requests', async () => {
    const res = await request(app)
      .get('/api/requests')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
