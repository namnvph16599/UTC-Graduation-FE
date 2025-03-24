'use client';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { AppRouter } from '@/src/constants/constant';
import { useMeQuery } from '@/src/graphql/queries/me.generated';
import { UserEntity } from '@/src/graphql/type.interface';

type ContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: UserEntity;
  logout: () => Promise<void>;
  login: (data: UserEntity) => Promise<void> | void;
};

const AuthContext = createContext<ContextProps>({
  isLoggedIn: false,
  isLoading: false,
  login() {
    throw new Error('not-ready');
  },
  logout() {
    throw new Error('not-ready');
  },
});

export const useAuth = () => useContext(AuthContext);

type Props = PropsWithChildren;

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const client = useApolloClient();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<UserEntity>();

  const { loading } = useMeQuery({
    fetchPolicy: 'network-only',
    variables: {},
    onCompleted: (res) => {
      setUser(res.me as UserEntity);
      setIsLoggedIn(true);
    },
  });

  const login = useCallback((data: UserEntity) => {
    setUser(data);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await client.cache.reset();
    localStorage.clear();
    setIsLoggedIn(false);
    router.push(AppRouter.user.home);
  }, [client.cache, router]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading: loading, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
