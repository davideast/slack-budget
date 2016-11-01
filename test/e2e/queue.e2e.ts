import * as request from 'request-promise';
import * as express from 'express';
import 'jasmine';

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const PORT = process.env.PORT;

describe('POST /queue', () => {

   describe('Token Authentication', () => {
      
      it('should not authenticate with invalid token', (done: any) => {
         makeQueueRequest({ token: 'aToken' }).then((res: express.Response) => {
            expect(res.status).toEqual(403);
            done();
         });
      });

      it('should not authenticate with a valid token, but an invalid POST body', (done: any) => {
         makeQueueRequest({ token: SLACK_TOKEN }).then((res: express.Response) => {
            expect(res.status).toEqual(403);
            done();
         });
      });

   });

});

/**
 * Helper function for creating POST requests to /queue
 */
function makeQueueRequest(body) {
   const options = {
      method: 'POST',
      url: `http://localhost:${PORT}/queue`,
      headers: {
         'cache-control': 'no-cache',
         'content-type': 'application/json'
      },
      body: body,
      json: true
   };
   return request(options);
}