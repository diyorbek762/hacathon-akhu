'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div id="page-hero" className="page-enter">
      <div className="relative min-h-screen overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px] z-[1]" />
        <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,212,180,0.18)_0%,transparent_65%)] z-[2] animate-pulse-glow" />
        <div className="absolute -bottom-[100px] -left-[100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(124,111,247,0.1)_0%,transparent_65%)] z-[2]" />

        <div className="relative z-10 min-h-screen grid grid-cols-[1fr_1fr] items-center px-20 pt-[68px] pb-16 gap-[60px] max-w-[1400px] mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--teal-glow)] border border-[var(--border-teal)] rounded-[var(--radius-pill)] px-4 py-1.5 mb-7 text-sm text-[var(--teal)] font-medium animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-blink" />
              12,400+ students matched this semester
            </div>

            <h1 className="font-syne font-extrabold text-[clamp(2.6rem,4.5vw,4.2rem)] leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Find Your People.<br />
              <em className="not-italic text-gradient">Ace Your Semester.</em>
            </h1>

            <p className="text-[1.1rem] text-[var(--text-dim)] leading-[1.7] max-w-[480px] mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              We match students by shared interests, courses, and goals — so you spend less time searching and more time thriving.
            </p>

            <div className="flex gap-4 flex-wrap animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] font-semibold text-base no-underline transition-all duration-250 hover:bg-[#00f5d0] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,212,180,0.4)]"
              >
                🔍 Find Study Partners
              </Link>
              <Link
                href="/circle"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent text-[var(--teal)] border border-[var(--border-teal)] rounded-[var(--radius-pill)] font-semibold text-base no-underline transition-all duration-250 hover:bg-[var(--teal-glow)] hover:-translate-y-0.5"
              >
                🌐 Browse Circle
              </Link>
            </div>

            <div className="flex gap-8 mt-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {[
                { num: '94%', label: 'Match Satisfaction' },
                { num: '+1.4', label: 'Avg Grade Boost' },
                { num: '340+', label: 'Universities' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-syne font-extrabold text-[1.6rem] text-[var(--text)]">{s.num}</span>
                  <span className="text-[0.8rem] text-[var(--text-dim)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center h-[500px]">
            <div className="absolute w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(0,212,180,0.22)_0%,transparent_65%)] rounded-full animate-pulse-glow" style={{ animationDuration: '3s' }} />
            <div className="relative w-[320px] h-[420px]">
              {[
                {
                  emoji: '👩‍💻', name: 'Mia Chen', sub: 'MIT · Junior · CS',
                  match: '96%', tags: [{ label: 'Machine Learning', cls: 'tag-purple' }, { label: 'Startup Club', cls: 'tag-teal' }, { label: 'Morning Gym', cls: 'tag-amber' }],
                  delay: '0s',
                },
                {
                  emoji: '🧑‍🔬', name: 'Luca Moretti', sub: 'Stanford · Senior · EE',
                  match: '88%', tags: [{ label: 'Deep Learning', cls: 'tag-cyan' }, { label: 'Research Lab', cls: 'tag-green' }, { label: 'Chess Club', cls: 'tag-pink' }],
                  delay: '0.5s',
                },
                {
                  emoji: '👨‍🎨', name: 'Zara Ahmed', sub: 'NYU · Sophomore · Design',
                  match: '82%', tags: [{ label: 'UI/UX', cls: 'tag-amber' }, { label: 'Photography', cls: 'tag-purple' }, { label: 'Hackathons', cls: 'tag-teal' }],
                  delay: '1s',
                },
              ].map((card, i) => (
                <div
                  key={card.name}
                  className="absolute w-[300px] bg-[var(--surface)] border border-[var(--border)] rounded-[20px] p-6 transition-all duration-300"
                  style={{
                    top: `${i * 20}px`,
                    left: `${10 - i * 10}px`,
                    zIndex: 3 - i,
                    opacity: 1 - i * 0.25,
                    boxShadow: i === 0 ? 'var(--shadow), var(--shadow-teal)' : undefined,
                    animation: `cardFloat 3s ${card.delay} ease-in-out infinite`,
                  }}
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--teal)] flex items-center justify-center text-[1.3rem] flex-shrink-0 overflow-hidden">
                      {card.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="font-syne font-bold text-base">{card.name}</div>
                      <div className="text-[0.8rem] text-[var(--text-dim)]">{card.sub}</div>
                    </div>
                    <div className="flex flex-col items-center bg-[var(--teal-glow)] border border-[var(--border-teal)] rounded-[10px] px-2.5 py-1.5 min-w-[52px]">
                      <div className="font-syne font-extrabold text-base text-[var(--teal)]">{card.match}</div>
                      <div className="text-[0.6rem] text-[var(--text-dim)] uppercase tracking-[0.5px]">Match</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((t) => (
                      <span
                        key={t.label}
                        className={`text-[0.73rem] px-2.5 py-1 rounded-[var(--radius-pill)] font-medium ${
                          t.cls === 'tag-purple' ? 'bg-[rgba(124,111,247,0.15)] text-[var(--accent-purple)] border border-[rgba(124,111,247,0.25)]' :
                          t.cls === 'tag-teal' ? 'bg-[var(--teal-glow)] text-[var(--teal)] border border-[var(--border-teal)]' :
                          t.cls === 'tag-amber' ? 'bg-[rgba(255,171,64,0.12)] text-[var(--accent-amber)] border border-[rgba(255,171,64,0.2)]' :
                          t.cls === 'tag-pink' ? 'bg-[rgba(240,98,146,0.12)] text-[var(--accent-pink)] border border-[rgba(240,98,146,0.2)]' :
                          t.cls === 'tag-cyan' ? 'bg-[rgba(64,196,255,0.12)] text-[var(--accent-cyan)] border border-[rgba(64,196,255,0.2)]' :
                          'bg-[rgba(105,240,174,0.12)] text-[var(--accent-green)] border border-[rgba(105,240,174,0.2)]'
                        }`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
