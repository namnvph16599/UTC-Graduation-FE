import { checkValidImage } from './test-image-address.util';
import { NewsEntity } from '../graphql/type.interface';

export function chunkNews(news: NewsEntity[], chunkSize = 5): NewsEntity[][] {
  const result: NewsEntity[][] = [];
  for (let i = 0; i < news.length; i += chunkSize) {
    result.push(news.slice(i, i + chunkSize));
  }
  return result;
}

export function getImageUrlOfNews(imageUrl: string) {
  const isValid = checkValidImage(imageUrl);
  if (!isValid) return '';
  return imageUrl;
}
