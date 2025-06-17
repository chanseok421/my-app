import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken' 
import { JWT_SECRET } from '@/lib/jwt'

const SECRET = JWT_SECRET
/**
 * GET /api/reservation?room=301&date=2024-06-17
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const room = parseInt(searchParams.get('room') || '')
  const dateStr = searchParams.get('date')

  if (!room || !dateStr) {
    return NextResponse.json({ error: 'room과 date 쿼리가 필요합니다.' }, { status: 400 })
  }  

  const date = new Date(dateStr)
  const reservations = await prisma.reservation.findMany({
    where: {
      room,
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(24, 0, 0, 0))
      }
    },
    include: {
      user: { select: { name: true } }
    }
  })

  return NextResponse.json(reservations)
}

/**
 * POST /api/reservation
 * body: { room: number, hour: number, date: string (YYYY-MM-DD) }
 */
export async function POST(req: Request) {
  const auth = req.headers.get('authorization')
  const token = auth?.split(' ')[1]
  if (!token) {
    return NextResponse.json({ error: '토큰이 필요합니다.' }, { status: 401 })
  }

  let decoded
  try {
    decoded = jwt.verify(token, SECRET) as { id: number }
  } catch {
    return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 })
  }

  const { room, hour, date } = await req.json()

  if (!room || hour === undefined || !date) {
    return NextResponse.json({ error: 'room, hour, date 필드가 필요합니다.' }, { status: 400 })
  }

  const dateObj = new Date(date)
  dateObj.setHours(0, 0, 0, 0) // normalize to midnight

  // 중복 예약 체크
  const existing = await prisma.reservation.findUnique({
    where: {
      date_hour_room: {
        date: dateObj,
        hour,
        room
      }
    }
  })

  if (existing) {
    return NextResponse.json({ error: '이미 예약된 시간입니다.' }, { status: 400 })
  }

  await prisma.reservation.create({
    data: {
      date: dateObj,
      hour,
      room,
      userId: decoded.id
    }
  })

  return NextResponse.json({ message: '예약 성공' }, { status: 201 })
}
