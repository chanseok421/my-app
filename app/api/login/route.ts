import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = 'your-secret-key';

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };


  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compare(password, user.password))) {
    return NextResponse.json({ message: '로그인 실패' }, { status: 401 });
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    classRoom: user.classRoom,
  };

  const token = jwt.sign(tokenPayload, SECRET, { expiresIn: '1h' });
  return NextResponse.json({ token });
}
