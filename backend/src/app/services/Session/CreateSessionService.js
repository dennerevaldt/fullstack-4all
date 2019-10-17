import jwt from 'jsonwebtoken';

import User from '../../models/User';
import StatusError from '../../../errors/status';

import authConfig from '../../../config/auth';

class CreateSessionService {
  async run({ cpf }) {
    const user = await User.findOne({
      where: {
        cpf,
        active: true,
      },
    });

    if (!user) throw new StatusError(401, 'session.userNotFound');

    const { id, name } = user;

    return {
      user: {
        id,
        name,
      },
      token: jwt.sign(
        {
          id,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    };
  }
}

export default new CreateSessionService();
