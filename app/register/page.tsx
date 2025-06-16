'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [classRoom, setClassRoom] = useState('301')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, classRoom })
    })

    if (res.ok) {
      alert('회원가입 성공!')
      // redirect 등
      router.push('/login')
    } else {
      alert('회원가입 실패')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일" required className="input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" required className="input" />
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="이름" required className="input" />
      
      <select value={classRoom} onChange={e => setClassRoom(e.target.value)} className="input">
        {[301, 302, 303, 304, 305, 306, 307].map(num => (
          <option key={num} value={num}>{num}호</option>
        ))}
      </select>

      <button type="submit" className="btn">회원가입</button>
    </form>
  )
}
