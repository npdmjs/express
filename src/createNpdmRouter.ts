import { Router } from 'express';
import { InMemoryDynamicLoader, InMemoryDynamicLoaderOptions, RestrictedPackageError } from '@npdm/core';

type WithWildcardParam<T> = T & {
  0: string;
};

/**
 * Creates an Express router for handling requests for assets from NPM modules, dynamically loaded from the artifactory.
 * @param {InMemoryDynamicLoaderOptions} [options={}] - Options for configuring the in-memory dynamic loader.
 * @returns {Router} An Express router instance.
 */
export const createNpdmRouter = (options: InMemoryDynamicLoaderOptions = {}): Router => {
  const loader = new InMemoryDynamicLoader(options);

  const router = Router();

  router.get('/:packageName/:version/*', async (request, response) => {
    const packageName = request.params.packageName;
    const version = request.params.version;
    const assetPath = (request.params as WithWildcardParam<typeof request.params>)[0];

    let asset: Buffer | null;

    try {
      asset = await loader.getAsset(packageName, version, assetPath);
    } catch (e) {
      if (e instanceof RestrictedPackageError) {
        return response.sendStatus(400);
      }
      console.error(e);
      return response.sendStatus(500);
    }

    if (!asset) {
      return response.sendStatus(404);
    }

    response.send(asset);
  });

  return router;
};
