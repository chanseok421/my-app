import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = 'your-secret-key'; // 실제 서비스에서는 .env에 넣을 것!

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 간단한 유저 확인 (나중엔 DB 사용 가능)
  if (email === 'test@example.com' && password === '1234') {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  );
}
