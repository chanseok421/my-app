'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
            <div key={room} className="flex flex-col items-center">
              <Image
                src={`/rooms/${room}.jpg`}
                alt={`${room}호 코칭실`}
                width={150}
                height={150}
                className="cursor-pointer rounded"
                onClick={() => router.push(`/reserve/${room}`)}
              />
              <span className="mt-2 text-sm">{room}호 코칭실</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}