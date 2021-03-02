import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import answersCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import answersGetById from './controllers/getById';
import answersSearch from './controllers/search';
import answersUpdateById from './controllers/updateById';
import answersDeleteById from './controllers/deleteById';
import answersStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/answers/stats
  serviceHeader('answersStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('answers.search.own'), // midlware has rights to do this operation such as answers.search.own
  pauseController,
  answersStats,
);

router.post(
  '/', // POST /localhost:5000/answers/stats
  serviceHeader('answersCreate'),
  userCheckAuth,
  userCheckPerm('answers.create.own'),
  // pauseController,
  answersCreate,
);

router.get(
  '/:answersId',
  serviceHeader('answersGetById'),
  userCheckAuth,
  userCheckPerm('answers.get.own'),
  pauseController,
  answersGetById,
);

router.post(
  '/search',
  serviceHeader('answersSearch'),
  userCheckAuth,
  userCheckPerm('answers.search.own'),
  pauseController,
  answersSearch,
);

router.patch(
  '/:answersId',
  serviceHeader('answersUpdateById'),
  userCheckAuth,
  userCheckPerm('answers.update.own'),
  pauseController,
  answersUpdateById,
);

router.delete(
  '/:answersId',
  serviceHeader('answersDeleteById'),
  userCheckAuth,
  userCheckPerm('answers.delete.own'),
  pauseController,
  answersDeleteById,
);

export default router;
