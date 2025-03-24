import { useMeQuery } from '@/src/graphql/queries/me.generated';

export const useCurrentUser = () => {
  const me = useMeQuery();

  return {
    isLoading: me.loading,
    data: me,
    isLogged: !!me.data,
  };
};
