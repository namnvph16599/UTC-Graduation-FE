'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, memo } from 'react';

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

type Props = {
  children: ReactNode;
};

export const ReactQueryProvider = memo(({ children }: Props) => {
  return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>;
});

ReactQueryProvider.displayName = 'ReactQueryProvider';
