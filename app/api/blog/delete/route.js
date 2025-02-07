import { NextResponse } from "next/server"
import connectdb from "@/db/connectdb";
import Blog from "@/dbmodels/Blog";


export async function DELETE( request){
    
    try {
    await connectdb()
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") ;

    if(!id) return NextResponse.json({error : "No blog found!"})

    const post = await Blog.findByIdAndDelete(id)
    
    return NextResponse.json({status : 200, success : true, post})
        
    } catch (error) {
        return NextResponse.json({status : 502 , error : error.message})
    }


    
}