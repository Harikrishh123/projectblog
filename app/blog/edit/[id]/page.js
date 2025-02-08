'use client'
import { alertContext } from '@/contexts/alerts/Alertstate'
import { blogContext } from '@/contexts/blogs/Blogstate'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const edit = () => {
   
    const {editpost, setloading, loading} = useContext(blogContext)
    const {showAlert} = useContext(alertContext)
   const [details, setdetails] = useState({
    title : "",
    summary : "",
    description : ""
   })
   
   const params = useParams()
   const router = useRouter()
   const [oldimage, setoldimage] = useState(null)

   const [imageurl, setimageurl] = useState("")

    const onclickedit = async(e) =>{
            e.preventDefault()
            let image = oldimage
            const {title, summary, description} = details
            
            setloading(true)
            if(imageurl !== ""){
             const storageRef = ref(storage, "images/" + imageurl.name)
            await uploadBytes(storageRef, imageurl)
                      
             image = await getDownloadURL(storageRef)
            }

            const json = await editpost(title, summary, description, image, params.id )
            setloading(false)

            if(json.success){
                // console.log(json)
                router.push(`/read/${params.id}`)
                showAlert("Edited successfully", "success")
                return;
            }
            else{
                showAlert(`${json.error}.`, "error")
            }
    }

    const onchange = (e) =>{
        e.preventDefault();
        setdetails({...details, [e.target.name] : e.target.value})
    }

    useEffect(() => {
        fetch(`/api/blog/postdata?id=${params.id}`,{
            method : "GET",
          headers : {
              "Content-Type": "application/json"
          }
          }).then(response => {
              
              response.json().then(post => {
                
                setdetails({
                    title : post.post.title,
                    description : post.post.description,
                    summary : post.post.summary
                })
    
                setoldimage(post.post.image)
 
              })
              
          })
    }, [])

  return (
<>{!loading &&     <section className="bg-gray-700">
        <div className="bg-white h-1 opacity-10">
        </div>
  <div className="flex flex-col items-center justify-center px-6 pb-10 mx-auto md:h-screen lg:py-0 "  >
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Your Blog
              </h1>
              <form onSubmit={onclickedit} className="space-y-4 md:space-y-6" >
              <div>
                      <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the title :</label>
                      <input type="text"  name="title" id="title" placeholder="title (Minimum of length 10)" onChange={onchange} value={details.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                      <label htmlFor="summary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the summary :</label>
                      <input type="exts" name="summary" id="summary" onChange={onchange} value={details.summary} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the summary text (Minimum of length 20)" required=""/>
                  </div>
                  <div>
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the description:</label>
                      <textarea rows="5" name="description" id="description" onChange={onchange} value={details.description} placeholder="Leave a description (Minimum of length 25)" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an image for your blog :</label>
                      <input type="file" name="image" id="image" onChange={(e) => setimageurl(e.target.files[0])} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      <span className='block mb-2 text-sm font-medium text-gray-500 '>Only choose .jpg/.jpeg/.png files</span>
                  </div>
                 
                  
                  <button type="submit" className="w-full text-gray-900 dark:text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Edit the blog</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>}</>
  )
}

export default edit
