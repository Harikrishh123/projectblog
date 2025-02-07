'use client'
import Blogitem from '@/components/Blogitem'
import { blogContext } from '@/contexts/blogs/Blogstate'
import React, { useContext } from 'react'

const search = () => {

    const {myposts} = useContext(blogContext)
    

  return (
    <>
    { <>
    <div className="bg-white py-6 sm:py-8 lg:py-12">
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
 
     <div className="mb-10 md:mb-16">
       <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{myposts.length >0 ? "Searched blogs" : "No blogs availble for the given search query" }</h2>
 
     </div>
 
 
     <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {myposts.length >0 && myposts.map((val) => {
         return <Blogitem key={val._id} {...val}></Blogitem>
        })}
     </div>
   </div>
 
 </div>
 </>}
 
   </>
  )
}

export default search
