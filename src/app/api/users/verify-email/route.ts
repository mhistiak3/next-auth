/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/config/mongodb.config";
import User from "@/models/user.model";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

// conneting to the database
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const rawBody = await request.text();
    if (!rawBody) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const body = JSON.parse(rawBody);
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        {
          error: "Token is required",
        },
        { status: 400 }
      );
    }
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
