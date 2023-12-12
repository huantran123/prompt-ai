'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  // states
  const [copied, setCopied] = useState('')

  // onclick funtion to copy prompt text
  const handleCopy = () => {
    setCopied(prompt.prompt)
    navigator.clipboard.writeText(prompt.prompt)
    setTimeout(() => setCopied(''), 3000)
  }

  return (
    <div className='prompt_card'>
      {/* card header */}
      <div className='flex justify_between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          {/* user avatar */}
          <Image
            src={prompt.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          {/* creator info */}
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {prompt.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {prompt.creator.email}
            </p>
          </div>
        </div>

        {/* copy button */}
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === prompt.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* prompt content */}
      <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.prompt}</p>

      {/* tag */}
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>
    </div>
  )
}

export default PromptCard