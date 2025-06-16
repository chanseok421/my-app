// app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // 비로그인 시 로그인 페이지로
    }
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Welcome to your dashboard!</h1>
    </main>
  );
}
