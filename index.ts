import * as util from 'util';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SlackPost } from './interfaces';
import { checkPostParams } from './helpers';
import { firebaseApp } from './firebase-app';
import { user } from './user';
import { command } from './command';
// TODO: Flatten import path
import { CommandInstruction } from './command/command-rules/command-instructions';

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SERVICE_ACCOUNT_PATH = process.env.SERVICE_ACCOUNT_PATH;
const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());

/**
 * 1. Check post body params
 * 2. Write user entry
 */
app.post('/queue', queue);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

export function queue(req, res) {
  const slackPost = req.body as SlackPost;
  const checkedResponse = checkPostParams(slackPost, SLACK_TOKEN);

  // If status returns 403, return error to user
  if (checkedResponse.status === 403) {
    res.json(checkedResponse);
    return;
  }

  // Write user entry
  user(slackPost.user_id).update(slackPost)
    .then(_ => {
      return command(slackPost)
    })
    .then((instruction: CommandInstruction) => {
      return instruction.execute();
    })
    .then((instruction: CommandInstruction) => {
      return instruction.response();
    })
    .then(data => {
      console.log(data);
      return res.json(data);
    })
    .catch(err => console.log(err.stack));
}
