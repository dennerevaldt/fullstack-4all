import ListBalanceService from '../services/Balance/ListBalanceService';

class BalanceController {
  async index(req, res, next) {
    const { userId } = req;

    const response = await ListBalanceService.run({
      userId,
    });

    return res.json(response);
  }
}

export default new BalanceController();
