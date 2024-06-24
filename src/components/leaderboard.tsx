"use client";
import { Rank, UserData } from "@/app/types/types";
import {
  AuthKitProvider,
  SignInButton,
  StatusAPIResponse,
} from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import localFont from "next/font/local";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaShareFromSquare } from "react-icons/fa6";

const kreadonDemi = localFont({
  src: "../../public/fonts/Kreadon-Demi.ttf",
});

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState<Rank[]>([]);
  const [leadData, setLeadData] = useState<Rank[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loggedInUserRank, setLoggedInUserRank] = useState<Rank>();
  const [loggedInUserData, setLoggedInUserData] = useState<Partial<UserData>>();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [fid, setFid] = useState<number>();
  const [loading, setLoading] = useState<boolean>();
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchUsers = async (fids: number[]) => {
    const response = await fetch(`/api/fetchUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fids }),
    });
    const data: UserData[] = await response.json();
    setUsers((prevUsers) => [...prevUsers, ...data]);
  };

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      setLoading(true);
      const response = await fetch(`/api/fetchLeaderBoard`, {
        method: "GET",
      });

      const data: Rank[] = await response.json();
      setLeadData(data);
      setLoading(false);
    };

    if (leadData.length === 0) {
      fetchLeaderBoard();
    }
  }, [leadData.length]);

  useEffect(() => {
    setLoading(true);
    if (leadData.length === 0) {
      console.error("Data array is empty");
      return;
    }

    const ranksPerPage = parseInt(process.env.NEXT_POST_PER_PAGE || "15");

    const indexOfLastPost = currentPage * ranksPerPage;
    const indexOfFirstPost = indexOfLastPost - ranksPerPage;
    const currentRanks = leadData.slice(indexOfFirstPost, indexOfLastPost);

    setDisplayData((prevRanks) => [...prevRanks, ...currentRanks]);

    const fids = currentRanks
      .filter(
        (post): post is Rank =>
          post !== null && typeof post === "object" && "fid" in post
      )
      .map((post) => post.fid);

    if (fids.length === 0) {
      console.error("No valid fids found in the current posts");
      return;
    }

    fetchUsers(fids);
    setLoading(false);
  }, [leadData, currentPage]);

  useEffect(() => {
    const statsForFid = async () => {
      let userRank: Rank[];
      try {
        const response = await fetch(`/api/fetchRankForFid?fid=${fid}`, {
          method: "GET",
        });
        // calculate rank of the user
        userRank = await response.json();
      } catch (error) {
        console.error("error occurred while fetching user rank", error);
      }

      localStorage.setItem("userRank", JSON.stringify(userRank!?.[0]));
      setLoggedInUserRank((prevRank) => userRank?.[0]);
    };

    if (isAuthenticated) {
      statsForFid();
    }
  }, [isAuthenticated, fid]);

  //TODO: update this
  const config = {
    // For a production app, replace this with an Optimism Mainnet
    // RPC URL from a provider like Alchemy or Infura.
    rpcUrl: "https://mainnet.optimism.io",
    domain: "example.com",
    siweUri: "https://example.com/login",
  };

  /**
   * useCallback is required because function is being passed to
   * child component and will be called on every re-render if useCallback
   * is not used
   */
  const onSignInSuccess = useCallback((res: StatusAPIResponse) => {
    if (res.state === "completed") {
      setAuthenticated(true);
      const userData: Partial<UserData> = {
        fid: res.fid as number,
        custody_address: res.custody as `0x${string}`,
        username: res.username as string,
        display_name: res.displayName as string,
        pfp_url: res.pfpUrl as string,
        follower_count: 0,
        following_count: 0,
        verifications: [],
      };
      setFid(res.fid);
      setLoggedInUserData(userData);

      // store logged in user data in local storage to access it in frames
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, []);

  const onSignOut = useCallback(() => {
    setAuthenticated(false);
  }, []);

  const navigateToUserProfile = (username: string) => {
    const navUrl = `https://warpcast.com/${username}`;
    window.open(navUrl, "_blank");
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  const onComposeFrame = () => {
    const userData = {
      username: loggedInUserData?.username,
      pfp_url: loggedInUserData?.pfp_url,
      Engagement_Score: loggedInUserRank?.Engagement_Score.toFixed(2),
      count_likes: loggedInUserRank?.count_likes,
      count_recast: loggedInUserRank?.count_recasts,
      count_replies: loggedInUserRank?.count_replies,
      rank: loggedInUserRank?.rank,
    };

    document.cookie = JSON.stringify(userData);

    const url = `https://warpcast.com/~/compose?text=Hello%20World%20&embeds[]=${
      process.env.NEXT_PUBLIC_SITE_URL
    }/api/frame/${JSON.stringify(loggedInUserData?.fid)}`;
    window.open(url, "_blank");
  };

  return (
    <AuthKitProvider config={config}>
      <div className=" text-white max-h-screen p-4 md:text-xs lg:text-base">
        <div className="flex space-x-4 mb-8 justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/Vector.png"
              alt="logo"
              width={50}
              height={40}
              style={{ height: "50px" }}
            />
            <h1 className="text-4xl font-bold text-[#FEFAE0]">HIGHERBOARD</h1>
          </div>

          <div className="flex space-x-4">
            {isAuthenticated && loggedInUserData && (
              <button
                className="bg-[#0C8B38] text-[#FEFAE0] max-h-[34px] px-4 flex justify-center items-center"
                onClick={onComposeFrame}
              >
                <div className="mr-1">
                  <FaShareFromSquare color="white" size={16} />
                </div>
                Share Your Rank
              </button>
            )}
            <div className="sign-in-button" id="sign-in">
              <SignInButton onSuccess={onSignInSuccess} onSignOut={onSignOut} />
            </div>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-0 bg-[#0C8B38]  text-center border border-[#FEFAE0] ${kreadonDemi.className}`}
        >
          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-[#FEFAE0] px-2 lg:px-6">
            Rank
          </div>
          <div className="col-span-1 md:col-span-3 md:border-r py-2 md:py-6 border-[#FEFAE0] px-2 lg:px-6 ">
            User
          </div>

          {/* <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-black px-2 lg:px-6 ">
            Casts
          </div> */}
          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-[#FEFAE0] px-2 lg:px-6 ">
            Likes
          </div>
          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-[#FEFAE0] px-2 lg:px-6 ">
            Recasts
          </div>
          <div className="col-span-1 md:col-span-1 md:border-r py-2 md:py-6 border-[#FEFAE0] px-2 lg:px-6 ">
            Replies
          </div>
          <div className="col-span-1 md:col-span-2 md:border-r py-2 md:py-6 border-[#FEFAE0] px-2 lg:px-6 ">
            Total Engagement
          </div>
          <div className="col-span-1 md:col-span-3 py-2 md:py-6">
            Engagement Score
          </div>
        </div>
        <div
          className={`max-h-[calc(100vh-560px)] md:max-h-[calc(100vh-300px)] bg-[#1E1E1E] overflow-y-auto no-scrollbar ${kreadonDemi.className} border-[0.01px] border-t-0 border-[#FEFAE0] border-opacity-50`}
          ref={containerRef}
        >
          {users.length === 0 || leadData.length === 0 ? (
            <p className="text-[#FEFAE0] text-2xl font-medium p-6 text-center w-full">
              Loading...
            </p>
          ) : (
            <>
              {displayData &&
                displayData.length > 0 &&
                displayData.map((item, index) => {
                  const userData: UserData = users[index];

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-y-0 text-center items-center  border-r border-[#FEFAE0] border-opacity-50 border-b md:border-b-0 text-[#FEFAE0]"
                    >
                      <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-7">
                        {item.rank === 1 ? (
                          ""
                        ) : item.rank === 2 ? (
                          ""
                        ) : item.rank === 3 ? (
                          ""
                        ) : (
                          <span>#{item.rank} </span>
                        )}
                        <span className="text-[#0C8B38]">
                          {item.rank === 1
                            ? "↑"
                            : item.rank === 2
                            ? "↑↑"
                            : item.rank === 3
                            ? "↑↑↑"
                            : ""}
                        </span>
                      </div>
                      <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-7">
                        <div
                          className="flex items-center space-x-2 justify-center md:justify-start cursor-pointer hover:underline"
                          onClick={() =>
                            navigateToUserProfile(userData.username)
                          }
                        >
                          <div className="md:ml-4">
                            <Image
                              loader={() => userData?.pfp_url}
                              src={userData?.pfp_url}
                              alt={"pfp"}
                              width={18}
                              height={18}
                              className="rounded-full max-w-6 max-h-6"
                            />
                          </div>

                          <div>@{userData?.username}</div>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-7">
                        {item.count_likes}
                      </div>
                      <div className="col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-7">
                        {item.count_recasts}
                      </div>
                      <div className="col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-7">
                        {item.count_replies}
                      </div>
                      <div className="col-span-1 md:col-span-2 border-r border-[#FEFAE0] border-opacity-50 py-7">
                        {item.total_engagement}
                      </div>
                      <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-7">
                        {item.Engagement_Score.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              {loading && (
                <div className="py-7 border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md">
                  <div className="spinner">
                    <div className="bounce" />
                    <div className="bounce" />
                    <div className="bounce" />
                  </div>
                </div>
              )}
              {displayData.length >= leadData.length &&
                displayData.length !== 0 && (
                  <p className=" bg-[#1E1E1E] py-7 text-center items-center border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md text-[#FEFAE0]">
                    You&apos;ve reached the end
                  </p>
                )}

              {isAuthenticated && loggedInUserRank && (
                <div className="sticky bottom-0 bg-[#1E1E1E] grid grid-cols-4 md:grid-cols-12 gap-0 text-center items-center border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md text-[#FEFAE0]">
                  <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                    #{loggedInUserRank.rank}
                  </div>
                  <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-6">
                    <div
                      className="flex items-center space-x-2 justify-center md:justify-start cursor-pointer hover:underline"
                      onClick={() =>
                        navigateToUserProfile(
                          loggedInUserData?.username as string
                        )
                      }
                    >
                      <div className="md:ml-4">
                        <Image
                          loader={() => loggedInUserData?.pfp_url || ""}
                          src={loggedInUserData?.pfp_url || ""}
                          alt={"pfp"}
                          width={18}
                          height={18}
                          className="rounded-full max-w-6 max-h-6"
                        />
                      </div>

                      <div>@{loggedInUserData?.username as string}</div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                    {loggedInUserRank.count_recasts}
                  </div>
                  <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                    {loggedInUserRank.count_likes}
                  </div>
                  <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                    {loggedInUserRank.count_replies}
                  </div>
                  <div className="col-span-1 md:col-span-2 border-r border-[#FEFAE0] border-opacity-50 py-6">
                    {loggedInUserRank.total_engagement}
                  </div>
                  <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-6">
                    {loggedInUserRank.Engagement_Score.toFixed(2)}
                  </div>
                </div>
              )}

              {isAuthenticated && !loggedInUserRank && (
                <div className="sticky bottom-0 bg-[#1E1E1E] text-center items-center border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md py-6 text-[#FEFAE0]">
                  You do not have a rank
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AuthKitProvider>
  );
}
