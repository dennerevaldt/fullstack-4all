import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '03523041031',
        phone: '5551997036676',
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        cpf: '03523041031',
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        cpf: '03523041039',
      });

    expect(response.status).toBe(401);
  });

  it('should not access endpoint without credentials', async () => {
    const response = await request(app)
      .get('/bank-statements')
      .send();

    expect(response.status).toBe(401);
  });

  it('should not access endpoint with invalid credentials', async () => {
    const response = await request(app)
      .get('/bank-statements')
      .set('Authorization', 'Bearer 123')
      .send();

    expect(response.status).toBe(401);
  });
});
