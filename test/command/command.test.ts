import { SlackPost, Purchase } from '../../interfaces';
import { createYearMonthId } from '../../helpers';
import { PurchaseRule, parsePurchase, parseCommand, allRules, matchers, categoryMatcher, costMatcher, locationMatcher } from '../../command';
import 'jasmine';

describe('commands', () => {

   describe('Command Rules', () => {

    describe('PurchaseRule', () => {

        it('should parse a slack command for a purchase', () => {

          const purchase = parsePurchase({
              text: '+specialty $21.03 at Market Hall'
          } as SlackPost, matchers);
          
          expect(purchase.category).toEqual('specialty');
          expect(purchase.cost).toEqual('21.03');
          expect(purchase.location).toEqual('Market Hall');

        });

        it('should create an instruction', () => {
          const purchaseRule = PurchaseRule.create();
          const instruction = purchaseRule.buildInstruction({
              text: '+specialty $21.03 at Market Hall',
              user_id: '1111'
          } as SlackPost);

          expect(instruction).toBeDefined();
        });

        it('should build an instruction', (done: any) => {
          const purchaseRule = PurchaseRule.create();
          const category = 'specialty';
          const uid = '1111';
          const cost = '21.03';
          const location = 'Market Hall';
          const purchase = { category, uid, cost, location };
          const yearMonthId = createYearMonthId();
          const promise = purchaseRule.buildInstruction({
              text: '+specialty $21.03 at Market Hall',
              user_id: '1111'
          } as SlackPost);
          
          promise.then(instruction => {
            expect(instruction).toBeDefined();
            const purchaseId = instruction.valueRef.key;
            // TODO: Custom Firebase Ref matcher
            expect(instruction.updateRef).toBeDefined();
            expect(instruction.valueRef).toBeDefined();

            expect(instruction.updateValue[`budgets/${uid}/${yearMonthId}/${purchaseId}`]).toBeDefined();
            expect(instruction.updateValue[`specifics/${uid}/${category}/${yearMonthId}/${purchaseId}`]).toBeDefined();
            expect(instruction.updateValue[`categories/${uid}/${category}`]).toBeDefined();    
            expect(instruction.updateValue[`history/${uid}/${purchaseId}`]).toBeDefined();         
            done();
          });

        });

    }); 
    
   });

   describe('Command Matchers', () => {

    describe('category matcher', () => {

      it('should match a +', () => {
        expect(categoryMatcher.character).toEqual('+');
      });

      it('should have the property of category', () => {
        expect(categoryMatcher.property).toEqual('category');
      });

      it('should parse a +category and return the name', () => {
        const categoryName = '+myCategory'
        expect(categoryMatcher.parse(categoryName)).toEqual('myCategory');
      });     

      it('should parse an entire command and return the category name', () => {
        const categoryName = '+goodfood $21.03 at Market Hall'
        expect(categoryMatcher.parse(categoryName)).toEqual('goodfood');
      }); 

    });   

    describe('cost matcher', () => {

      it('should match a $', () => {
        expect(costMatcher.character).toEqual('$');
      });

      it('should have the property of cost', () => {
        expect(costMatcher.property).toEqual('cost');
      });

      it('should parse a $ cost and return the value', () => {
        const costValue = '$99.21'
        expect(costMatcher.parse(costValue)).toEqual('99.21');
      });     

      it('should parse an entire command and return the cost value', () => {
        const costValue = '+goodfood $38.51 at Market Hall'
        expect(costMatcher.parse(costValue)).toEqual('38.51');
      }); 

    });    
    
    describe('location matcher', () => {

      it('should match a at', () => {
        expect(locationMatcher.character).toEqual('at');
      });

      it('should have the property of location', () => {
        expect(locationMatcher.property).toEqual('location');
      });

      it('should parse a location and return the name', () => {
        const locationName = 'at My Place'
        expect(locationMatcher.parse(locationName)).toEqual('My Place');
      });     

      it('should parse an entire command and return the location name', () => {
        const locationName = '+goodfood $21.03 at Market Hall'
        expect(locationMatcher.parse(locationName)).toEqual('Market Hall');
      }); 

     it('should parse an entire command with a date and return the location name', () => {
        const locationName = '+goodfood $21.03 at Market Hall on 11/03 at 7:14pm'
        expect(locationMatcher.parse(locationName)).toEqual('Market Hall');
      });       

    });          

   });   
   
});

/*
```slack
/spent +specialty $21.03 at Market Hall
/spent +eatingout $34.16 at Long Bridge Pizza
/spent +specialty $21.03 at Market Hall on 11/03 6:03pm
/spent +skateboarding $25.00 at Shredquarters
/spent add +football 
/spent +football $200 on NFL Sunday Ticket
/spent *current 150.00 
/spent How much?
/spent How much +football?
/spent How much is left?
/spent history
 */