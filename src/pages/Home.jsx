import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from './RecentlyAdded'

const Home = () => {
  return (
    <div className='bg-zinc-600 text-white px-10 py-8'>
      <Hero/>
      <RecentlyAdded/>
    </div>
  )
}

export default Home
