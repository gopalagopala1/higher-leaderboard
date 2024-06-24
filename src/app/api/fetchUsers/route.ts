import { UserData } from "@/app/types/types";
import { fetchUsersByFid } from "@/utils/apis";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  fids: number[];
}

export interface UserRes {
  users: UserData[];
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody: RequestBody = await req.json();
    const fids = reqBody.fids;

    const jsonData = await fetchUsersByFid(fids);
    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return new NextResponse("Failed to fetch leaderboard", { status: 500 });
  }
}
