import { Matcher } from './';

const dateMatcher: Matcher = {
   character: 'on',
   property: 'timestamp',
   parse: function (text: string) {
      // text.split('on')[1].trim().split(' ');
      let pieces = text.split(this.character);
      if (pieces[1]) {
         let rightSide = pieces[1].trim().split(' ');
         if (rightSide[0] && rightSide[1]) {
            const monthDay = rightSide[0];
            const time = rightSide[1];
            // TODO: create date from this
            return new Date().getTime();
         } else {
            //return new Error('Invalid date');
         }
      } else {
         // on isn't specified use current time
         return new Date().getTime();
      }
   }
};

export { dateMatcher };