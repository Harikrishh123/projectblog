import connectdb from "@/db/connectdb";
import User from "@/dbmodels/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { body, checkSchema, validationResult } from "express-validator";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

export async function POST(req){
    

    try {
        
    let data = await req.json()
    let errors = [];

        if (!data.name || typeof data.name !== "string" || data.name.trim().length < 3) {
            errors.push({ param: "name", msg: "Name must be at least 3 characters long" });
        }

        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.push({ param: "email", msg: "Invalid email format" });
        }

        if (!data.password || typeof data.password !== "string" || data.password.trim().length < 8) {
            errors.push({ param: "password", msg: "password must be at least 8 characters long" });
        }

        if (errors.length > 0) {
            return NextResponse.json({ error : errors[0].msg }, { status: 400 });
        }

    await connectdb();
    let u = await User.findOne({email : data.email})
    let success = false
    if(u){
        return NextResponse.json({status : 502 , error : "User already exists!" , success : success})
    }

    if(data.password !== data.repassword){
        return NextResponse.json({status : 502 , error : "Passwords mismatch, please renter.", success : success})
    }
    const {name , email , password, repassword} = data
    const salt = await bcrypt.genSalt(13);
    const secPassword = await bcrypt.hash(password, salt)
    let newUser = new User({name, email, password : secPassword, repassword : secPassword})

    await newUser.save();
    const JWT_SECRET = "thisisforblog"
         data = {
            user : {
                id : newUser._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

    return NextResponse.json({success : true , authToken})
    } catch (error) {
        return NextResponse.json({status : 502, error : error.message})
    }
    
}