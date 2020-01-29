import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';

class SchenduleController {
  async index(req, res) {
    const isUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!isUserProvider) {
      return res.status(401).json({
        error: 'User is not a provider',
      });
    }

    const { date = new Date().toISOString() } = req.query;

    const parsedDate = parseISO(date);

    console.log(parsedDate);

    const schendules = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });

    return res.json(schendules || []);
  }
}

export default new SchenduleController();
