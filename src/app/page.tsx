import React from 'react'
import Loop from '@/components/loop'
import  HeroSection  from '@/components/hero-section';
import { Footer } from '@/components/globals/footer/footer';
const page = () => {
  return (
    <div>
      <HeroSection/>
          <Loop />
          <Footer/>
    </div>
  )
}

export default page
