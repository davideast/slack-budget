import * as request from 'request-promise';
import * as express from 'express';
import { SlackPost } from '../../interfaces';
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

      it('should authenticate with a valid token and with a valid POST body', (done: any) => {
         const goodPost = { 
            token: SLACK_TOKEN, 
            team_id: '1', 
            team_domain: 'domain', 
            user_name: 'alice', 
            user_id: '1',
            channel_id: '2', 
            channel_name: 'a', 
            command: '/spent',
            text: '/spent add *category'
         } as SlackPost;
         makeQueueRequest(goodPost).then((res: express.Response) => {
            expect(res.status).toEqual(200);
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