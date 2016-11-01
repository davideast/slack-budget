import { Matcher } from './';

const locationMatcher: Matcher = {
   character: 'at',
   property: 'location',
   parse: function (text: string) {
      let pieces = text.split(this.character);
      if (pieces[1]) {
         let locationSplit = pieces[1].split('on');
         if (locationSplit[0]) {
            return locationSplit[0].trim();
         } else {
            throw new Error('Invalid command format');
         }
      } else {
         throw new Error('Invalid command format');
      }
   }
};

export { locationMatcher };