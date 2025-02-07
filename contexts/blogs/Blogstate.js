'use client'

import { useRouter } from "next/navigation";
import {createContext, useState} from "react";

const blogContext = createContext();

import React from 'react'


const Blogstate = (props) => {

  const router = useRouter()

  const [lgout, setlgout] = useState(false)
  
  const [allposts, setallposts] = useState([])
  const [myposts, setmyposts] = useState([])

  const [loading, setloading] = useState(false)


  const [success, setsuccess] = useState(false)
  const [allsuccess, setallsuccess] = useState(false)

  const fetchposts = async(page) =>{
    const token = localStorage.getItem('userid')
    if(!token){
        router.push("/login")

    }

    const response = await fetch("/api/blog/fetch", {
      method : "GET",
      headers : {
          "Content-Type": "application/json",
          "authtoken" : token,
          "page": page,
          "value" : 4
      }
  });

  const json = await response.json()
  const mposts = json.myposts
  const aposts = json.allposts
  setallposts(aposts.allposts)
  setmyposts(mposts.posts)
  if(mposts.success) setsuccess(true)
  else setsuccess(false)

  if(aposts.success) setallsuccess(true)
  else setallsuccess(false)
  // console.log(json)

  }

  const createpost = async(title, summary, description, image) =>{
    const token = localStorage.getItem('userid')
    if(!token){
        router.push("/login")

    }

    const response = await fetch("/api/blog/add", {
      method : "POST",
      headers : {
          "Content-Type": "application/json",
          "authtoken" : token,
      },
      body : JSON.stringify({title, summary, description, image})
  });

  const json = await response.json()

  if(json.success){
    
    fetchposts(1)
  }

  return json;

  }

const deletepost = async(id) =>{
  const token = localStorage.getItem('userid')
    if(!token){
        router.push("/login")

    }
  const response = await fetch(`/api/blog/delete/?id=${id}`, {
    method : "DELETE",
    headers : {
        "Content-Type": "application/json",
        "authtoken" : token,
    }
});

const json = await response.json()
await fetchposts(1)

}

async function editpost(title, summary, description, image, id){
  const token = localStorage.getItem('userid')
  if(!token){
      router.push("/login")

  }

  const response = await fetch(`/api/blog/edit/?id=${id}`, {
    method : "PUT",
    headers : {
        "Content-Type": "application/json",
        "authtoken" : token,
    },
    body : JSON.stringify({title, summary, description, image})
});

const json = await response.json()

if(json.success){
  
 await fetchposts(1)
}

return json;

}

const filter = (query) =>{
 
  if(!query){
    fetchposts(1)
  }
  
  else{
    setmyposts(myposts.filter((val) =>{
      return val.title.toLowerCase().includes(query) || val.summary.toLowerCase().includes(query) || val.updatedAt.toLowerCase().includes(query) || val.username.toLowerCase().includes(query)
     
    }))
  
    setallposts(allposts.filter((val) =>{
      return val.title.toLowerCase().includes(query) || val.summary.toLowerCase().includes(query) || val.updatedAt.toLowerCase().includes(query) || val.username.toLowerCase().includes(query)
     
    }))
  }

}


  return (
    <blogContext.Provider value = {{fetchposts, allposts, myposts, loading, setloading, allsuccess, success, lgout, setlgout, createpost, deletepost, editpost, filter}}>
        {props.children}
    </blogContext.Provider>
  )
}

export { Blogstate , blogContext}
