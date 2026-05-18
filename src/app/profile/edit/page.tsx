'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function EditProfilePage() {
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [university, setUniversity] = useState('')
  const [department, setDepartment] = useState('')
  const [interests, setInterests] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push('/sign-in'); return }
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (profile) {
        setFullName(profile.full_name || '')
        setBio(profile.bio || '')
        setUniversity(profile.university || '')
        setDepartment(profile.department || '')
        setInterests((profile.interests || []).join(', '))
      }
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').update({
      full_name: fullName,
      bio,
      university,
      department,
      interests: interests.split(',').map(s => s.trim()).filter(Boolean),
    }).eq('id', user.id)
    setSaving(false)
    router.push('/profile')
  }

  if (loading) return <div className="min-h-screen pt-[68px] flex items-center justify-center text-[var(--text-muted)]">Loading...</div>

  return (
    <div className="page-enter min-h-screen pt-[68px]">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link href="/profile" className="text-sm text-[var(--text-dim)] hover:text-[var(--text)] no-underline mb-6 inline-block">← Back to Profile</Link>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-8">
          <h1 className="font-syne font-extrabold text-2xl mb-6">Edit Profile</h1>

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-medium text-[var(--text-dim)] mb-2 block">Full Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-sm text-[var(--text)] outline-none focus:border-[var(--teal)]" />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-dim)] mb-2 block">University</label>
              <input value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g. MIT"
                className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-sm text-[var(--text)] outline-none focus:border-[var(--teal)]" />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-dim)] mb-2 block">Department</label>
              <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Computer Science"
                className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-sm text-[var(--text)] outline-none focus:border-[var(--teal)]" />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-dim)] mb-2 block">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder="Tell students about yourself..."
                className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-sm text-[var(--text)] outline-none focus:border-[var(--teal)] resize-none" />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--text-dim)] mb-2 block">Interests <span className="text-[var(--text-muted)] font-normal">(comma-separated)</span></label>
              <input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Machine Learning, Startups, Photography"
                className="w-full px-4 py-3 bg-[var(--bg2)] border border-[var(--border)] rounded-[var(--radius-sm)] text-sm text-[var(--text)] outline-none focus:border-[var(--teal)]" />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving}
                className="px-6 py-3 bg-[var(--teal)] text-[#080C14] rounded-[var(--radius-pill)] font-semibold text-sm transition-all hover:bg-[#00f5d0] disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link href="/profile"
                className="px-6 py-3 bg-transparent text-[var(--text-dim)] border border-[var(--border)] rounded-[var(--radius-pill)] font-medium text-sm no-underline transition-all hover:border-[var(--teal)] hover:text-[var(--teal)]">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
