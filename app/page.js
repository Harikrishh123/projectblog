'use client'
import Blogitem from "@/components/Blogitem";
import { blogContext } from "@/contexts/blogs/Blogstate";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {

  const {setlgout, fetchposts , allposts, allsuccess } = useContext(blogContext)
  const router = useRouter()

  const [page, setpage] = useState(1)

  const handlePrevious = (e) =>{
     e.preventDefault()
     setpage(page-1)
     fetchposts(page-1)
  }

  const [user, setuser] = useState(null)

  const handleNext = (e) =>{
    e.preventDefault()
    setpage(page+1)
    fetchposts(page+1)
 }

  useEffect(() => {
    if(!localStorage.getItem("userid")){
      router.push("/login")
      return
    }
    setuser(localStorage.getItem("userid"))
    fetchposts(page)
    setlgout(false)

  }, [])

  return (
  <>
   {!user ? "" :  <>
   <div className="bg-white py-6 sm:py-8 lg:py-12">
   <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

    <div className="mb-10 md:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{allposts.length >0 ? "All blogs" : "No blogs availble" }</h2>

    </div>


    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
       {allposts.length >0 && allposts.map((val) => {
        return <Blogitem key={val._id} {...val}></Blogitem>
       })}
    </div>
  </div>

</div>

{allposts.length >0 && <div   className="bottom-4 left-0 right-0 flex justify-between items-center space-x-4 p-4">
            <button disabled = {page == 1}
        
        onClick={handlePrevious}
                className={`px-9 py-2 rounded-lg  bg-gray-800 text-white hover:bg-gray-600 ${page == 1 ? "opacity-50 cursor-not-allowed" : ""}`} >
                Previous
            </button>
            
            <button disabled = {allsuccess} onClick={handleNext}
            
                className={`px-10 py-2 rounded-lg bg-gray-800 text-white  hover:bg-gray-600 ${allsuccess ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                Next
            </button>
        </div>}
   </>}
  </>
  );
}
