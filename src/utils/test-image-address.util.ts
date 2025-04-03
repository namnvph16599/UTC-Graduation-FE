import { REGEX } from '../constants/regex';

export function checkValidImage(url: string) {
  const regex = REGEX.imageAddress;
  return regex.test(url);
}
