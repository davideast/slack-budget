import { Matcher } from './';
import { isNumber, toNumber } from '../../../helpers';

const costMatcher: Matcher = {
  character: '$',
  property: 'cost',
  parse: function (text: string) {
    let pieces = text.split(this.character);
    if (pieces[1]) {
      let rightSide = pieces[1].split(' ');
      if (rightSide[0]) {
        const cost = rightSide[0].trim();
        if (isNumber(cost)) {
          return toNumber(cost);
        } else {
          throw new Error('Invalid command format');
        }
      } else {
        throw new Error('Invalid command format');
      }
    } else {
      throw new Error('Invalid command format');
    }
  }
};

export { costMatcher };