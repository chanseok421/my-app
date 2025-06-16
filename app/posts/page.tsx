'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const rooms = [301, 302, 303, 304, 305, 306, 307];

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
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">📌 게시판</h1>
      <p>로그인한 사용자만 이 페이지를 볼 수 있어요.</p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        로그아웃
      </button>

      <section>
        <h2 className="text-xl font-semibold mt-8 mb-2">📅 코칭실 예약하기</h2>
        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => router.push(`/reserve/${room}`)}
              className="bg-blue-500 text-white py-4 rounded hover:bg-blue-600"
            >
              {room}호 코칭실
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
