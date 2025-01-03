import React from 'react'
import Loop from '@/components/loop'
import  HeroSection  from '@/components/hero-section';
import { Footer } from '@/components/globals/footer/footer';
import { Teamates } from '@/components/teamates';
const page = () => {
  return (
    <div>
      <HeroSection/>
          <Loop />
          <Teamates/>
          <Footer/>
    </div>
  )
}

export default page
