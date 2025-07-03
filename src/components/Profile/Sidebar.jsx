import React from 'react'

const Sidebar = ({data}) => {
  return (
    <div>
      <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-center'>Sidebar</div>
<img
  src={data.avatar}
  alt="avatar"

  className="h-[10vh] w-[10vh] object-cover rounded-full mt-2 border-2 border-white"
/>
 

      </div>
  )
}

export default Sidebar
