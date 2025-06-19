// app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/posts')  // 또는 '/reserve/301' 등 기본 라우팅 경로
}
