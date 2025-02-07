'use client'
import { useParams , useRouter} from 'next/navigation'
import React, {  useContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { blogContext } from '@/contexts/blogs/Blogstate';
import Link from 'next/link';
import { alertContext } from '@/contexts/alerts/Alertstate';
const read = () => {
     
    const {deletepost, setloading, loading} = useContext(blogContext)
    const {showAlert} = useContext(alertContext)

    const [details, setdetails] = useState({
        title : "",
        username : "",
        user : "",
        description : "",
        updated : ""
    })

    const [image, setimage] = useState(null)


    const [currentuser, setcurrentuser] = useState("")
    const params = useParams()
    const router = useRouter()
    
    const deletepst = () =>{
             deletepost(params.id)
             showAlert("Delted Successfully.", "success")
             router.push("/myblog")
    }

    useEffect(() => {
      setloading(true)
       fetch(`/api/blog/postdata?id=${params.id}`,{
        method : "GET",
      headers : {
          "Content-Type": "application/json"
      }
      }).then(response => {
          
          response.json().then(post => {
            
            setdetails({
                title : post.post.title,
                username : post.post.username,
                description : post.post.description,
                updated : post.post.updatedAt,
                user : post.post.user
            })

            setimage(post.post.image)
            // console.log(image)
            //   console.log(post)
          })
          
      })
      setloading(false)
      const token = localStorage.getItem('userid')
      const data = jwtDecode(token);
      setcurrentuser(data.user.id)
      // eslint-disable-next-line 
    }, [])
    
  return (
<>{!loading &&     <section className="py-24 relative">
<div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
  <div className="w-full justify-start items-center gap-9 flex flex-col-reverse lg:flex-row">

    <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
      <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
        <h3 className="text-gray-900 text-3xl font-bold font-manrope leading-normal lg:text-start text-center">
          {details.title}
        </h3>
        <div>
          <span className="block text-indigo-500">
             <span className="text-indigo-500">{details.username}</span>
          </span>
          <span className="block text-sm text-gray-400">Lat updated: {new Date(details.updated).toLocaleDateString('en-us', {  day:"numeric", month:"short", year:"numeric"})}</span>
        </div>
        <p className="text-gray-600 text-base font-normal leading-relaxed lg:text-start text-center">
          {details.description}
        </p>
      </div>
     {details.user === currentuser ?  <div className="flex">
        <Link href={`/blog/edit/${params.id}`} className="sm:w-fit w-full px-3.5 py-2 m-2 bg-gray-600 hover:bg-gray-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
          <span className="px-1.5 text-white text-sm font-medium leading-6">Edit</span>
        </Link>
        <button onClick={deletepst} className="sm:w-fit w-full px-3.5 py-2 m-2 bg-red-600 hover:bg-red-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
          <span className="px-1.5 text-white text-sm font-medium leading-6">Delete</span>
        </button>
      </div> : ""}
    </div>
    <img
      className="lg:mx-0 mx-auto h-full rounded-3xl object-cover"
      src={`${image}`}
      alt="about Us image"
    />
  </div>
</div>

</section>}</>
                                        
  )
}

export default read
