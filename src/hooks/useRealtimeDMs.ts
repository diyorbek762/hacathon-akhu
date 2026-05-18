'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export interface DM {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  read_at: string | null
  sender?: { full_name: string | null; avatar_url: string | null } | null
}

export interface Conversation {
  id: string
  name: string
  emoji: string
  preview: string
  time: string
  unread: number
  online: boolean
}

export function useRealtimeDMs(userId: string | undefined) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeDmId, setActiveDmId] = useState<string | null>(null)
  const [dmMessages, setDmMessages] = useState<DM[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchConversations = async () => {
    if (!userId) return

    const { data: msgs } = await supabase
      .from('messages')
      .select('*, sender:profiles(full_name, avatar_url)')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .limit(100)

    if (!msgs) return

    const otherIds = new Set<string>()
    msgs.forEach((m) => {
      const other = m.sender_id === userId ? m.receiver_id : m.sender_id
      otherIds.add(other)
    })

    const convs: Conversation[] = Array.from(otherIds).map((id) => ({
      id,
      name: 'User',
      emoji: '👤',
      preview: '',
      time: '',
      unread: 0,
      online: false,
    }))

    setConversations(convs)
    setLoading(false)
  }

  const fetchDmMessages = async (otherUserId: string) => {
    if (!userId) return

    const { data } = await supabase
      .from('messages')
      .select('*, sender:profiles(full_name, avatar_url)')
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
      .order('created_at', { ascending: true })
      .limit(100)

    setDmMessages((data || []) as DM[])
  }

  useEffect(() => {
    fetchConversations()
  }, [userId])

  useEffect(() => {
    if (activeDmId) fetchDmMessages(activeDmId)
  }, [activeDmId, userId])

  useEffect(() => {
    if (!userId) return

    const channel = supabase
      .channel('dms')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<DM>) => {
          const newMsg = payload.new as DM
          setDmMessages((prev) => [...prev, newMsg])
          if (newMsg.sender_id !== activeDmId) {
            fetchConversations()
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId, activeDmId])

  return {
    conversations,
    dmMessages,
    activeDmId,
    setActiveDmId: (id: string) => { setActiveDmId(id); fetchDmMessages(id) },
    loading,
  }
}

export async function sendDM(receiverId: string, content: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('messages').insert({
    sender_id: user.id,
    receiver_id: receiverId,
    content,
  })
}
