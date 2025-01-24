/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/config/mongodb.config";
import {  NextResponse } from "next/server";

// conneting to the database
connectDB();

export const GET = async () => {
  try {
    const response = NextResponse.json({
        message:'Logout Success'
    })
    response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0)
    })
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
};
