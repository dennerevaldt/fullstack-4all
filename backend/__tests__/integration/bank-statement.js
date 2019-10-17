import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Bank Statement', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to get bank statement by user', async () => {
    const user = await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '03523041031',
        phone: '5551997036676',
      });

    const session = await request(app)
      .post('/sessions')
      .send({
        cpf: user.body.cpf,
      });

    const response = await request(app)
      .get('/bank-statements')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send();

    expect(response.status).toBe(200);
  });
});
