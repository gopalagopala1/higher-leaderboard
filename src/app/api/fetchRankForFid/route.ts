import { fetchRankByFid } from "@/utils/apis";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  fid: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody: RequestBody = await req.json();
    const fid = reqBody.fid as string;

    const jsonData = await fetchRankByFid(fid);

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
