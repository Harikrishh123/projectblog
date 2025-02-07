'use client'
import React, { useContext, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import app from '@/components/Firebase'
import { blogContext } from '@/contexts/blogs/Blogstate'
import { alertContext } from '@/contexts/alerts/Alertstate'

const create = () => {
    
    const {createpost, setloading, loading} = useContext(blogContext)
    const {showAlert} = useContext(alertContext)
    const [details, setdetails] = useState({
        title : "",
        summary : "",
        description : ""
    })

    const [imageurl, setimageurl] = useState("")

    const onchange = (e) =>{
        setdetails({...details, [e.target.name]: e.target.value})
    }

    const onClickcreate = async(e) =>{
        e.preventDefault()
        
        
        const storage = getStorage(app)
        if(imageurl === ""){
               showAlert("Image should be choosen.", "error")
               return;
        }
        setloading(true)
        const storageRef = ref(storage, "images/" + imageurl.name)
        await uploadBytes(storageRef, imageurl)
      
        const image = await getDownloadURL(storageRef)

        const {title , summary, description} = details
        
        const json = await createpost(title, summary, description, image)
        setloading(false)

        // console.log(json)

        if(json.success){
            setdetails({
                title : "",
                summary : "",
                description : ""
            })
         showAlert("Created successfully.", "success")
        }
        else{
            showAlert(`${json.error}.`, "error")
            
        }
        
        
    }

  return (
<>{!loading &&     <section className=" bg-gray-700">
        <div className="bg-white h-1 opacity-10">
        </div>
  <div className="flex flex-col items-center justify-center px-6 pb-8 mx-auto md:h-screen lg:py-0 "  >
    
      <div className="container w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 pb-4 pt-4 md:pb-6 md:pt-6">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Your Blog
              </h1>
              <form onSubmit={onClickcreate} className="space-y-4 md:space-y-6" >
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
                 
                  
                  <button type="submit" className="w-full text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create the blog</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>}</>
  )
}

export default create
