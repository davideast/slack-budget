import * as express from 'express';
import * as util from 'util';
import 'express-validator';
import { SlackPost } from '../interfaces';

  /*
    token: string;
    team_id: string;
    team_domain: string;
    channel_id: string;
    channel_name: string;
    user_id: string;
    user_name: string;
    command: string;
    text: string;
    response_url: string
  */
/** Inspects post body from the Slack Slash Command API for proper params
 */
export interface CheckedResponse {
   status: number;
   body: string;
}

export function checkPostParams(req: express.Request, slackPost: SlackPost, SLACK_TOKEN: string): CheckedResponse {
  let errors = null;
  const notAuthorizedMessage = 'Not authorized';
  req.checkBody('token', notAuthorizedMessage).notEmpty().equals(SLACK_TOKEN);
  req.checkBody('team_id', notAuthorizedMessage).notEmpty();
  req.checkBody('user_name', notAuthorizedMessage).notEmpty();

  errors = req.validationErrors();
  if (errors) {
    return {
      status: 403,
      body: 'There have been validation errors: ' + util.inspect(errors)
    }
  }
}