import request from 'supertest';
import { createApp } from '../../app.js';
import { prisma } from '../../config/prisma.js';
import bcrypt from 'bcryptjs';

const app = createApp();

describe('Auth API Endpoints', () => {
  beforeAll(async () => {
    await prisma.statusUpdate.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.role.createMany({
      data: [{ name: 'REQUESTER' }, { name: 'OFFICER' }, { name: 'ADMIN' }]
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testregister@example.com',
        password: 'password123',
        fullName: 'Test Register',
        userType: 'STUDENT',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    // create user
    const role = await prisma.role.findUnique({ where: { name: 'REQUESTER' } });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    await prisma.user.create({
      data: {
        email: 'testlogin@example.com',
        passwordHash,
        fullName: 'Test Login',
        roleId: role.id
      }
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testlogin@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
  });
});
