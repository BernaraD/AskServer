import Question from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const questionStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Question.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Question Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('QUESTION_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Question',
      user: userId,
      controller: 'questionStats',
    });

    res.status(400).json(message.fail('Question Stats error', analyticsId));
  }
};

export default questionStats;
