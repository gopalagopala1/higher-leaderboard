import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const fid = req.nextUrl.searchParams.get("fid");
    console.log("fid: ", fid);
    const response = await fetch(
      `https://api.dune.com/api/v1/query/3850728/results?fid=${fid}`,
      {
        headers: {
          "X-Dune-API-Key": process.env.DUNE_API_KEY!,
        },
      }
    );
    const data = await response.json();

    const jsonData = JSON.stringify(data.result.rows);
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
