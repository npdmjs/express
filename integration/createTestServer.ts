import express from 'express';
import { createNpdmRouter } from '../src/createNpdmRouter.js';
import type { InMemoryDynamicLoaderOptions } from '@npdm/core';


export const createTestServer = (opts: InMemoryDynamicLoaderOptions) => {
  const app = express();
  const npdmRouter = createNpdmRouter(opts);
  app.use(npdmRouter);
  app.use('*', (_, res) => {
    res.sendStatus(418);
  });
  return app;
};
