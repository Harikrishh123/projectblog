'use client'
import Blogitem from "@/components/Blogitem";
import { blogContext } from "@/contexts/blogs/Blogstate";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Home() {

  const {fetchposts , myposts , success , setloading, loading} = useContext(blogContext)

  const [page, setpage] = useState(1)

  const handlePrevious = (e) =>{
     e.preventDefault()
     setpage(page-1)
     fetchposts(page-1)
  }

  const handleNext = (e) =>{
    e.preventDefault()
    setpage(page+1)
    fetchposts(page+1)
 }

  useEffect(() => {
    setloading(true)
    fetchposts(page)
    setloading(false)

  }, [])

  return (
<>{!loading &&    <>
   <div className="bg-white py-6 sm:py-8 lg:py-12">
   <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div className="mb-10 md:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{myposts.length >0 ? "Your blogs" : "You did not have any blogs" }</h2>

    </div>


    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
       {myposts.length >0 && myposts.map((val) => {
        return <Blogitem key={val._id} {...val}></Blogitem>
       })}
    </div>
  </div>

</div>

{myposts.length >0 && <div   className="bottom-4 left-0 right-0 flex justify-between items-center space-x-4 p-4">
            <button disabled = {page==1}
        
        onClick={handlePrevious}
                className={`px-9 py-2 rounded-lg  bg-gray-800 text-white hover:bg-gray-600 ${page == 1 ? "opacity-50 cursor-not-allowed" : ""}`} >
                Previous
            </button>
            
            <button onClick={handleNext} disabled = {success}
            
                className={`px-10 py-2 rounded-lg bg-gray-800 text-white  hover:bg-gray-600 ${success ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                Next
            </button>
        </div>}
   </>}</>
  );
}
