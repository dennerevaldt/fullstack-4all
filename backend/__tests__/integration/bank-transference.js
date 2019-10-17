import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Bank Statement', () => {
  let token;
  let benefited;

  beforeAll(async () => {
    await truncate();

    const userResponse = await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '03523041031',
        phone: '5551997036676',
      });

    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        cpf: userResponse.body.cpf,
      });

    token = sessionResponse.body.token;

    const benefitedResponse = await request(app)
      .post('/benefited')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mario Machado',
        cpf: '03523041050',
        phone: '55519970399334',
      });

    benefited = benefitedResponse.body;
  });

  it('should be able to do two transferences in two minutes but just one is valid', async () => {
    await request(app)
      .post(`/transferences/${benefited.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 100,
      });

    await request(app)
      .post(`/transferences/${benefited.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 100,
      });

    const statement = await request(app)
      .get('/bank-statements')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(statement.status).toBe(200);
    expect(Array.isArray(statement.body)).toBe(true);
    expect(statement.body[0].status).toBe('success');
    expect(statement.body[1].status).toBe('cancelled');
  });

  it('should be able to do transference for another user', async () => {
    const transference = await request(app)
      .post(`/transferences/${benefited.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 100,
      });

    const balance = await request(app)
      .get('/balances')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(transference.status).toBe(200);
    expect(transference.body).toHaveProperty('message');
    expect(balance.status).toBe(200);
    expect(balance.body).toHaveProperty('balance');
    expect(balance.body.balance).toBe(900);
  });

  it('should be able to do transference for another user using limit', async () => {
    const transference = await request(app)
      .post(`/transferences/${benefited.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 1000,
      });

    const balance = await request(app)
      .get('/balances')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(transference.status).toBe(200);
    expect(transference.body).toHaveProperty('message');
    expect(balance.status).toBe(200);
    expect(balance.body).toHaveProperty('balance');
    expect(balance.body.balance).toBe(0);
  });

  it('should not be able to do transference for another because have insuficient balance', async () => {
    const transference = await request(app)
      .post(`/transferences/${benefited.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 500,
      });

    expect(transference.status).toBe(400);
    expect(transference.body).toHaveProperty('error');
  });
});
