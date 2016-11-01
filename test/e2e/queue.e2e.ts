import * as request from 'request-promise';
import * as express from 'express';
import 'jasmine';

const SLACK_TOKEN = process.env.SLACK_TOKEN;

describe('POST /queue', () => {

   describe('Token Authentication', () => {
      
      it('should not authenticate with invalid token', (done: any) => {
         makeRequest({ token: 'aToken' }).then((res: express.Response) => {
            expect(res.status).toEqual(403);
            done();
         });
      });

      it('should authenticate with a valid token', (done: any) => {
         makeRequest({ token: SLACK_TOKEN }).then((res: express.Response) => {
            expect(res.status).toEqual(200);
            done();
         });
      });

   });

});

function makeRequest(body) {
   let options = {
      method: 'POST',
      url: 'http://localhost:3000/queue',
      headers: {
         'cache-control': 'no-cache',
         'content-type': 'application/json'
      },
      body: body,
      json: true
   };
   return request(options);
}