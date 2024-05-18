import { createTestServer } from './createTestServer.js';

const server = createTestServer({});

server.listen(4321, () => {
  console.log('server is started');
});
