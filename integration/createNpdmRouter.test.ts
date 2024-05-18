import request from 'supertest';
import { createTestServer } from './createTestServer.js';

describe('createNpdmRouter', () => {
  it('should load an asset from the real artifactory', async () => {
    const server = createTestServer({});
    await request(server)
      .get('/lodash/4.17.21/_apply.js')
      .expect(200)
      .then(({ body }) => {
        expect(String(body)).toContain('function apply(func, thisArg, args)');
      });
  });

  it('should return 400 for excluded libraries', async () => {
    const server = createTestServer({
      exclude: [{ name: 'lodash' }],
    });
    await request(server)
      .get('/lodash/4.17.21/_apply.js')
      .expect(400);
  });
});
