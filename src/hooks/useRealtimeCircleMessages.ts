'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

export interface CircleMessage {
  id: string
  circle_id: string
  sender_id: string
  content: string
  created_at: string
  sender?: { full_name: string | null; avatar_url: string | null } | null
  isAdmin?: boolean
}

export function useRealtimeCircleMessages(circleId: string) {
  const [messages, setMessages] = useState<CircleMessage[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!circleId) return
    setLoading(true)

    const fetchInitial = async () => {
      const { data } = await supabase
        .from('circle_messages')
        .select('*, sender:profiles(full_name, avatar_url)')
        .eq('circle_id', circleId)
        .order('created_at', { ascending: false })
        .limit(50)

      const { data: members } = await supabase
        .from('circle_members')
        .select('user_id, role')
        .eq('circle_id', circleId)

      const adminIds = new Set((members || []).filter(m => m.role === 'admin').map(m => m.user_id))
      const enriched = (data || []).map(m => ({ ...m, isAdmin: adminIds.has(m.sender_id) }))

      if (data) setMessages(enriched as CircleMessage[])
      setLoading(false)
    }

    fetchInitial()

    const channel = supabase
      .channel(`circle-${circleId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'circle_messages',
          filter: `circle_id=eq.${circleId}`,
        },
        async (payload: RealtimePostgresChangesPayload<CircleMessage>) => {
          const newMsg = payload.new as CircleMessage
          const { data: sender } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', newMsg.sender_id)
            .single()
          newMsg.sender = sender
          setMessages((prev) => [newMsg, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [circleId])

  return { messages, loading }
}
