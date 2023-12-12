'use client'

import { useState, useEffect } from 'react'
// components
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  // states
  const [searchText, setSearchtext] = useState('')
  const [prompts, setPrompts] = useState([])

  const handleSearchChange = (e) => {

  }

  // fetch prompts after mounting
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPrompts(data)
    }

    fetchPrompts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={prompts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed