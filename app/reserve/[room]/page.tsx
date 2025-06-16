'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

type JWT = {
  id: number
  email: string
  classRoom: number
}

type Reservation = {
    id: number
    date: string
    hour: number
    room: number
    user: {
      id: number
      name: string
      classRoom: number
    }
  }

export default function ReservePage({ params }: { params: { room: string } }) {
  const roomNumber = parseInt(params.room)
  const [reservedHours, setReservedHours] = useState<number[]>([])
  //const [user, setUser] = useState<JWT | null>(null)
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('로그인이 필요합니다')
      router.push('/login')
      return
    }

    const decoded = jwtDecode<JWT>(token) 
    //setUser(decoded)

    // 반이 일치하지 않으면 접근 차단
    if (decoded.classRoom !== roomNumber) {
      alert(`${roomNumber}호는 당신의 반이 아닙니다.`)
      router.push('/posts')
      return
    }

    // 예약 정보 불러오기
    fetch(`/api/reservation?room=${roomNumber}&date=${today}`)
    .then(res => res.json())
    .then((data: Reservation[]) => setReservedHours(data.map(r => r.hour)))
}, [roomNumber, router])

const handleReserve = async (hour: number) => {
  const token = localStorage.getItem('token')
  const res = await fetch('/api/reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ room: roomNumber, hour, date: today }),
  })

    if (res.ok) {
      alert('예약 성공')
      setReservedHours(prev => [...prev, hour])
    } else {
      const err = await res.json()
      alert(err.error || '예약 실패')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{roomNumber}호 코칭실 예약</h1>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {Array.from({ length: 24 }, (_, i) => (
          <button
            key={i}
            onClick={() => !reservedHours.includes(i) && handleReserve(i)}
            disabled={reservedHours.includes(i)}
            className={`p-2 rounded ${
              reservedHours.includes(i)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {i}:00
          </button>
        ))}
      </div>
    </div>
  )
}
