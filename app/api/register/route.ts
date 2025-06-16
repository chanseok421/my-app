import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

type RegisterRequest = {
  email: string
  password: string
  name: string
  classRoom: number
}

export async function POST(req: Request) {
  const { email, password, name, classRoom }: RegisterRequest = await req.json()

  if (![301, 302, 303, 304, 305, 306, 307].includes(Number(classRoom))) {
    return NextResponse.json({ error: '올바른 반이 아닙니다.' }, { status: 400 })
  }

  const hashedPassword = await hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        classRoom: Number(classRoom),
      },
    })
    return NextResponse.json({ message: '회원가입 성공' }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '회원가입 중 오류 발생'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
