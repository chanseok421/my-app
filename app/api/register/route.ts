import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: '이미 존재하는 이메일입니다.' }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: { email, password },
  });

  return NextResponse.json({ message: '회원가입 성공', user });
}
