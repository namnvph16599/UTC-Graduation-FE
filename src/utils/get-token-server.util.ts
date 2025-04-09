import { cookies } from 'next/headers';

export const getTokenServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  console.log('token', token);

  return token ?? '';
};
