/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/config/mongodb.config";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/tokenHandler";
// conneting to the database
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    // get userId
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // get user
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
   return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
