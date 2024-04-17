import express from 'express';
import { createNpdmRouter } from '../createNpdmRouter';

const app = express();

const npdmRouter = createNpdmRouter();

app.use(npdmRouter);

const port = 4321;

app.listen(port, () => {
  console.log(`Application is listening on ${port}`);
});
