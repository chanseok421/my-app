import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const SECRET = 'your-secret-key';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return NextResponse.json({ message: '로그인 실패' }, { status: 401 });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token });
}
