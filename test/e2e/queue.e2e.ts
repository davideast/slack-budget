import * as request from 'request-promise';
import * as express from 'express';
import * as firebase from 'firebase';
import { SlackPost } from '../../interfaces';
import 'jasmine';

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const PORT = process.env.PORT;
const SERVICE_ACCOUNT_PATH = process.env.SERVICE_ACCOUNT_PATH;

function destroyEnvironment(firebaseApp: firebase.app.App) {
  const teamPaths = ['history', 'budgets', 'amounts', 'categories', 'specifics'];
  const userPaths = ['userHistory'];
  const users = ['1'];
  const teams = ['11'];
  const fanoutObject = {};
  teamPaths.forEach(path => {
    teams.forEach(team => fanoutObject[`${path}/${team}`] = null);
  });
  userPaths.forEach(path => {
    users.forEach(uid => fanoutObject[`${path}/${uid}`] = null);
  });
  return firebase.database().ref().update(fanoutObject);
}

describe('POST /queue', () => {
  
  beforeEach(_ => {
    // TODO: Tear down environment
    // TODO: Build new environment
  });

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
        text: '+specialty $21.03 at Market Hall'
      } as SlackPost;
      makeQueueRequest(goodPost).then((res: express.Response) => {
        expect(res.status).toEqual(200);
        console.log(res);
        done();
      });
    });

  });

});

function makeQueueRequests(...requests: any[]) {
  const promises = requests.map(makeQueueRequest);
  return Promise.all(promises);
}

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