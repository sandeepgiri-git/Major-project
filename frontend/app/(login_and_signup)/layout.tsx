import React, { ReactNode } from 'react'

const layout = ({children} : {children: ReactNode}) => {
  return (
    <div className='font-sans  bg-gray-50 '>
      {children}
    </div>
  )
}

export default layout
