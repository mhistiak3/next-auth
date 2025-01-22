/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/config/mongodb.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/utils/mailer";
// conneting to the database
connectDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    // validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // send verification email
    await sendEmail({email, emailType:"VERIFY",userId: newUser._id});

    // send response
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
