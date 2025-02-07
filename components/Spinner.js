'use client'
import { blogContext } from '@/contexts/blogs/Blogstate'
import React, { useContext } from 'react'

const Spinner = () => {
    const {loading} = useContext(blogContext)
  return (
<>{loading && <div className="flex justify-center items-center mt-3">
  <img src="/loading.gif" alt="loading"  />
</div>}</>

  )
}

export default Spinner
