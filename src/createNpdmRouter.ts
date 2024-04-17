import { Router } from 'express';
import { InMemoryDynamicLoader } from '@npdm/core';

export type NpdmMiddlewareOptions = {
  baseUrl?: string;
};

type WithWildcardParam<T> = T & {
  0: string;
}

export const createNpdmRouter = (): Router => {
  const loader = new InMemoryDynamicLoader();

  const router = Router();

  router.get('/:packageName/:version/*', async (request, response) => {
    const packageName = request.params.packageName;
    const version = request.params.version;
    const assetPath = (request.params as WithWildcardParam<typeof request.params>)[0];

    const asset = await loader.getAsset(packageName, version, assetPath);

    response.send(asset);
  });

  return router;
};
