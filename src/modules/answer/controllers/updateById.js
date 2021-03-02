import Answers from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function answersUpdateById(req, res) {
  const answersId = get(req, 'params.answersId');
  const userId = get(req, 'userData.userId');

  Answers.updateOne({ _id: answersId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Answers updated'));
      } else {
        res.status(400).json(message.fail('Answers not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ANSWERS_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Answers',
        entityId: answersId,
        user: userId,
        controller: 'answersUpdateById',
      });

      res.status(400).json(message.fail('Answers update error', analyticsId));
    });
}
