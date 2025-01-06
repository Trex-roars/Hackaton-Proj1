import ChatGPTInbox from '@/components/Dashboard/chat-gpt'
import { VideoShowcase } from '@/components/Dashboard/video-showcase'
import React from 'react'

function page() {
  return (
      <>
          <VideoShowcase/>
          <ChatGPTInbox/>
      </>
  )
}

export default page
