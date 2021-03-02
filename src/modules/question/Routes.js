import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import questionCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import questionGetById from './controllers/getById';
import questionSearch from './controllers/search';
import questionUpdateById from './controllers/updateById';
import questionDeleteById from './controllers/deleteById';
import questionStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/question/stats
  serviceHeader('questionStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('question.search.own'), // midlware has rights to do this operation such as question.search.own
  pauseController,
  questionStats,
);

router.post(
  '/', // POST /localhost:5000/question/stats
  serviceHeader('questionCreate'),
  userCheckAuth,
  userCheckPerm('question.create.own'),
  // pauseController,
  questionCreate,
);

router.get(
  '/:questionId',
  serviceHeader('questionGetById'),
  userCheckAuth,
  userCheckPerm('question.get.own'),
  pauseController,
  questionGetById,
);

router.post(
  '/search',
  serviceHeader('questionSearch'),
  userCheckAuth,
  userCheckPerm('question.search.own'),
  pauseController,
  questionSearch,
);

router.patch(
  '/:questionId',
  serviceHeader('questionUpdateById'),
  userCheckAuth,
  userCheckPerm('question.update.own'),
  pauseController,
  questionUpdateById,
);

router.delete(
  '/:questionId',
  serviceHeader('questionDeleteById'),
  userCheckAuth,
  userCheckPerm('question.delete.own'),
  pauseController,
  questionDeleteById,
);

export default router;
