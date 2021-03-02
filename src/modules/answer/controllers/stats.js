import Answers from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const answersStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Answers.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Answers Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('ANSWERS_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Answers',
      user: userId,
      controller: 'answersStats',
    });

    res.status(400).json(message.fail('Answers Stats error', analyticsId));
  }
};

export default answersStats;
