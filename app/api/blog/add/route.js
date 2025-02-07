import { NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode";
import connectdb from "@/db/connectdb";
import User from "@/dbmodels/User";
import Blog from "@/dbmodels/Blog";


export async function POST( request){
    
    try {
    await connectdb()
    const token = request.headers.get("authtoken")
    if(!token){
        return NextResponse.json({error : "Invalid Authentication!"})
    }
    const data = jwtDecode(token);

    const userdetails = await User.findById(data.user.id)

    // console.log(name)

    const details = await request.json()

    const {title, summary, description, image} = details
    // return NextResponse.json(details)
    let errors = [];

    if (!details.title || typeof details.title !== "string" || details.title.trim().length < 10) {
        errors.push({ param: "title", msg: "Title must be at least 10 characters long" });
    }

    if (!details.summary || typeof details.summary !== "string" || details.summary.trim().length < 20) {
        errors.push({ param: "summary", msg: "Summary must be at least 20 characters long" });
    }

    if (!details.description || typeof details.description !== "string" || details.description.trim().length < 25) {
        errors.push({ param: "description", msg: "Description must be at least 20 characters long" });
    }

    

    if (errors.length > 0) {
        return NextResponse.json({ error : errors[0].msg }, { status: 400 });
    }
    
    const username = userdetails.name
    console.log(username)
    let post = new Blog({user : data.user.id ,username, title, summary, description, image})
    await post.save()

    return NextResponse.json({status : 200, success : true, post})
        
    } catch (error) {
        return NextResponse.json({status : 502 , error : error.message})
    }


    
}