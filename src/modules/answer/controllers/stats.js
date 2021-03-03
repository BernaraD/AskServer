import Answer from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const answerStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Answer.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Answer Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('ANSWER_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Answer',
      user: userId,
      controller: 'answerStats',
    });

    res.status(400).json(message.fail('Answer Stats error', analyticsId));
  }
};

export default answerStats;
