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
   body?: string;
}

function isEmpty(value){
  return (value == null || value.length === 0);
}

export function checkPostParams(slackPost: SlackPost, SLACK_TOKEN: string): CheckedResponse {
  const errors = Object.keys(slackPost).map(key => {
    let value = slackPost[key];
    if(isEmpty(value)) {
      return `Invalid Slack ${key}`;
    }
  }).filter(error => error != undefined);
  if (slackPost.token !== SLACK_TOKEN) {
    errors.push('Not authorized');
  }

  if (errors.length > 0) {
    return {
      status: 403,
      body: errors.join(', ')
    };
  }
  
  return { 
    status: 200 
  };  
}