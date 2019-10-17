import CreateUserService from '../services/User/CreateUserService';
import UpdateUserService from '../services/User/UpdateUserService';
import DeleteUserService from '../services/User/DeleteUserService';

class UserController {
  async store(req, res, next) {
    const { name, cpf, phone } = req.body;
    const response = await CreateUserService.run({
      name,
      cpf,
      phone,
    });

    return res.json(response);
  }

  async update(req, res, next) {
    const { userId } = req;
    const { name, phone } = req.body;

    const response = await UpdateUserService.run({
      userId,
      name,
      phone,
    });

    return res.json(response);
  }

  async delete(req, res, next) {
    const { userId } = req;

    const response = await DeleteUserService.run({
      userId,
    });

    return res.json(response);
  }
}

export default new UserController();
