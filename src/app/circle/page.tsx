'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Circle {
  id: string
  name: string
  description: string
  icon: string
  created_by: string
}

export default function CirclePage() {
  const [circles, setCircles] = useState<Circle[]>([])
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set())
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      const uid = user?.id || null
      setUserId(uid)

      const { data: cData } = await supabase.from('circles').select('*')
      setCircles(cData || [])

      if (cData) {
        const counts: Record<string, number> = {}
        for (const c of cData) {
          const { count } = await supabase.from('circle_members').select('*', { count: 'exact', head: true }).eq('circle_id', c.id)
          counts[c.id] = count || 0
        }
        setMemberCounts(counts)
      }

      if (uid) {
        const { data: memberships } = await supabase.from('circle_members').select('circle_id').eq('user_id', uid)
        setJoinedIds(new Set((memberships || []).map(m => m.circle_id)))
      }

      setLoading(false)
    })
  }, [])

  const toggleJoin = async (circleId: string) => {
    if (!userId) return
    const supabase = createClient()
    if (joinedIds.has(circleId)) {
      await supabase.from('circle_members').delete().eq('circle_id', circleId).eq('user_id', userId)
      setJoinedIds((prev) => { const next = new Set(prev); next.delete(circleId); return next })
    } else {
      await supabase.from('circle_members').insert({ circle_id: circleId, user_id: userId, role: 'member' })
      setJoinedIds((prev) => new Set(prev).add(circleId))
    }
  }

  const display = showAll ? circles : circles.slice(0, 4)

  return (
    <div className="page-enter min-h-screen pt-[68px]">
      <div className="bg-[var(--bg2)] border-b border-[var(--border)] px-16 py-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,111,247,0.12)_0%,transparent_60%)]" />
        <h1 className="font-syne font-extrabold text-[2.2rem] mb-2.5 relative z-[1]">📡 Circle</h1>
        <p className="text-[var(--text-dim)] text-base max-w-[500px] mb-6 relative z-[1]">Your curated study groups, clubs, and squads — all in one circle.</p>
      </div>

      <div className="px-16 py-8">
        {loading ? (
          <p className="text-center text-[var(--text-muted)] py-12">Loading circles...</p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-syne font-bold text-[1.1rem] flex items-center gap-2.5">
                🔥 Trending Circles
                <span className="text-sm font-normal text-[var(--text-muted)] font-sans">· Updated daily</span>
              </h2>
              {circles.length > 4 && !showAll && (
                <button onClick={() => setShowAll(true)} className="px-4 py-2 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] text-sm font-semibold transition-all hover:bg-[#00f5d0]">Browse All</button>
              )}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 mb-10">
              {display.map((c) => (
                <Link key={c.id} href={`/circle/${c.id}`} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden transition-all duration-250 cursor-pointer no-underline hover:border-[var(--border-teal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
                  <div className="h-20 flex items-center justify-center text-[2.5rem] bg-gradient-to-br from-[rgba(124,111,247,0.3)] to-[rgba(0,212,180,0.1)]">{c.icon}</div>
                  <div className="p-5">
                    <div className="font-syne font-bold text-base mb-1.5 text-[var(--text)]">{c.name}</div>
                    <div className="text-sm text-[var(--text-dim)] leading-[1.5] mb-3.5">{c.description}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[var(--text-dim)] flex items-center gap-1.5">👥 {memberCounts[c.id] || 0} members</div>
                      <button
                        onClick={(e) => { e.preventDefault(); toggleJoin(c.id) }}
                        className={`px-[18px] py-[7px] rounded-[var(--radius-pill)] text-sm font-semibold cursor-pointer transition-all font-sans ${
                          joinedIds.has(c.id)
                            ? 'bg-[var(--teal-glow)] text-[var(--teal)] border border-[var(--border-teal)]'
                            : 'bg-[var(--teal)] text-[#080C14] border-none hover:bg-[#00f5d0]'
                        }`}
                      >
                        {joinedIds.has(c.id) ? '✓ Joined' : '+ Join'}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <h2 className="font-syne font-bold text-[1.1rem] mb-5">📚 Your Circle</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
              {circles.filter(c => joinedIds.has(c.id)).length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] col-span-full py-8">You haven&apos;t joined any circles yet.</p>
              ) : circles.filter(c => joinedIds.has(c.id)).map((c) => (
                <Link key={c.id} href={`/circle/${c.id}`} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden transition-all duration-250 cursor-pointer no-underline hover:border-[var(--border-teal)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
                  <div className="h-20 flex items-center justify-center text-[2.5rem] bg-gradient-to-br from-[rgba(0,212,180,0.2)] to-[rgba(64,196,255,0.1)]">{c.icon}</div>
                  <div className="p-5">
                    <div className="font-syne font-bold text-base mb-1.5 text-[var(--text)]">{c.name}</div>
                    <div className="text-sm text-[var(--text-dim)] leading-[1.5] mb-3.5">{c.description}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[var(--text-dim)] flex items-center gap-1.5">👥 {memberCounts[c.id] || 0} members</div>
                      <span className="px-[18px] py-[7px] rounded-[var(--radius-pill)] text-sm font-semibold bg-[var(--teal-glow)] text-[var(--teal)] border border-[var(--border-teal)]">✓ Joined</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
