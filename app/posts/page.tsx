// app/posts/page.tsx

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PostsPage() {
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie.includes('token=');
    if (!hasToken) {
      router.push('/login');
    }
  }, []);

  return (
    <main className="p-6">
      <h1>📋 게시판 목록</h1>
    </main>
  );
}
