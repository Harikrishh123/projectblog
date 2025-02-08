"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { alertContext } from '@/contexts/alerts/Alertstate'
import { blogContext } from '@/contexts/blogs/Blogstate'


const page = () => {

const {showAlert} = useContext(alertContext)

const {setloading, loading} = useContext(blogContext)

const [details, setdetails] = useState({
    name : "",
    email : "",
    password : "",
    repassword : ""
})  

const onchange = (e) =>{
    setdetails({...details, [e.target.name] : e.target.value})
}
const router = useRouter()
const clickRegister = async(e) =>{
    e.preventDefault()

       const {name , email , password , repassword} = details
       setloading(true)
       const repsone = await fetch("/api/user/register", {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({name, email, password, repassword})
    });

    const json = await repsone.json();

    setloading(false)
    
    if(json.success){
        // console.log(json)
        router.push('/login')
        showAlert("Registered successfully.", "success")
        return;
    }
    setdetails({
        name : "",
        email : "",
        password : "",
        repassword : ""
    })
    router.push("/signup")
    showAlert(`${json.error}.`, "error")
   

}

  return (
<>
{!loading &&    <section className="bg-gray-700">
        <div className="bg-white h-1 opacity-10">
        </div>
  <div className="flex flex-col items-center justify-center px-6 pb-10 mx-auto md:h-screen lg:py-0 " style={{ paddingTop: "80px", paddingBottom: "100px" }} >
      <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="/favicon.ico" alt="logo"/>
          Postblog      
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form onSubmit={clickRegister} className="space-y-4 md:space-y-6" >
              <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text"  name="name" id="name" placeholder="Username" onChange={onchange} value={details.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" onChange={onchange} value={details.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" onChange={onchange} value={details.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label htmlFor="repassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="repassword" id="repassword" onChange={onchange} value={details.repassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                 
                  
                  <button type="submit" className="w-full text-gray-900 dark:text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>}
</>
  )
}

export default page
