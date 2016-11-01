import * as request from 'request-promise';
import * as express from 'express';
import 'jasmine';

describe('e2e', () => {

   it('should not authenticate with invalid token', (done: any) => {
      let options = { 
         method: 'POST',
         url: 'http://localhost:3000/queue',
         headers: { 
            'cache-control': 'no-cache',
            'content-type': 'application/json' 
         },
         body: { token: 'aToken' },
         json: true 
      };

      request(options).then((res: express.Response) => {
         expect(res.status).toEqual(403);
         done();
      });
   });

});