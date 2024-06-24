import { UserData } from "@/app/types/types";
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

    const fidsString = fids.join("%2C%20");

    const res = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fidsString}`,
      {
        headers: {
          api_key: process.env.NEYNAR_API_KEY!,
        },
      }
    );

    const data: UserRes = await res.json();

    const jsonData = JSON.stringify(data.users);
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
