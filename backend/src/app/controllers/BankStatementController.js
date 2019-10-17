import ListBankStatementService from '../services/BankStatement/ListBankStatementService';

class BankStatementController {
  async index(req, res, next) {
    const { userId } = req;

    const response = await ListBankStatementService.run({
      userId,
    });

    return res.json(response);
  }
}

export default new BankStatementController();
