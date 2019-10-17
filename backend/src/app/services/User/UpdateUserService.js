import User from '../../models/User';

class UpdateUserService {
  async run({ userId, name, phone }) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const toUpdate = {};
    if (name) toUpdate.name = name;
    if (phone) toUpdate.phone = phone;

    await user.update(toUpdate);

    return user;
  }
}

export default new UpdateUserService();
