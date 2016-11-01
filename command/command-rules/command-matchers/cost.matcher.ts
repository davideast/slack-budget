import { Matcher } from './';

const costMatcher: Matcher = {
   character: '$',
   property: 'cost',
   parse: function (text: string) {
      let pieces = text.split(this.character);
      if (pieces[1]) {
         let rightSide = pieces[1].split(' ');
         if (rightSide[0]) {
            return rightSide[0].trim();
         } else {
            throw new Error('Invalid command format');
         }
      } else {
         throw new Error('Invalid command format');
      }
   }
};

export { costMatcher };