'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/discover', label: 'Discover' },
  { href: '/circle', label: 'Circle' },
  { href: '/messages', label: 'Messages' },
]

export default function Nav() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname.startsWith(href)

  if (pathname === '/sign-in' || pathname === '/sign-up') return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-12 h-[68px] bg-[rgba(8,12,20,0.85)] backdrop-blur-xl border-b border-[var(--border)]">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <img src="/logo.png" alt="StudyMatch" className="w-8 h-8 rounded-lg object-cover" />
        <span className="font-syne font-extrabold text-[1.3rem] text-[var(--text)]">
          Study<span className="text-[var(--teal)]">Match</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium no-underline transition-all duration-200 ${
              isActive(l.href)
                ? 'text-[var(--teal)] bg-[var(--teal-glow)]'
                : 'text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="px-[22px] py-[9px] bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] font-semibold text-sm no-underline transition-all duration-200 hover:bg-[#00f5d0] hover:-translate-y-[1px]"
        >
          My Profile
        </Link>
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full border-2 border-[var(--teal)] overflow-hidden no-underline"
        >
          <div className="w-full h-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--teal)] flex items-center justify-center text-base">
            👩‍💻
          </div>
        </Link>
      </div>
    </nav>
  )
}
