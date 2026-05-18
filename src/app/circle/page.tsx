'use client'

import { useState } from 'react'
import Link from 'next/link'

const circles = [
  { id: '1', emoji: '🤖', name: 'AI Research Collective', desc: 'Weekly paper readings, research discussions, and project collaborations in machine learning and AI.', members: 2840, joined: true, bg: 'linear-gradient(135deg,rgba(124,111,247,0.3),rgba(0,212,180,0.1))' },
  { id: '2', emoji: '🚀', name: 'Founders & Builders', desc: 'Connect with student entrepreneurs building real startups. Demo nights every Friday.', members: 1650, joined: true, bg: 'linear-gradient(135deg,rgba(0,212,180,0.2),rgba(64,196,255,0.1))' },
  { id: '3', emoji: '💪', name: '5AM Gym Squad', desc: 'Early risers who hit the campus gym before 7am. Accountability and motivation built in.', members: 412, joined: false, bg: 'linear-gradient(135deg,rgba(255,171,64,0.2),rgba(240,98,146,0.1))' },
  { id: '4', emoji: '🧪', name: 'Research Nexus', desc: 'For undergrads doing faculty research. Find labs, collaborators, and publication tips.', members: 980, joined: false, bg: 'linear-gradient(135deg,rgba(64,196,255,0.2),rgba(105,240,174,0.1))' },
  { id: '5', emoji: '🎨', name: 'Creative Tech Collective', desc: 'Where design thinking meets engineering. UI/UX, generative art, and product design.', members: 730, joined: false, bg: 'linear-gradient(135deg,rgba(240,98,146,0.2),rgba(124,111,247,0.1))' },
  { id: '6', emoji: '♟️', name: 'Chess & Strategy Club', desc: 'Weekly tournaments, blitz sessions, and strategic thinking workshops. All levels welcome.', members: 295, joined: true, bg: 'linear-gradient(135deg,rgba(105,240,174,0.15),rgba(0,212,180,0.1))' },
]

export default function CirclePage() {
  const [joined, setJoined] = useState<Set<string>>(new Set(circles.filter(c => c.joined).map(c => c.id)))
  const [showAll, setShowAll] = useState(false)

  const toggleJoin = (id: string) => {
    setJoined((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const displayCircles = showAll ? circles : circles.slice(0, 4)

  return (
    <div className="page-enter min-h-screen pt-[68px]">
      <div className="bg-[var(--bg2)] border-b border-[var(--border)] px-16 py-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,111,247,0.12)_0%,transparent_60%)]" />
        <h1 className="font-syne font-extrabold text-[2.2rem] mb-2.5 relative z-[1]">📡 Circle</h1>
        <p className="text-[var(--text-dim)] text-base max-w-[500px] mb-6 relative z-[1]">Your curated study groups, clubs, and squads — all in one circle.</p>
        <div className="flex gap-3 relative z-[1] max-w-[480px]">
          <input type="text" placeholder="🔍 Search circles..." className="flex-1 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--teal)]" />
          <button onClick={() => setShowAll(true)} className="px-[22px] py-2.5 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] font-semibold text-sm whitespace-nowrap transition-all hover:bg-[#00f5d0]">Browse All</button>
        </div>
      </div>

      <div className="px-16 py-8">
        <h2 className="font-syne font-bold text-[1.1rem] mb-5 flex items-center gap-2.5">
          🔥 Trending Circles
          <span className="text-sm font-normal text-[var(--text-muted)] font-sans">· Updated daily</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 mb-10">
          {displayCircles.map((c) => (
            <Link key={c.id} href={`/circle/${c.id}`} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden transition-all duration-250 cursor-pointer no-underline hover:border-[var(--border-teal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
              <div className="h-20 flex items-center justify-center text-[2.5rem]" style={{ background: c.bg }}>{c.emoji}</div>
              <div className="p-5">
                <div className="font-syne font-bold text-base mb-1.5 text-[var(--text)]">{c.name}</div>
                <div className="text-sm text-[var(--text-dim)] leading-[1.5] mb-3.5">{c.desc}</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[var(--text-dim)] flex items-center gap-1.5">👥 {c.members.toLocaleString()} members</div>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleJoin(c.id) }}
                    className={`px-[18px] py-[7px] rounded-[var(--radius-pill)] text-sm font-semibold cursor-pointer transition-all font-sans ${
                      joined.has(c.id)
                        ? 'bg-[var(--teal-glow)] text-[var(--teal)] border border-[var(--border-teal)]'
                        : 'bg-[var(--teal)] text-[#080C14] border-none hover:bg-[#00f5d0]'
                    }`}
                  >
                    {joined.has(c.id) ? '✓ Joined' : '+ Join'}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="font-syne font-bold text-[1.1rem] mb-5 flex items-center gap-2.5">📚 Your Circle</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
          {circles.filter(c => joined.has(c.id)).map((c) => (
            <Link key={c.id} href={`/circle/${c.id}`} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden transition-all duration-250 cursor-pointer no-underline hover:border-[var(--border-teal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
              <div className="h-20 flex items-center justify-center text-[2.5rem]" style={{ background: c.bg }}>{c.emoji}</div>
              <div className="p-5">
                <div className="font-syne font-bold text-base mb-1.5 text-[var(--text)]">{c.name}</div>
                <div className="text-sm text-[var(--text-dim)] leading-[1.5] mb-3.5">{c.desc}</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[var(--text-dim)] flex items-center gap-1.5">👥 {c.members.toLocaleString()} members</div>
                  <span className="px-[18px] py-[7px] rounded-[var(--radius-pill)] text-sm font-semibold bg-[var(--teal-glow)] text-[var(--teal)] border border-[var(--border-teal)]">✓ Joined</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
