'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PostsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📌 게시판</h1>
      <p>로그인한 사용자만 이 페이지를 볼 수 있어요.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        로그아웃
      </button>
      {/* 이후 게시글 목록이나 작성 폼 추가 */}
    </main>
  );
}
