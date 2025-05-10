import React from 'react'

const Hero = () => {
  return (
    <div className='h-[75vh] flex-col  '>
    <div className='items-start justify-center'><h1 className='w- 3/4 text-5xl font-semibold text-yellow-200  '>Discover Your Next Great Read</h1> <p className='text-balance text-white'>Uncover captivating stories,enriching knowledge, and endless inspiration in our curated collection of books</p>
    <div className='mt-4'>
      <button  className='text-l border font-semibold border-yellow-300 rounded-full px-5 py-3 hover:bg-zinc-800'>Discover Books</button>
    </div>
    </div>
    <div className='w-3/4 '> </div>
    </div>
  )
}

export default Hero
