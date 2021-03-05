import { get } from 'lodash';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { lawPracticeListName } from '../lawPracticeList';

const getLawPracticeList = (req, res) => {
  const userId = get(req, 'userData.userId', null);
  const lawPracticeList = [...lawPracticeListName];

  analytics('USER_GET_ALL_PRACTICE_SUCCESS', {
    practices: lawPracticeList,
    user: userId,
  });

  res.status(200).json(message.success('Get all countries. Success', lawPracticeList));
};

export default getLawPracticeList;
