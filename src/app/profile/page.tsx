'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface CircleInfo {
  id: string
  name: string
  icon: string
  memberCount: number
}

const interests = [
  { label: 'Machine Learning', cls: 'tag-purple' },
  { label: 'Startups', cls: 'tag-teal' },
  { label: 'Morning Gym', cls: 'tag-amber' },
  { label: 'Open Source', cls: 'tag-cyan' },
  { label: 'Photography', cls: 'tag-pink' },
  { label: 'Hackathons', cls: 'tag-green' },
  { label: 'Research', cls: 'tag-purple' },
  { label: 'Chess', cls: 'tag-amber' },
  { label: 'Coffee Chats', cls: 'tag-teal' },
]

const courses = [
  { code: 'CS 224N', name: 'Natural Language Processing', grade: 'A+' },
  { code: 'CS 285', name: 'Deep Reinforcement Learning', grade: 'A' },
  { code: 'MATH 402', name: 'Probability Theory', grade: 'A-' },
  { code: '6.S898', name: 'Deep Learning', grade: 'A' },
]

const goals = [
  { icon: '🚀', text: 'Launch a startup before graduation' },
  { icon: '💪', text: 'Morning workout partner — 6am runs' },
  { icon: '📝', text: 'Publish a research paper in NLP' },
  { icon: '🏆', text: 'Win HackMIT 2026' },
]

const tagStyles: Record<string, string> = {
  'tag-purple': 'bg-[rgba(124,111,247,0.15)] text-[var(--accent-purple)] border border-[rgba(124,111,247,0.25)]',
  'tag-teal': 'bg-[var(--teal-glow)] text-[var(--teal)] border border-[var(--border-teal)]',
  'tag-amber': 'bg-[rgba(255,171,64,0.12)] text-[var(--accent-amber)] border border-[rgba(255,171,64,0.2)]',
  'tag-cyan': 'bg-[rgba(64,196,255,0.12)] text-[var(--accent-cyan)] border border-[rgba(64,196,255,0.2)]',
  'tag-pink': 'bg-[rgba(240,98,146,0.12)] text-[var(--accent-pink)] border border-[rgba(240,98,146,0.2)]',
  'tag-green': 'bg-[rgba(105,240,174,0.12)] text-[var(--accent-green)] border border-[rgba(105,240,174,0.2)]',
}

export default function ProfilePage() {
  const [circleList, setCircleList] = useState<CircleInfo[]>([])
  const [profile, setProfile] = useState<{ full_name?: string; university?: string; department?: string; bio?: string }>({})

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return

      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (prof) setProfile(prof)

      const { data: memberships } = await supabase.from('circle_members').select('circle_id').eq('user_id', user.id)
      if (!memberships) return

      const infos: CircleInfo[] = []
      for (const m of memberships) {
        const { data: c } = await supabase.from('circles').select('id, name, icon').eq('id', m.circle_id).single()
        if (c) {
          const { count } = await supabase.from('circle_members').select('*', { count: 'exact', head: true }).eq('circle_id', c.id)
          infos.push({ id: c.id, name: c.name, icon: c.icon, memberCount: count || 0 })
        }
      }
      setCircleList(infos)
    })
  }, [])
  return (
    <div className="page-enter min-h-screen pt-[68px]">
      <div className="h-[220px] bg-gradient-to-br from-[#0a1628] via-[#0d2040] to-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,212,180,0.06)_1px,transparent_1px)] bg-[length:24px_24px]" />
        <div className="absolute -top-[60px] right-[80px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,212,180,0.12)_0%,transparent_60%)]" />
        <div className="absolute -top-[40px] left-[100px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(124,111,247,0.1)_0%,transparent_60%)]" />
      </div>

      <div className="bg-[var(--bg2)] border-b border-[var(--border)] px-16 pb-7 relative">
        <div className="relative inline-block -mt-14 mb-4">
          <div className="w-[112px] h-[112px] rounded-full border-4 border-[var(--bg2)] bg-gradient-to-br from-[var(--accent-purple)] to-[var(--teal)] flex items-center justify-center text-[2.5rem] overflow-hidden">
            👩‍💻
          </div>
          <div className="absolute bottom-1.5 right-1.5 w-[18px] h-[18px] rounded-full bg-[var(--teal)] border-3 border-[var(--bg2)]" />
        </div>

        <div className="flex items-start justify-between gap-5">
          <div>
            <h1 className="font-syne font-extrabold text-[1.8rem] mb-1.5">Sofia Rodriguez</h1>
            <div className="flex items-center gap-2.5 flex-wrap">
              {['🏛️ MIT', '💻 Computer Science', '📅 Junior · Class of 2027', '🟢 Active Now'].map((t, i) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-[var(--text-dim)]">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />}
                  <span style={t.includes('Active') ? { color: 'var(--teal)' } : undefined}>{t}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2.5 pt-2">
            <Link href="/messages" className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-transparent text-[var(--teal)] border border-[var(--border-teal)] rounded-[var(--radius-pill)] font-semibold text-sm no-underline transition-all hover:bg-[var(--teal-glow)]">✉️ Message</Link>
            <button className="px-5 py-2.5 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] font-semibold text-sm transition-all hover:bg-[#00f5d0]">+ Connect</button>
          </div>
        </div>
      </div>

      <div className="flex bg-[var(--bg2)] border-b border-[var(--border)]">
        {[
          { num: '247', label: 'Connections' },
          { num: String(circleList.length || 0), label: 'Circles' },
          { num: '142', label: 'Study Sessions' },
          { num: '+1.6 GPA', label: 'Avg Grade Boost' },
        ].map((s) => (
          <div key={s.label} className="flex-1 py-5 px-6 text-center border-r border-[var(--border)] last:border-r-0 transition-colors hover:bg-[var(--surface)]">
            <div className="font-syne font-extrabold text-2xl text-[var(--teal)]">{s.num}</div>
            <div className="text-[0.75rem] text-[var(--text-dim)] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 px-16 py-8 max-w-[1200px] mx-auto">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 transition-colors hover:border-[var(--border-teal)]">
          <div className="font-syne font-bold text-sm uppercase tracking-[1px] text-[var(--text-muted)] mb-4 flex items-center gap-2"><span>👤</span> About Me</div>
          <p className="text-sm text-[var(--text-dim)] leading-[1.7]">
            Hey! I&apos;m a Junior at MIT studying CS with a focus on AI and systems design. I&apos;m passionate about building products that actually matter — from late-night coding sessions to weekend hackathons. Currently doing research on LLM interpretability and helping run our campus Startup Club. Love morning runs, good coffee, and anyone who wants to nerd out about machine learning. Looking for study partners and project collaborators!
          </p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 transition-colors hover:border-[var(--border-teal)]">
          <div className="font-syne font-bold text-sm uppercase tracking-[1px] text-[var(--text-muted)] mb-4 flex items-center gap-2"><span>✨</span> Interests</div>
          <div className="flex flex-wrap gap-2">
            {interests.map((i) => (
              <span key={i.label} className={`px-3.5 py-1.5 rounded-[var(--radius-pill)] text-sm font-medium cursor-default ${tagStyles[i.cls]}`}>{i.label}</span>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 transition-colors hover:border-[var(--border-teal)]">
          <div className="font-syne font-bold text-sm uppercase tracking-[1px] text-[var(--text-muted)] mb-4 flex items-center gap-2"><span>📖</span> Courses This Semester</div>
          <div className="flex flex-col gap-2.5">
            {courses.map((c) => (
              <div key={c.code} className="flex items-center justify-between px-3.5 py-3 bg-[var(--bg2)] rounded-[var(--radius-sm)] text-sm">
                <div><span className="text-[var(--teal)] font-semibold font-syne">{c.code}</span> <span className="text-[var(--text-dim)] ml-2">{c.name}</span></div>
                <span className="text-[0.75rem] px-2 py-0.5 rounded-[var(--radius-pill)] bg-[rgba(105,240,174,0.12)] text-[var(--accent-green)]">{c.grade}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 transition-colors hover:border-[var(--border-teal)]">
          <div className="font-syne font-bold text-sm uppercase tracking-[1px] text-[var(--text-muted)] mb-4 flex items-center gap-2"><span>🎯</span> Goals</div>
          <div className="flex flex-col gap-2.5">
            {goals.map((g) => (
              <div key={g.text} className="flex items-center gap-3 px-3.5 py-3 bg-[var(--bg2)] rounded-[var(--radius-sm)]">
                <div className="w-9 h-9 rounded-[10px] bg-[var(--teal-glow)] border border-[var(--border-teal)] flex items-center justify-center text-base flex-shrink-0">{g.icon}</div>
                <span className="text-sm font-medium">{g.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 transition-colors hover:border-[var(--border-teal)]">
          <div className="font-syne font-bold text-sm uppercase tracking-[1px] text-[var(--text-muted)] mb-4 flex items-center gap-2"><span>📅</span> Availability This Week</div>
          <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-1">
            <div></div>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
              <div key={d} className="text-center text-[0.7rem] text-[var(--text-muted)] py-1 font-semibold">{d}</div>
            ))}
            {['Morning', 'Afternoon', 'Evening'].map((time) => (
              <>
                <div className="text-[0.65rem] text-[var(--text-muted)] flex items-center">{time}</div>
                {Array(7).fill(0).map((_, i) => {
                  const statuses = ['free', 'busy', 'free', 'busy', 'free', 'maybe', 'free']
                  const colors: Record<string, string> = { free: 'rgba(0,212,180,0.2)', busy: 'rgba(240,98,146,0.15)', maybe: 'rgba(255,171,64,0.15)' }
                  return <div key={i} className="h-7 rounded-[5px] transition-all" style={{ background: colors[statuses[i]] || 'var(--bg2)' }} />
                })}
              </>
            ))}
          </div>
          <div className="flex gap-4 mt-3">
            {[
              { color: 'rgba(0,212,180,0.4)', label: 'Available' },
              { color: 'rgba(240,98,146,0.3)', label: 'Busy' },
              { color: 'rgba(255,171,64,0.3)', label: 'Maybe' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-[0.75rem] text-[var(--text-dim)]">
                <div className="w-2.5 h-2.5 rounded" style={{ background: l.color }} /> {l.label}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 transition-colors hover:border-[var(--border-teal)]">
          <div className="font-syne font-bold text-sm uppercase tracking-[1px] text-[var(--text-muted)] mb-4 flex items-center gap-2"><span>🤝</span> Best Match For</div>
          <div className="flex flex-col gap-3">
            {[
              { icon: '📚', name: 'Deep-focus Study Sessions', pct: 92, color: 'var(--teal)', bar: 'from-[var(--teal)] to-[var(--accent-cyan)]' },
              { icon: '🚀', name: 'Startup / Project Collaborator', pct: 87, color: 'var(--accent-purple)', bar: 'from-[var(--accent-purple)] to-[var(--accent-pink)]' },
              { icon: '💪', name: 'Accountability Partner', pct: 78, color: 'var(--accent-amber)', bar: 'from-[var(--accent-amber)] to-[var(--accent-green)]' },
              { icon: '🔬', name: 'Research Buddy', pct: 70, color: 'var(--accent-cyan)', bar: 'from-[var(--accent-cyan)] to-[var(--accent-purple)]' },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3.5 px-3.5 py-3 bg-[var(--bg2)] rounded-[var(--radius-sm)]">
                <div className="text-[1.2rem] w-9 text-center">{m.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">{m.name}</div>
                  <div className="h-1 bg-[var(--surface2)] rounded">
                    <div className={`h-full rounded bg-gradient-to-r ${m.bar}`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
                <div className="text-sm font-bold" style={{ color: m.color }}>{m.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-6 transition-colors hover:border-[var(--border-teal)]">
          <div className="font-syne font-bold text-sm uppercase tracking-[1px] text-[var(--text-muted)] mb-4 flex items-center gap-2"><span>🌐</span> Circle</div>
          <div className="flex flex-col gap-3">
            {circleList.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] px-1">No circles joined yet.</p>
            ) : circleList.map((c) => (
              <Link key={c.id} href={`/circle/${c.id}`} className="flex items-center gap-3.5 px-3.5 py-3 bg-[var(--bg2)] rounded-[var(--radius-sm)] cursor-pointer transition-colors hover:bg-[var(--surface2)] no-underline">
                <div className="w-11 h-11 rounded-[12px] flex items-center justify-center text-[1.2rem] flex-shrink-0 bg-[rgba(124,111,247,0.15)]">{c.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[var(--text)] mb-0.5">{c.name}</div>
                  <div className="text-[0.75rem] text-[var(--text-dim)]">👥 {c.memberCount} members</div>
                </div>
                <div className="text-[0.7rem] px-2 py-0.5 rounded-[var(--radius-pill)] bg-[var(--teal-glow)] border border-[var(--border-teal)] text-[var(--teal)]">Joined</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-2 flex justify-center py-2 pb-3">
          <button onClick={() => alert('✅ Study session request sent! Check your messages for responses.')}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[var(--teal)] to-[var(--accent-cyan)] text-[#080C14] rounded-[var(--radius-pill)] font-syne font-bold text-base cursor-pointer transition-all duration-250 shadow-[0_8px_30px_rgba(0,212,180,0.3)] hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(0,212,180,0.45)]">
            📅 Request Study Session
          </button>
        </div>
      </div>
    </div>
  )
}
