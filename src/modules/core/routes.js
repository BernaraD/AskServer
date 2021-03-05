import fakeRouter from '../_fake/Routes';

import analyticsRouter from '../analytics/Routes';
import userRouter from '../user/userRoutes';
import infoRouter from '../info/infoRoutes';
import serviceRouter from '../service/serviceRoutes';
import baseRouter from '../_base/Routes';
import questionRouter from '../question/Routes';
import answerRouter from '../answer/Routes';
import practiceRouter from '../practice/Routes';

import listRouter from '../lists/Routes';

export default function routes(app) {
  app.use('/base', baseRouter);
  app.use('/user', userRouter);
  app.use('/fake', fakeRouter);
  app.use('/analytics', analyticsRouter);

  app.use('/info', infoRouter);
  app.use('/service', serviceRouter);

  app.use('/list', listRouter);
  app.use('/question', questionRouter);
  app.use('/answer', answerRouter);
  app.use('/practice', practiceRouter);
}
