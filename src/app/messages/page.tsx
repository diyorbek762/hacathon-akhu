'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface DM {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  read_at: string | null
  sender?: { full_name: string | null; avatar_url: string | null } | null
}

interface Conversation {
  userId: string
  name: string
  lastMessage: string
  time: string
  unread: number
}

export default function MessagesPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConv, setActiveConv] = useState<string | null>(null)
  const [messages, setMessages] = useState<DM[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const bodyRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id)
        fetchConversations(user.id)
      }
    })
  }, [])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (!userId) return

    const channel = supabase
      .channel('dm-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`,
        },
        (payload: any) => {
          const newMsg = payload.new as DM
          if (newMsg.sender_id === activeConv || newMsg.receiver_id === activeConv) {
            setMessages((prev) => [...prev, newMsg])
            setTimeout(() => bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight), 50)
          }
          fetchConversations(userId)
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId, activeConv])

  const fetchConversations = async (uid: string) => {
    const { data: msgs } = await supabase
      .from('messages')
      .select('*, sender:profiles(full_name)')
      .or(`sender_id.eq.${uid},receiver_id.eq.${uid}`)
      .order('created_at', { ascending: false })
      .limit(100)

    if (!msgs) { setLoading(false); return }

    const convMap = new Map<string, { userId: string; name: string; lastMessage: string; time: string; unread: number }>()

    for (const m of msgs) {
      const otherId = m.sender_id === uid ? m.receiver_id : m.sender_id
      if (!convMap.has(otherId)) {
        const isUnread = m.receiver_id === uid && !m.read_at
        convMap.set(otherId, {
          userId: otherId,
          name: m.sender?.full_name || 'User',
          lastMessage: m.content,
          time: formatTime(m.created_at),
          unread: isUnread ? 1 : 0,
        })
      } else if (m.receiver_id === uid && !m.read_at) {
        const existing = convMap.get(otherId)!
        existing.unread += 1
      }
    }

    setConversations(Array.from(convMap.values()))
    setLoading(false)
  }

  const fetchMessages = async (otherId: string) => {
    if (!userId) return
    setActiveConv(otherId)
    const { data } = await supabase
      .from('messages')
      .select('*, sender:profiles(full_name, avatar_url)')
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`)
      .order('created_at', { ascending: true })
      .limit(100)

    setMessages((data || []) as DM[])
    setTimeout(() => bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight), 50)
  }

  const sendMessage = async () => {
    if (!input.trim() || !userId || !activeConv) return
    await supabase.from('messages').insert({
      sender_id: userId,
      receiver_id: activeConv,
      content: input,
    })
    setInput('')
  }

  const formatTime = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'now'
    if (mins < 60) return `${mins}m`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h`
    return `${Math.floor(hrs / 24)}d`
  }

  const activeConvData = conversations.find(c => c.userId === activeConv)

  return (
    <div className="page-enter min-h-screen pt-[68px] grid grid-cols-[320px_1fr]">
      <div className="bg-[var(--bg2)] border-r border-[var(--border)] flex flex-col">
        <div className="p-5 border-b border-[var(--border)]">
          <h2 className="font-syne font-bold text-[1.1rem] mb-3">💬 Messages</h2>
          <input type="text" placeholder="Search conversations..." className="w-full px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] text-sm text-[var(--text)] outline-none" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-center text-sm text-[var(--text-muted)] py-8">Loading...</p>
          ) : conversations.length === 0 ? (
            <p className="text-center text-sm text-[var(--text-muted)] py-8">No conversations yet. Start by connecting with someone!</p>
          ) : conversations.map((c) => (
            <button
              key={c.userId}
              onClick={() => fetchMessages(c.userId)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors text-left border-b border-[var(--border)] ${
                activeConv === c.userId
                  ? 'bg-[var(--teal-glow)] border-l-2 border-l-[var(--teal)]'
                  : 'hover:bg-[var(--surface)]'
              }`}
            >
              <div className="w-11 h-11 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)] flex items-center justify-center text-[1.1rem] relative">
                👤
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold mb-0.5">{c.name}</div>
                <div className="text-xs text-[var(--text-dim)] truncate">{c.lastMessage}</div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="text-[0.7rem] text-[var(--text-muted)]">{c.time}</div>
                {c.unread > 0 && (
                  <div className="w-[18px] h-[18px] rounded-full bg-[var(--teal)] text-[#080C14] text-[0.65rem] font-bold flex items-center justify-center">
                    {c.unread}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-[var(--bg)]">
        {activeConv ? (
          <>
            <div className="flex items-center gap-3.5 px-6 py-4 border-b border-[var(--border)] bg-[var(--bg2)]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--teal)] to-[var(--accent-purple)] flex items-center justify-center text-base">👤</div>
              <div>
                <div className="font-syne font-bold text-sm">{activeConvData?.name || 'User'}</div>
              </div>
              <div className="ml-auto flex gap-2.5">
                <button onClick={() => alert('📅 Study session request sent!')} className="px-3.5 py-[7px] rounded-[var(--radius-pill)] bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-dim)] cursor-pointer font-sans transition-colors hover:border-[var(--teal)] hover:text-[var(--teal)]">📅 Schedule Study</button>
                <Link href="/profile" className="px-3.5 py-[7px] rounded-[var(--radius-pill)] bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-dim)] no-underline font-sans transition-colors hover:border-[var(--teal)] hover:text-[var(--teal)]">👤 View Profile</Link>
              </div>
            </div>

            <div ref={bodyRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {messages.map((m) => {
                const isMine = m.sender_id === userId
                return (
                  <div key={m.id} className={`flex items-end gap-2.5 ${isMine ? 'flex-row-reverse' : ''}`}>
                    {!isMine && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-pink)] flex items-center justify-center text-sm flex-shrink-0">👤</div>}
                    <div className={`max-w-[65%] px-4 py-3 rounded-[18px] text-sm leading-[1.5] ${
                      isMine
                        ? 'bg-[var(--teal)] text-[#080C14] font-medium rounded-br-[4px]'
                        : 'bg-[var(--surface2)] text-[var(--text)] rounded-bl-[4px]'
                    }`}>
                      {m.content}
                      <div className={`text-[0.6rem] mt-1 ${isMine ? 'text-[rgba(8,12,20,0.5)]' : 'text-[var(--text-muted)]'}`}>
                        {formatTime(m.created_at)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-3 px-6 py-4 border-t border-[var(--border)] bg-[var(--bg2)]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-pill)] text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--teal)]"
              />
              <button onClick={sendMessage}
                className="w-11 h-11 rounded-full bg-[var(--teal)] border-none flex items-center justify-center cursor-pointer transition-all hover:bg-[#00f5d0] hover:scale-105 flex-shrink-0 text-[1.1rem]">➤</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] text-sm">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  )
}
