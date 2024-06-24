//@ts-nocheck

import { ImageResponse } from "next/og";
import { Rank, UserData } from "../types/types";

export async function GET(request: Request) {
  // const userData: UserData = localStorage.getItem("userData");
  // const userRank: Rank = localStorage.getItem("userRank");

  const { searchParams } = new URL(request.url);
  const tokenId = searchParams.get("fid");

  const dummyUserData = {
    username: "lght.eth",
    pfp_url:
      "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/50014c99-3420-4bbf-b8d0-f0b40b6d0600/rectcrop3",
  };

  const dummyUserRank = {
    count_likes: 100,
    count_recasts: 100,
    count_replies: 200,
    Engagement_Score: 500,
    rank: 2,
  };

  const imageData = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/frame/frame-background.png`
  ).then((res) => res.arrayBuffer());

  const logoImage = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/images/frame/frame-logo.png`
  ).then((res) => res.arrayBuffer());

  const SoraBold = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Sora-SemiBold.ttf`
  ).then((res) => res.arrayBuffer());

  const SoraRegular = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/Sora-Regular.ttf`
  ).then((res) => res.arrayBuffer());

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
        {/* @ts-ignore */}
        <img
          src={imageData}
          width="570"
          height="305"
          alt="higher-rank"
          style={{ objectFit: "cover" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/*place for user image*/}

            <div
              style={{
                display: "flex",
                width: "570px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                top: "90",
                fontWeight: "600",
              }}
            >
              <img
                src={dummyUserData.pfp_url}
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
                @{tokenId}
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
                Engagement Score in /higher :
                <strong
                  style={{
                    color: "#1F701F",
                    marginLeft: "2px",
                  }}
                >
                  {dummyUserRank.Engagement_Score} (#
                  {dummyUserRank.rank})
                </strong>
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
                top: "130px",
                left: "60px",
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
                <div style={{ display: "flex", paddingRight: "8px" }}>
                  <img
                    src={logoImage}
                    width="16"
                    height="16"
                    alt="user-profile"
                    style={{
                      objectFit: "cover",
                    }}
                  ></img>
                </div>
                Likes: {dummyUserRank.count_likes}
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
                <div style={{ display: "flex", paddingRight: "8px" }}>
                  <img
                    src={logoImage}
                    width="16"
                    height="16"
                    alt="user-profile"
                    style={{
                      objectFit: "cover",
                    }}
                  ></img>
                </div>
                Re-casts: {dummyUserRank.count_recasts}
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
                <div style={{ display: "flex", paddingRight: "8px" }}>
                  <img
                    src={logoImage}
                    width="16"
                    height="16"
                    alt="user-profile"
                    style={{
                      objectFit: "cover",
                    }}
                  ></img>
                </div>
                Replies: {dummyUserRank.count_replies}
              </div>
            </div>
          </div>
        </img>
      </div>
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
