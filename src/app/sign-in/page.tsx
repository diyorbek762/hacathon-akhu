'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/discover')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10 no-underline">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--teal)] to-[var(--accent-purple)] rounded-lg flex items-center justify-center text-xl">📚</div>
          <span className="font-syne font-extrabold text-2xl text-[var(--text)]">
            Study<span className="text-[var(--teal)]">Match</span>
          </span>
        </Link>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-8">
          <h1 className="font-syne font-bold text-2xl mb-2">Welcome back</h1>
          <p className="text-[var(--text-dim)] text-sm mb-8">Sign in to find your study people.</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-medium text-[var(--text-dim)] mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] text-sm outline-none transition-colors focus:border-[var(--teal)]"
                placeholder="you@university.edu"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--text-dim)] mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--text)] text-sm outline-none transition-colors focus:border-[var(--teal)]"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] font-semibold text-sm transition-all hover:bg-[#00f5d0] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-dim)] mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-[var(--teal)] no-underline hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
