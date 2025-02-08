'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { blogContext } from '@/contexts/blogs/Blogstate'
import { alertContext } from '@/contexts/alerts/Alertstate'

const login = () => {

const router = useRouter()
const {setlgout, setloading, loading} = useContext(blogContext)
const {showAlert} = useContext(alertContext)
const [password, setpassword] = useState("")
const [email, setemail] = useState("")

const clickLogin = async(e)=>{
     e.preventDefault();
     setloading(true)
    // console.log(password, email)
    const response = await fetch(`/api/user/login?email=${email}&password=${password}`, {
        method : "GET",
        headers : {
            "Content-Type": "application/json"
        },
    });

    const json = await response.json();

    setloading(false)

    if(json.success){
        localStorage.setItem("userid" , json.authToken);
        router.push("/")
        showAlert("Login successfully.", "success")
        return
    }

    showAlert(`${json.error}.`, "error")
    router.push("/login")
}

useEffect(() => {
   setlgout(true)
}, [])

  return (
<>{!loading &&     <section className="bg-gray-700">
  <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:px-6 lg:px-8" style={{ paddingTop: "80px", paddingBottom: "100px" }}>
  <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
    <img className="w-8 h-8 mr-2" src="/favicon.ico" alt="logo" />
    Postblog
  </Link>
  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700">
    <div className="px-6 py-8 sm:p-10">
      <h1 className="text-xl font-bold text-center text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form onSubmit={clickLogin} className="space-y-4 md:space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 text-gray-900 bg-gray-50 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 text-gray-900 bg-gray-50 border rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          Sign in
        </button>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>
</section>}</>
  )
}

export default login
