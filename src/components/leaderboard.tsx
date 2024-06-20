"use client";
import {
  AuthKitProvider,
  SignInButton,
  StatusAPIResponse,
  useProfile,
} from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const kreadonDemi = localFont({
  src: "../../public/fonts/Kreadon-Demi.ttf",
});

const kreadonBold = localFont({
  src: "../../public/fonts/Kreadon-Bold.ttf",
});

interface Rank {
  Engagement_Score: number;
  count_likes: number;
  count_recasts: number;
  count_replies: number;
  fid: number;
  total_engagement: number;
  rank: number;
}

interface Profile {
  bio: {
    text: string;
  };
}

interface VerifiedAddresses {
  eth_addresses: string[];
  sol_addresses: string[];
}

interface ViewerContext {
  following: boolean;
  followed_by: boolean;
}

export interface UserData {
  object: string;
  fid: number;
  custody_address: string;
  username: string;
  display_name: string;
  pfp_url: string;
  profile: Profile;
  follower_count: number;
  following_count: number;
  verifications: string[];
  verified_addresses: VerifiedAddresses;
  active_status: string;
  power_badge: boolean;
  viewer_context: ViewerContext;
}

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState<Rank[]>([]);
  const [LeadData, setLeadData] = useState<Rank[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const { isAuthenticated } = useProfile();

  const paginate = (action: "prev" | "next") => {
    if (action === "prev" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useMemo(() => {
    const fetchLeaderBoard = async () => {
      const response = await fetch(`/api/fetchLeaderBoard`, {
        method: "GET",
      });

      const data: Rank[] = await response.json();

      setLeadData(data);
    };
    fetchLeaderBoard();
  }, []);
  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = LeadData.slice(indexOfFirstPost, indexOfLastPost);

    if (LeadData.length === 0) {
      console.error("Data array is empty");
      return;
    }

    if (currentPosts.length === 0) {
      console.error("No posts found for the current page");
      return;
    }

    // Create a new array with ranks assigned based on the overall index
    const rankedData = currentPosts.map((item, index) => {
      const overallIndex = indexOfFirstPost + index;
      return { ...item, rank: overallIndex + 1 };
    });

    const fids = rankedData
      .filter(
        (post): post is Rank =>
          post !== null && typeof post === "object" && "fid" in post
      )
      .map((post) => post.fid);

    if (fids.length === 0) {
      console.error("No valid fids found in the current posts");
      return;
    }

    const fetchUsers = async () => {
      const response = await fetch(`/api/fetchUsers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fids }),
      });
      console.log(response);
      const data: UserData[] = await response.json();
      console.log(data);
      setUsers(data);
    };

    fetchUsers();

    setDisplayData(rankedData);
  }, [currentPage, postsPerPage, LeadData]);

  const config = {
    // For a production app, replace this with an Optimism Mainnet
    // RPC URL from a provider like Alchemy or Infura.
    rpcUrl: "https://mainnet.optimism.io",
    domain: "example.com",
    siweUri: "https://example.com/login",
  };

  const onSignInSuccess = (res: StatusAPIResponse) => {
    if (res.state === "completed") {
      localStorage.setItem("userFid", JSON.stringify(res.fid));
    }
  };

  const onSignOut = () => {
    localStorage.removeItem("connectedUser");
  };

  const signedInUser = {
    rank: 11,
    user: "@signedInUser",
    memberSince: "06.20.2024",
    casts: 980,
    recasts: 980,
    likes: 45,
    replies: 18,
    total_engagement: 2384,
    engagement_score: 9823,
  };

  const navigateToUserProfile = (user: UserData) => {
    const navUrl = `https://warpcast.com/${user.username}`;
    window.open(navUrl, "_blank");
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

          <div className="sign-in-button">
            <SignInButton onSuccess={onSignInSuccess} onSignOut={onSignOut} />
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
          className={`max-h-[calc(100vh-560px)] md:max-h-[calc(100vh-400px)] bg-[#1E1E1E] overflow-y-auto no-scrollbar ${kreadonDemi.className} border-[0.01px] border-t-0 border-[#FEFAE0] border-opacity-50`}
        >
          {users.length === 0 || LeadData.length === 0 ? (
            <p className="text-[#FEFAE0] text-2xl font-medium p-6 text-center w-full">
              Loading...
            </p>
          ) : (
            <>
              {displayData.map((item, index) => {
                const userData: UserData = users[index];

                return (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-y-0 text-center items-center  border-r border-[#FEFAE0] border-opacity-50 border-b md:border-b-0 text-[#FEFAE0]"
                  >
                    <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
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
                    <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-6">
                      <div
                        className="flex items-center space-x-2 justify-center md:justify-start cursor-pointer hover:underline"
                        onClick={() => navigateToUserProfile(userData)}
                      >
                        <div className="md:ml-4">
                          <img
                            src={userData.pfp_url}
                            alt={"pfp"}
                            width={24}
                            height={24}
                            className="rounded-full max-w-6 max-h-6"
                          />
                        </div>

                        <div>@{userData.username}</div>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                      {item.count_likes}
                    </div>
                    <div className="col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                      {item.count_recasts}
                    </div>
                    <div className="col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                      {item.count_replies}
                    </div>
                    <div className="col-span-1 md:col-span-2 border-r border-[#FEFAE0] border-opacity-50 py-6">
                      {item.total_engagement}
                    </div>
                    <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-6">
                      {item.Engagement_Score.toFixed(2)}
                    </div>
                  </div>
                );
              })}

              <div className="sticky bottom-0 bg-[#1E1E1E] grid grid-cols-4 md:grid-cols-12 gap-0 text-center items-center border-t-2 border-[#FEFAE0] border-opacity-50 shadow-md">
                <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                  #{signedInUser.rank}
                </div>
                <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-6">
                  {signedInUser.user}
                </div>
                <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                  {signedInUser.recasts}
                </div>
                <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                  {signedInUser.likes}
                </div>
                <div className="col-span-1 md:col-span-1 border-r border-[#FEFAE0] border-opacity-50 py-6">
                  {signedInUser.replies}
                </div>
                <div className="col-span-1 md:col-span-2 border-r border-[#FEFAE0] border-opacity-50 py-6">
                  {signedInUser.total_engagement}
                </div>
                <div className="col-span-1 md:col-span-3 border-r border-[#FEFAE0] border-opacity-50 py-6">
                  {signedInUser.engagement_score}
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className={`flex justify-between items-center mt-10 ${kreadonBold.className}`}
        >
          <button
            disabled={!isAuthenticated}
            className="bg-[#0C8B38] text-[#FEFAE0] py-2 px-4 uppercase hover:bg-green-700 font-bold text-sm max-h-[35px]"
          >
            Create Frame
          </button>
          <div
            className={`flex items-center space-x-10 ${kreadonBold.className} text-[#FEFAE0]`}
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={() => paginate("prev")}
            >
              <FaCaretLeft size={24} /> PREVIOUS
            </div>

            <div
              className="flex items-center cursor-pointer"
              onClick={() => paginate("next")}
            >
              NEXT <FaCaretRight size={24} />
            </div>
          </div>
        </div>
      </div>
    </AuthKitProvider>
  );
}
