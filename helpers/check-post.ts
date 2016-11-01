import { SlackPost } from '../interfaces';

export interface CheckedResponse {
   status: number;
   body?: string;
}

function isEmpty(value){
  return (value == null || value.length === 0);
}

/** Inspects post body from the Slack Slash Command API for proper params
 */
export function checkPostParams(slackPost: SlackPost, SLACK_TOKEN: string): CheckedResponse {
  const slackPostKeys = ['token', 'text', 'user_id', 'user_name', 'team_id'];
  const errors = slackPostKeys.map(key => {
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