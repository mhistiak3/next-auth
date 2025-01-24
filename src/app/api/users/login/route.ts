/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/config/mongodb.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// conneting to the database
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const rawBody = await request.text();
    if (!rawBody) {
      return NextResponse.json(
        {
          error: "Request body is required",
        },
        { status: 400 }
      );
    }
    const body = JSON.parse(rawBody);
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        {
          error: "Username and Password are requerd",
        },
        { status: 400 }
      );
    }

    // user check
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        {
          error: "This user is not exist",
        },
        { status: 400 }
      );
    }

    // password check
    const isValidPassword = bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "password is incorrect",
        },
        { status: 400 }
      );
    }

    // create token
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "7d",
    });
    const response = NextResponse.json({
      message: "Login Success",
      success: true,
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
  } catch (error: any) {
    NextResponse.json({ error: error.message });
  }
};
