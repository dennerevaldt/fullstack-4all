import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '03523041031',
        phone: '5551997036676',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated cpf', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '03523041031',
        phone: '5551997036676',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '03523041031',
        phone: '5551997036676',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to register with invalid data', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '',
        phone: '55',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to delete one register', async () => {
    const user = await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '03523041031',
        phone: '5551997036676',
      });

    const data = await request(app)
      .post('/sessions')
      .send({
        cpf: user.body.cpf,
      });

    const response = await request(app)
      .delete(`/users`)
      .set('Authorization', `Bearer ${data.body.token}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should not be able to update one register', async () => {
    const user = await request(app)
      .post('/users')
      .send({
        name: 'Denner Machado',
        cpf: '03523041031',
        phone: '5551997036676',
      });

    const data = await request(app)
      .post('/sessions')
      .send({
        cpf: user.body.cpf,
      });

    const response = await request(app)
      .put(`/users`)
      .set('Authorization', `Bearer ${data.body.token}`)
      .send({
        name: 'Denner Evaldt',
        phone: '5551997034445',
      });

    expect(response.status).toBe(200);
  });
});
