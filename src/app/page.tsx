import React from 'react'
import Loop from '@/components/loop'
import  HeroSection  from '@/components/hero-section';
import { Footer } from '@/components/globals/footer/footer';
import { Teamates } from '@/components/teamates';
import { Features } from '@/components/feature';
const page = () => {
  return (
    <div>
          <HeroSection />
          <Features />
          <Loop />
          <Teamates/>
          <Footer/>
    </div>
  )
}

export default page
