/* eslint-disable @next/next/no-img-element */
//@ts-nocheck

import { fetchRankByFid, fetchUsersByFid } from "@/utils/apis";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { url } = request;
  const { searchParams } = new URL(url);
  const fid = searchParams.get("fid");
  const userData = JSON.parse(
    (await fetchUsersByFid([parseInt(fid)])) ?? "[]"
  )?.[0];
  const userRank = JSON.parse((await fetchRankByFid(fid)) ?? "[]")?.[0];

  console.log("user data:", userData);
  console.log("user rank: ", userRank);

  const imageData = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/frame/frame-background2.png`
  ).then((res) => res.arrayBuffer());

  const titleImage = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/frame/title3.png`
  ).then((res) => res.arrayBuffer());

  const logoImage = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/frame/frame-logo.png`
  ).then((res) => res.arrayBuffer());

  const repliesImage = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/frame/replies.png`
  ).then((res) => res.arrayBuffer());

  const likesImage = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/frame/likes.png`
  ).then((res) => res.arrayBuffer());

  const noRankImage = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/frame/no-rank.png`
  ).then((res) => res.arrayBuffer());

  const SoraBold = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Sora-SemiBold.ttf`
  ).then((res) => res.arrayBuffer());

  const SoraRegular = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Sora-Regular.ttf`
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <img src={imageData} alt="higher-rank" style={{ objectFit: "cover" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={titleImage}
            width="150px"
            height="30px"
            alt="higher-title"
            style={{ marginBottom: "30px", marginRight: "20px" }}
          />

          <div
            style={{
              display: "flex",
              width: "570px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "600",
              marginBottom: "30px",
            }}
          >
            <img
              src={userRank ? userData?.pfp_url : noRankImage}
              width="45"
              height="45"
              alt="user-profile"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
              }}
            ></img>

            <div
              style={{ display: "flex", marginTop: "6px", color: "#FEFAE0" }}
            >
              @{userData?.username}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "6px",
                color: "#FEFAE0",
                fontFamily: "SoraRegular",
              }}
            >
              {userRank ? (
                <>
                  Engagement Score in /higher :
                  <strong
                    style={{
                      color: "#1F701F",
                      marginLeft: "2px",
                      fontFamily: "SoraBold",
                    }}
                  >
                    {userRank?.Engagement_Score?.toFixed(2)} (#
                    {userRank?.rank || "0"})
                  </strong>
                </>
              ) : (
                <>
                  Oh no! Looks like you need to go Higher :{" "}
                  <strong
                    style={{
                      color: "#1F701F",
                      marginLeft: "2px",
                      fontFamily: "SoraBold",
                    }}
                  >
                    0{" "}
                  </strong>
                </>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "450px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "36px",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#FEFAE0",
                borderRadius: "5px",
                backgroundColor: "#1F701F",
                fontFamily: "SoraRegular",
                width: "140px",
                height: "36px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={likesImage}
                  width="16"
                  height="16"
                  alt="user-likes"
                ></img>
              </div>
              <p style={{ paddingRight: "4px", paddingLeft: "4px" }}>
                Likes: {userRank?.count_likes || "0"}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                color: "#FEFAE0",
                borderRadius: "5px",
                backgroundColor: "#1F701F",
                fontFamily: "SoraRegular",
                width: "140px",
                height: "36px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={logoImage}
                  width="16"
                  height="16"
                  alt="user-re-casts"
                ></img>
              </div>
              <p style={{ paddingRight: "4px", paddingLeft: "4px" }}>
                Re-casts: {userRank?.count_recasts || "0"}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                color: "#FEFAE0",
                borderRadius: "5px",
                backgroundColor: "#1F701F",
                fontFamily: "SoraRegular",
                width: "140px",
                height: "36px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={repliesImage}
                  width="16"
                  height="16"
                  alt="user-replies"
                ></img>
              </div>
              <p style={{ paddingRight: "4px", paddingLeft: "4px" }}>
                Replies: {userRank?.count_replies || "0"}
              </p>
            </div>
          </div>
        </div>
      </img>
    ),
    {
      width: 570,
      height: 305,
      fonts: [
        { data: SoraBold, style: "normal", weight: 600, name: "Sora" },
        {
          data: SoraRegular,
          style: "normal",
          weight: 400,
          name: "SoraRegular",
        },
      ],
    }
  );
}
