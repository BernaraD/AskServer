import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import practiceCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import practiceGetById from './controllers/getById';
import practiceSearch from './controllers/search';
import practiceUpdateById from './controllers/updateById';
import practiceDeleteById from './controllers/deleteById';
import practiceStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/practice/stats
  serviceHeader('practiceStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('practice.search.own'), // midlware has rights to do this operation such as practice.search.own
  pauseController,
  practiceStats,
);

router.post(
  '/', // POST /localhost:5000/practice/stats
  serviceHeader('practiceCreate'),
  userCheckAuth,
  userCheckPerm('practice.create.own'),
  // pauseController,
  practiceCreate,
);

router.get(
  '/:practiceId',
  serviceHeader('practiceGetById'),
  userCheckAuth,
  userCheckPerm('practice.get.own'),
  pauseController,
  practiceGetById,
);

router.post(
  '/search',
  serviceHeader('practiceSearch'),
  userCheckAuth,
  userCheckPerm('practice.search.own'),
  pauseController,
  practiceSearch,
);

router.patch(
  '/:practiceId',
  serviceHeader('practiceUpdateById'),
  userCheckAuth,
  userCheckPerm('practice.update.own'),
  pauseController,
  practiceUpdateById,
);

router.delete(
  '/:practiceId',
  serviceHeader('practiceDeleteById'),
  userCheckAuth,
  userCheckPerm('practice.delete.own'),
  pauseController,
  practiceDeleteById,
);

export default router;
