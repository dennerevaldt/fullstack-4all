import { conformToMask } from 'react-text-mask';

export const replaceCharacters = value => value.replace(/[^0-9]+/g, '');

export const tranformCharacters = (value, regex) =>
  conformToMask(value, regex).conformedValue;
