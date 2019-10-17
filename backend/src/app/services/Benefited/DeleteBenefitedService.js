import Benefited from '../../models/Benefited';

class DeleteBenefitedService {
  async run({ userId, id }) {
    const benefited = await Benefited.findOne({
      where: {
        user_id: userId,
        benefited_id: id,
      },
    });

    await benefited.update({
      active: false,
    });

    return benefited;
  }
}

export default new DeleteBenefitedService();
