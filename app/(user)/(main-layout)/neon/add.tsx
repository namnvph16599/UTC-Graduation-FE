'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';

export default function PlayingWithNeon() {
  const [isPending, startTransition] = useTransition();

  async function create() {
    const res = await fetch('http://localhost:3000/api/playing_with_neon', { cache: 'no-store', method: 'post' });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data;
  }

  return (
    <div>
      <h1>Insert into Playing_with_neon</h1>
      <Button disabled={isPending} onClick={() => startTransition(() => create())}>
        {isPending ? 'Adding...' : 'Add Random Entry'}
      </Button>
    </div>
  );
}
