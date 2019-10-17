import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Benefited', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to get all benefiteds by user', async () => {
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
      .get('/benefited')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should be able to create a benefited by user', async () => {
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
      .post('/benefited')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        name: 'Mario Machado',
        cpf: '03523041050',
        phone: '55519970399334',
      });

    expect(response.status).toBe(200);
  });

  it('should be able to update a benefited by user', async () => {
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

    const benefited = await request(app)
      .post('/benefited')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        name: 'Mario Machado',
        cpf: '03523041050',
        phone: '55519970399334',
      });

    const response = await request(app)
      .put(`/benefited/${benefited.body.id}`)
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        name: 'Mario Silva',
        phone: '55519970399355',
      });

    expect(response.status).toBe(200);
  });

  it('should be able to remove a benefited by user', async () => {
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

    const benefited = await request(app)
      .post('/benefited')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        name: 'Mario Machado',
        cpf: '03523041050',
        phone: '55519970399334',
      });

    const response = await request(app)
      .delete(`/benefited/${benefited.body.id}`)
      .set('Authorization', `Bearer ${session.body.token}`)
      .send();

    expect(response.status).toBe(200);
  });
});
