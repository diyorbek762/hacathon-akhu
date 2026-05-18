'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRealtimeCircleMessages } from '@/hooks/useRealtimeCircleMessages'

export default function CircleChannelPage() {
  const params = useParams()
  const circleId = params.id as string
  const { messages, loading } = useRealtimeCircleMessages(circleId)
  const [input, setInput] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [circle, setCircle] = useState<{ name: string; icon: string; description: string } | null>(null)
  const [memberCount, setMemberCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      setCurrentUserId(user.id)

      const [{ data: cData }, { data: mData }, { count }] = await Promise.all([
        supabase.from('circles').select('name, icon, description').eq('id', circleId).single(),
        supabase.from('circle_members').select('role').eq('circle_id', circleId).eq('user_id', user.id).single(),
        supabase.from('circle_members').select('*', { count: 'exact', head: true }).eq('circle_id', circleId),
      ])
      if (cData) setCircle(cData)
      if (mData) setIsAdmin(mData.role === 'admin')
      setMemberCount(count || 0)
    })
  }, [circleId])

  const handlePost = async () => {
    if (!input.trim() || !currentUserId) return
    await supabase.from('circle_messages').insert({ circle_id: circleId, sender_id: currentUserId, content: input })
    setInput('')
  }

  const formatTime = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  if (!circle) return <div className="pt-[68px] p-16 text-[var(--text-dim)] page-enter">Loading...</div>

  return (
    <div className="page-enter min-h-screen pt-[68px]">
      <div className="bg-[var(--bg2)] border-b border-[var(--border)] px-16 py-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <Link href="/circle" className="text-[var(--text-dim)] hover:text-[var(--text)] no-underline text-sm">← Back</Link>
          <div className="text-[2rem]">{circle.icon}</div>
          <div>
            <h1 className="font-syne font-extrabold text-2xl">{circle.name}</h1>
            <p className="text-sm text-[var(--text-dim)]">👥 {memberCount} members · {circle.description}</p>
          </div>
          {isAdmin && (
            <div className="ml-auto px-3 py-1.5 text-xs rounded-[var(--radius-pill)] bg-[rgba(255,171,64,0.12)] text-[var(--accent-amber)] border border-[rgba(255,171,64,0.2)] font-medium">👑 Admin</div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center text-sm text-[var(--text-muted)] py-12">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-sm text-[var(--text-muted)] py-12">No messages yet. Be the first to post!</div>
        ) : (
          <div className="flex flex-col gap-4 mb-6">
            {messages.map((post) => (
              <div key={post.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-5">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-lg ${
                    post.isAdmin ? 'bg-gradient-to-br from-[var(--teal)] to-[var(--accent-cyan)] ring-2 ring-[var(--teal-glow-strong)]' : 'bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)]'
                  }`}>{post.sender?.avatar_url || '👤'}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-syne font-bold text-sm">{post.sender?.full_name || 'Unknown'}</span>
                      {post.isAdmin && <span className="text-[0.6rem] px-1.5 py-0.5 rounded-full bg-[var(--teal-glow)] text-[var(--teal)] font-medium">Admin</span>}
                      <span className="text-xs text-[var(--text-muted)] ml-auto">{formatTime(post.created_at)}</span>
                    </div>
                    <p className="text-sm text-[var(--text-dim)] leading-[1.6]">{post.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdmin && (
          <div className="flex gap-3 items-center sticky bottom-6">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handlePost()}
              placeholder="Post an update to this circle..."
              className="flex-1 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-pill)] text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--teal)]"
            />
            <button onClick={handlePost} className="w-11 h-11 rounded-full bg-[var(--teal)] border-none flex items-center justify-center cursor-pointer transition-all hover:bg-[#00f5d0] hover:scale-105 flex-shrink-0 text-lg">➤</button>
          </div>
        )}
        {!isAdmin && currentUserId && <p className="text-center text-sm text-[var(--text-muted)] py-4">Only circle admins can post.</p>}
      </div>
    </div>
  )
}
