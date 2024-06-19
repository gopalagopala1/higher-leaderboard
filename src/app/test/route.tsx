//@ts-nocheck

import { fetchData } from "@/utils/data";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);

  const leaderboardData = fetchData();

  // const imageData = await fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/images/background.png`
  // ).then((res) => res.arrayBuffer());

  // const fontData = await fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Kreadon-Demi.ttf`
  // ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "100vh",
          padding: "16px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "1120px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#FEFAE0",
                }}
              >
                HIGHERBOARD
              </h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowX: "auto",
              backgroundColor: "black",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <table
              style={{
                width: "100%",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              <thead style={{ color: "black" }}>
                <tr style={{ backgroundColor: "#16a34a" }}>
                  {[
                    "Rank",
                    "User",
                    "Member Since",
                    "Casts",
                    "Recasts",
                    "Likes",
                    "Replies",
                    "Top Casts",
                  ].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: "32px 16px",
                        borderBottom: "1px solid #1a1a1a",
                        borderRight: "1px solid #1a1a1a",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{}}>
                {leaderboardData.map((entry, index) => (
                  <tr key={index}>
                    {[
                      "rank",
                      "user",
                      "memberSince",
                      "casts",
                      "recasts",
                      "likes",
                      "replies",
                    ].map((field) => (
                      <td
                        key={field}
                        style={{
                          padding: "32px 40px",
                          borderRight: "1px solid #1a1a1a",
                          textAlign: "center",
                        }}
                      >
                        {entry[field]}
                      </td>
                    ))}
                    <td
                      style={{
                        padding: "32px 16px",
                        textAlign: "center",
                      }}
                    >
                      <a
                        href="#"
                        style={{
                          color: "#38bdf8",
                          textDecoration: "underline",
                        }}
                      >
                        {entry.topCasts}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "40px",
            }}
          ></div>
        </div>
      </div>
    )
  );
}
