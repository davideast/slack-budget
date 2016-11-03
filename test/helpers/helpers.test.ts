import { checkPostParams, createYearMonthId, getPushId } from '../../helpers';
import { firebaseApp } from '../../firebase-app';
import { SlackPost } from '../../interfaces';
import 'jasmine';

const SLACK_TOKEN = process.env.SLACK_TOKEN;

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

      it('should reject with the proper token but no proper post values', () => {
         const badPost = { token: 'my-token' } as SlackPost;
         const checkedResponse = checkPostParams(badPost, 'my-token');
         expect(checkedResponse.status).toEqual(403);
      });

      it('should reject a post a correct token, but with improper values', () => {
         const badPost = { 
            token: 'bad-token', 
            team_id: '1', 
            team_domain: 'domain', 
            user_name: 'alice', 
            user_id: '1',
            channel_id: '2', 
            channel_name: 'a', 
            command: '/spent',
            text: '/spent add *category'
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
            user_id: '1',
            channel_id: '2', 
            channel_name: 'a', 
            command: '/spent',
            text: '/spent add *category'
         } as SlackPost;
         const checkedResponse = checkPostParams(goodPost, 'my-token');
         expect(checkedResponse.status).toEqual(200);
      });     

   });

   describe('createYearMonthId', () => {
      it('should exist', () => {
         expect(createYearMonthId).toBeDefined();
      });

      it('should create an year then month formatted Id for a given date', () => {
         const aprilDate = new Date(2016, 3, 3, 3, 3, 3, 3);
         const decemberDate = new Date(2016, 11, 2, 11, 11, 11, 11);
         const novemberId = createYearMonthId(decemberDate);
         const marchId = createYearMonthId(aprilDate);
         expect(novemberId).toEqual('2016_12');
         expect(marchId).toEqual('2016_4');
      });

      it('should create an year then month formatted Id for the current date', () => {
         const nowDate = new Date();
         const nowYear = nowDate.getFullYear();
         const nowMonth = nowDate.getMonth() + 1;
         const nowId = createYearMonthId();
         expect(nowId).toEqual(`${nowYear}_${nowMonth}`);
      });

   });

   describe('getPushId', () => {
      
      it('should exist', () => {
         expect(getPushId).toBeDefined();
      });

      it('should create a push id with the default Firebase App', () => {
         const pushId = getPushId();
         expect(pushId).toBeDefined();
      });

      it('should create a push id with the a Mock Firebase App', () => {
         const mockPushId = 'mock-id';
         const mockApp = {
           database() {
             return {
               ref() {
                 return {
                   push() {
                     return {
                       key: mockPushId
                     }
                   }
                 }
               }
             }
           }
         } as firebase.app.App;
         const pushId = getPushId(mockApp);
         expect(pushId).toEqual(mockPushId);
      });      

   });

});
