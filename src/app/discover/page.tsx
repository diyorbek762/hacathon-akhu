'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Student {
  id: string
  full_name: string
  university: string
  department: string
  bio: string
  interests: string[]
}

const chips = ['⭐ High Match', '📚 Same Course', '📍 Near Me', '🆕 New Members', '🔥 Active This Week', '🤝 Mutual Friends']

export default function DiscoverPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set())
  const [searched, setSearched] = useState(false)
  const [loadingProfiles, setLoadingProfiles] = useState(true)

  useEffect(() => {
    import('@/lib/supabase/client').then(({ createClient }) => {
      const supabase = createClient()
      supabase.auth.getSession().then(({ data: { session } }) => {
        supabase.from('profiles').select('id, full_name, university, department, bio, interests').then(({ data }) => {
          if (data) setStudents(data.filter(s => s.id !== session?.user?.id))
          setLoadingProfiles(false)
        })
      })
    })
  }, [])

  const toggleChip = (chip: string) => {
    setActiveChips((prev) => {
      const next = new Set(prev)
      if (next.has(chip)) next.delete(chip)
      else next.add(chip)
      return next
    })
  }

  const filtered = searched && activeChips.size > 0
    ? students.filter(() => true)
    : []

  function buildMatchRing(pct: number) {
    const r = 22; const circ = 2 * Math.PI * r; const offset = circ - (pct / 100) * circ
    const color = pct >= 85 ? '#00D4B4' : pct >= 70 ? '#FFAB40' : '#F06292'
    return (
      <div className="absolute top-4 right-4 w-[52px] h-[52px]">
        <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
          <circle className="fill-none stroke-[var(--surface2)]" strokeWidth="3" cx="26" cy="26" r={r} />
          <circle className="fill-none" stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={`${circ}`} strokeDashoffset={offset} cx="26" cy="26" r={r} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-syne font-extrabold text-[0.7rem]" style={{ color }}>{pct}%</div>
      </div>
    )
  }

  return (
    <div className="page-enter min-h-screen pt-[68px]">
      <div className="hidden lg:block fixed left-0 top-[68px] w-[280px] h-[calc(100vh-68px)] bg-[var(--bg2)] border-r border-[var(--border)] p-7 overflow-y-auto">
        <div className="font-syne font-bold text-[0.7rem] uppercase tracking-[1.5px] text-[var(--text-muted)] mb-4">🔧 Filters</div>
        {[
          { label: '🏛️ Department', options: ['All Departments', 'Computer Science', 'Engineering', 'Business', 'Design'] },
          { label: '📖 Courses', options: ['Any Course', 'CS 101', 'CS 224N', 'MATH 301'] },
        ].map((g) => (
          <div key={g.label} className="mb-7">
            <div className="text-sm font-semibold text-[var(--text)] mb-2.5 flex items-center gap-2">{g.label}</div>
            <select className="w-full px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] text-sm text-[var(--text)] outline-none cursor-pointer focus:border-[var(--teal)]">
              {g.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}

        <div className="mb-7">
          <div className="text-sm font-semibold text-[var(--text)] mb-2.5 flex items-center gap-2"><span>🎯</span> Interests</div>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <button key={chip} onClick={() => toggleChip(chip)}
                className={`px-3 py-1.5 rounded-[var(--radius-pill)] text-xs font-medium border transition-all cursor-pointer ${
                  activeChips.has(chip)
                    ? 'bg-[var(--teal-glow)] border-[var(--teal)] text-[var(--teal)]'
                    : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--teal)]'
                }`}
              >{chip}</button>
            ))}
          </div>
        </div>

        <button onClick={() => setSearched(activeChips.size > 0)}
          className="w-full py-3 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] font-semibold text-sm transition-all hover:bg-[#00f5d0] disabled:opacity-50"
          disabled={activeChips.size === 0}
        >
          🔍 Find Matches
        </button>
      </div>

      <div className="lg:ml-[280px] p-7 lg:p-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-syne font-extrabold text-2xl">Discover Students</h1>
            <p className="text-sm text-[var(--text-dim)]">
              {searched ? `${filtered.length} matches found` : 'Select filters and find your match'}
            </p>
          </div>
          <Link href="/profile" className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] font-semibold text-sm no-underline transition-all hover:bg-[#00f5d0]">
            👁️ View My Profile
          </Link>
        </div>

        {!searched ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-6">🔍</div>
            <h2 className="font-syne font-bold text-xl mb-2">Find Your Study People</h2>
            <p className="text-sm text-[var(--text-dim)] max-w-md">
              Select your interests from the filter panel and click <strong>Find Matches</strong> to discover students who share your goals.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-6">🔎</div>
            <h2 className="font-syne font-bold text-xl mb-2">No Matches Yet</h2>
            <p className="text-sm text-[var(--text-dim)]">Try selecting different filters to find your study people.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {students.map((s) => (
              <div key={s.id} className="relative bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-5.5 cursor-pointer transition-all duration-250 hover:border-[var(--border-teal)] hover:-translate-y-[3px] hover:shadow-[var(--shadow),0_0_20px_rgba(0,212,180,0.08)]">
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="w-[52px] h-[52px] rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)] flex items-center justify-center text-[1.3rem]">👤</div>
                  <div>
                    <div className="font-syne font-bold text-base mb-0.5">{s.full_name}</div>
                    <div className="inline-flex items-center gap-1 text-[0.75rem] text-[var(--text-dim)] bg-[var(--surface2)] rounded-[var(--radius-pill)] px-2 py-0.5">🏛️ {s.university || 'Unknown'} · {s.department || ''}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(s.interests || []).slice(0, 3).map((interest) => (
                    <span key={interest} className="text-[0.73rem] px-2.5 py-1 rounded-[var(--radius-pill)] font-medium bg-[var(--teal-glow)] text-[var(--teal)] border border-[var(--border-teal)]">{interest}</span>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-dim)] leading-[1.5] mb-3.5">{s.bio || 'No bio yet.'}</p>
                <div className="flex gap-2.5">
                  <button className="flex-1 py-2 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-sm)] font-semibold text-sm cursor-pointer transition-all hover:bg-[#00f5d0]">Connect</button>
                  <Link href="/profile" className="flex-1 py-2 bg-transparent text-[var(--text)] border border-[var(--border)] rounded-[var(--radius-sm)] font-medium text-sm no-underline text-center transition-all hover:border-[var(--teal)] hover:text-[var(--teal)]">View Profile</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
