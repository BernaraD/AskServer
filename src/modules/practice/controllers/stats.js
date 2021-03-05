import Practice from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const practiceStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Practice.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Practice Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('PRACTICE_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Practice',
      user: userId,
      controller: 'practiceStats',
    });

    res.status(400).json(message.fail('Practice Stats error', analyticsId));
  }
};

export default practiceStats;
