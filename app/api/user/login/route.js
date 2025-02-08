import connectdb from "@/db/connectdb";
import User from "@/dbmodels/User";
import { NextResponse } from "next/server";
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken")

export async function GET(req){
        try {
        await connectdb()
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email") ;
        const password = searchParams.get("password") ;

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({error : "Invalid email format", status : 402})
        }

    const user = await User.findOne({email : email})

    if(!user){
        return NextResponse.json({success : false, status : 403 , error : "User doesn't exist. Please register!"})
        
    }

    const compare = await bcrypt.compare(password, user.password);
    if(!compare){
        return NextResponse.json({staus : 402, error : "Incorrect password!"})
    }
    const JWT_SECRET = "thisisforblog"
        const data = {
            user : {
                id : user._id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET )

       

        return NextResponse.json({success : true, authToken, name : user.name})

    } catch (error) {
        return NextResponse.json({status : 502, error : error.message})
    }

}