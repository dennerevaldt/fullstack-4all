import CreateBenefitedService from '../services/Benefited/CreateBenefitedService';
import UpdateBenefitedService from '../services/Benefited/UpdateBenefitedService';
import DeleteBenefitedService from '../services/Benefited/DeleteBenefitedService';
import ListBenefitedService from '../services/Benefited/ListBenefitedService';

class BenefitedController {
  async index(req, res, next) {
    const { userId } = req;

    const response = await ListBenefitedService.run({
      userId,
    });

    return res.json(response);
  }

  async store(req, res, next) {
    const { userId } = req;
    const { name, cpf, phone } = req.body;

    const response = await CreateBenefitedService.run({
      userId,
      name,
      cpf,
      phone,
    });

    return res.json(response);
  }

  async update(req, res, next) {
    const { name, phone } = req.body;
    const { id } = req.params;

    const response = await UpdateBenefitedService.run({
      name,
      phone,
      id,
    });

    return res.json(response);
  }

  async delete(req, res, next) {
    const { userId } = req;
    const { id } = req.params;

    const response = await DeleteBenefitedService.run({
      userId,
      id,
    });

    return res.json(response);
  }
}

export default new BenefitedController();
