const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  // Connect to the MongoDB test database
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up and close the MongoDB connection after all tests
  await mongoose.connection.close();
});

describe('User API', () => {
  let userId;

  // Create a user
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
      });
    userId = res.body._id;
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('John Doe');
  });

  // Get all users
  it('should fetch all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Get a user by ID
  it('should fetch a user by ID', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(userId);
  });

  // Update a user
  it('should update a user', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'Jane Doe',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Jane Doe');
  });

  // Delete a user
  it('should delete a user', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
  });
});
