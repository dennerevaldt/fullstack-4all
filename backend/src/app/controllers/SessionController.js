import CreateSessionService from '../services/Session/CreateSessionService';

class SessionController {
  async store(req, res, next) {
    const { cpf } = req.body;

    const response = await CreateSessionService.run({
      cpf,
    });

    return res.json(response);
  }
}

export default new SessionController();
