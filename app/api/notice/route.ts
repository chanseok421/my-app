import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/lib/jwt'

const SECRET = JWT_SECRET

/**
 * GET /api/notice?room=301
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const room = parseInt(searchParams.get('room') || '')

  if (!room) {
    return NextResponse.json({ error: 'room 쿼리가 필요합니다.' }, { status: 400 })
  }

  const notices = await prisma.notice.findMany({
    where: { room },
    include: { user: { select: { name: true } } },
    orderBy: { id: 'desc' },
  })

  return NextResponse.json(notices)
}

/**
 * POST /api/notice
 * body: { room: number, message: string }
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

  const { room, message } = await req.json()

  if (!room || !message) {
    return NextResponse.json({ error: 'room과 message가 필요합니다.' }, { status: 400 })
  }

  const notice = await prisma.notice.create({
    data: {
      room,
      message,
      userId: decoded.id,
    },
    include: { user: { select: { name: true } } },
  })

  return NextResponse.json(notice, { status: 201 })
}