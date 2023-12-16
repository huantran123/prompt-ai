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
  const [searchText, setSearchText] = useState('')
  const [prompts, setPrompts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  // fetch prompts after mounting
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPrompts(data)
    }

    fetchPrompts()
  }, [])

  // helper function to filter prompts that match the search text
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i')   // 'i' flag for case-insensitive search
    return prompts.filter((prompt) =>
      regex.test(prompt.creator.username) ||
      regex.test(prompt.tag) ||
      regex.test(prompt.prompt)
    )
  }

  // handle search change function
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchResults(searchResult)
      }, 500)
    )
  }

  // handle tag click function
  const handleTagClick = (tag) => {
    // display tag in search field
    setSearchText(tag)

    // filter prompts that have tag matching the selected tag
    const filteredPrompts = filterPrompts(tag)
    setPrompts(filteredPrompts)
  }

  return (
    <section className='feed'>
      {/* search field */}
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

      {/* prompt list */}
      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={prompts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed