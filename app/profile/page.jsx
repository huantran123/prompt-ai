'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
// components
import Profile from '@components/Profile'

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()

  // states
  const [prompts, setPrompts] = useState([])

  // fetch prompts after mounting
  useEffect(() => {
    // fetch all prompts of current user
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setPrompts(data)
    }

    if (session?.user.id) fetchPrompts()
  }, [])

  const handleEdit = async (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`)
  }

  const handleDelete = async (prompt) => {

  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile