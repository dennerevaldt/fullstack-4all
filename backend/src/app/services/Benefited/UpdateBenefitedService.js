import User from '../../models/User';

class UpdateBenefitedService {
  async run({ name, phone, id }) {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    const toUpdate = {};
    if (name) toUpdate.name = name;
    if (phone) toUpdate.phone = phone;

    await user.update(toUpdate);

    return user;
  }
}

export default new UpdateBenefitedService();
