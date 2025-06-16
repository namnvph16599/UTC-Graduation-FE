'use client';
import Cookies from 'js-cookie';
import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { useMeQuery } from '@/src/graphql/queries/me.generated';
import { UserEntity } from '@/src/graphql/type.interface';
import { LoginByPhoneMutationResponse } from '../graphql/mutations/loginByPhone.generated';
import { LocalStorageKeyEnum, removeItemLocalstorage, setItemLocalstorage } from '../utils/localstorate.util';

type ContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: UserEntity;
  logout: () => Promise<void>;
  login: (data: LoginByPhoneMutationResponse) => Promise<void> | void;
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
  // const router = useRouter();

  // const client = useApolloClient();

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

  const login = useCallback((data: LoginByPhoneMutationResponse) => {
    setItemLocalstorage(LocalStorageKeyEnum.AccessToken, data.loginByPhone.accessToken);
    setItemLocalstorage(LocalStorageKeyEnum.RefreshToken, data.loginByPhone.refreshToken);

    Cookies.set(LocalStorageKeyEnum.AccessToken, data.loginByPhone.accessToken, {
      expires: 30, // days until it expires
      path: '/', // cookie is available across the entire site
      secure: process.env.NODE_ENV === 'production', // only set secure flag in production
      sameSite: 'Lax',
    });

    Cookies.set(LocalStorageKeyEnum.RefreshToken, data.loginByPhone.accessToken, {
      expires: 30, // days until it expires
      path: '/', // cookie is available across the entire site
      secure: process.env.NODE_ENV === 'production', // only set secure flag in production
      sameSite: 'Lax',
    });

    window.location.replace('/');
  }, []);

  const logout = useCallback(async () => {
    removeItemLocalstorage(LocalStorageKeyEnum.AccessToken);
    removeItemLocalstorage(LocalStorageKeyEnum.RefreshToken);

    Cookies.remove(LocalStorageKeyEnum.AccessToken);
    Cookies.remove(LocalStorageKeyEnum.RefreshToken);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading: loading, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
