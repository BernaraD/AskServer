import Practice from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function practiceUpdateById(req, res) {
  const practiceId = get(req, 'params.practiceId');
  const userId = get(req, 'userData.userId');

  Practice.updateOne({ _id: practiceId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Practice updated'));
      } else {
        res.status(400).json(message.fail('Practice not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('PRACTICE_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Practice',
        entityId: practiceId,
        user: userId,
        controller: 'practiceUpdateById',
      });

      res.status(400).json(message.fail('Practice update error', analyticsId));
    });
}
