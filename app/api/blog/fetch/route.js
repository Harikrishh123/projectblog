import { NextResponse } from "next/server"
import connectdb from "@/db/connectdb";
import Blog from "@/dbmodels/Blog";
import { jwtDecode } from "jwt-decode";

export async function GET( request){
    
    try {
    await connectdb()
     const token = request.headers.get("authtoken")
     if(!token){
         return NextResponse.json({error : "Invalid Authentication!"})
     }
     const data = jwtDecode(token);
     const user = data.user.id   

     let posts = await Blog.find({user : user}).sort({updatedAt: -1});
     let allposts = await Blog.find().sort({updatedAt : -1})

     const value = request.headers.get("value")
     const page = request.headers.get("page")

     let len1 = posts.length
     let len2 = allposts.length

    const st = (page-1)*value
    const end = page*value

    posts = posts.slice(st, end)
    allposts = allposts.slice(st, end)
    
    let success = false
    let allsuccess = false

    if(end >= len1) success = true
    if(end >= len2) allsuccess = true
    return NextResponse.json({ success : true, myposts : {posts, success : success} , allposts : {allposts , success : allsuccess}})
        
    } catch (error) {
        return NextResponse.json({status : 502 , error : error.message})
    }    
}