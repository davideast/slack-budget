import * as util from 'util';
import * as firebase from 'firebase';
import * as express from 'express';
import * as bodyParser from 'body-parser';
const expressValidator = require('express-validator');
import { SlackPost } from './interfaces';
import { checkPostParams } from './helpers';

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const app = express();
app.use(bodyParser.json());
app.use(expressValidator([{}]));

/**
 * 1. Check post body params
 * 2. 
 */
app.post('/queue', (req, res) => {
  const slackPost = req.body as SlackPost;

  const checkedResponse = checkPostParams(req, slackPost, SLACK_TOKEN);

  if (checkedResponse) {
    res.send(checkedResponse);
    return;
  }
 
});

