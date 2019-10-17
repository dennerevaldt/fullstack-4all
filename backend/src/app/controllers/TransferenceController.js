import CreateTransferenceService from '../services/Transference/CreateTransferenceService';

class TransferenceController {
  async store(req, res, next) {
    const { userId } = req;
    const { id } = req.params;
    const { value } = req.body;

    const response = await CreateTransferenceService.run({
      userId,
      id,
      value: parseFloat(value),
    });

    return res.json({
      message: res.__(response.message),
    });
  }
}

export default new TransferenceController();
