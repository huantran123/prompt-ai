'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
// components
import Profile from '@components/Profile'

const OtherUserProfile = ({ params }) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('username')

  // states
  const [userPrompts, setUserPrompts] = useState([])

  // fetch prompts after mounting
  useEffect(() => {
    // fetch all prompts of current user
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()

      setUserPrompts(data)
    }

    if (params?.id) fetchPrompts()
  }, [params.id])

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPrompts}
    />
  )
}

export default OtherUserProfile