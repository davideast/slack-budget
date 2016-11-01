import { checkPostParams } from '../../helpers';
import { SlackPost } from '../../interfaces';

import 'jasmine';

describe('helpers', () => {

   describe('check-post', () => {
      it('should exist', () => {
         expect(checkPostParams).toBeDefined();
      });

      it('should reject a post with an improper token', () => {
         const badPost = { token: 'badToken' } as SlackPost;
         const checkedResponse = checkPostParams(badPost, 'my-token');
         expect(checkedResponse.status).toEqual(403);
      });

      it('should reject a post with no token', () => {
         const badPost = { token: null } as SlackPost;
         const checkedResponse = checkPostParams(badPost, 'my-token');
         expect(checkedResponse.status).toEqual(403);
      });

      it('should reject a post a correct token, but with improper values', () => {
         const badPost = { 
            token: 'my-token', 
            team_id: '1', 
            team_domain: 'domain', 
            user_name: undefined, 
            channel_id: '2', 
            channel_name: 'a', 
            command: '/spent' 
         } as SlackPost;
         const checkedResponse = checkPostParams(badPost, 'my-token');
         expect(checkedResponse.status).toEqual(403);
      });

      it('should accept a post with the proper values', () => {
         const goodPost = { 
            token: 'my-token', 
            team_id: '1', 
            team_domain: 'domain', 
            user_name: 'alice', 
            channel_id: '2', 
            channel_name: 'a', 
            command: '/spent' 
         } as SlackPost;
         const checkedResponse = checkPostParams(goodPost, 'my-token');
         expect(checkedResponse.status).toEqual(200);
      });     

   });

});
