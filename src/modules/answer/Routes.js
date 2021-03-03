import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import answerCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import answerGetById from './controllers/getById';
import answerSearch from './controllers/search';
import answerUpdateById from './controllers/updateById';
import answerDeleteById from './controllers/deleteById';
import answerStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/answer/stats
  serviceHeader('answerStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('answer.search.own'), // midlware has rights to do this operation such as answer.search.own
  pauseController,
  answerStats,
);

router.post(
  '/', // POST /localhost:5000/answer/stats
  serviceHeader('answerCreate'),
  userCheckAuth,
  userCheckPerm('answer.create.own'),
  // pauseController,
  answerCreate,
);

router.get(
  '/:answerId',
  serviceHeader('answerGetById'),
  userCheckAuth,
  userCheckPerm('answer.get.own'),
  pauseController,
  answerGetById,
);

router.post(
  '/search',
  serviceHeader('answerSearch'),
  userCheckAuth,
  userCheckPerm('answer.search.own'),
  pauseController,
  answerSearch,
);

router.patch(
  '/:answerId',
  serviceHeader('answerUpdateById'),
  userCheckAuth,
  userCheckPerm('answer.update.own'),
  pauseController,
  answerUpdateById,
);

router.delete(
  '/:answerId',
  serviceHeader('answerDeleteById'),
  userCheckAuth,
  userCheckPerm('answer.delete.own'),
  pauseController,
  answerDeleteById,
);

export default router;
