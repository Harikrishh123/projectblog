import { NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode";
import connectdb from "@/db/connectdb";
import Blog from "@/dbmodels/Blog";


export async function PUT( request){
    
    try {
    await connectdb()
    const token = request.headers.get("authtoken")
    if(!token){
        return NextResponse.json({error : "Invalid Authentication!"})
    }
    const data = jwtDecode(token);
    const user = data.user.id

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") ;

    const oldpost = await Blog.findById(id)
    
    if(!oldpost) return NextResponse.json({error : "No post found"})
    if(user !== oldpost.user.toString()) return NextResponse.json({error : "User mismatched!"})
    

    const details = await request.json()
    
    
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

    if(details.image === "") details.image = oldpost.image

    const newBlog = {
        title : details.title,
        summary : details.summary,
        description : details.description,
        image : details.image
    }

    let newPost = await Blog.findByIdAndUpdate(oldpost, {$set : newBlog}, {new : true})
    
    return NextResponse.json({status : 200, success : true, newPost})
        
    } catch (error) {
        return NextResponse.json({status : 502 , error : error.message})
    }


    
}