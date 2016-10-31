
/*
token=<token>
team_id=<teamid>
team_domain=example
channel_id=<channel_id>
channel_name=test
user_id=<user_id>
user_name=<username>
command=/spent
text=<text>
response_url=https://hooks.slack.com/commands/1234/5678
*/

/**
 * Interface for objects that represent a POST from the Slack Slash Command API.
 * https://api.slack.com/slash-commands
 */
export interface SlackPost {
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
}