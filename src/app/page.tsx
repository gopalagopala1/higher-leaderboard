import Leaderboard from "@/components/leaderboard";
import { getFrameMetadata } from "frog/next";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    "https://721b-49-43-160-79.ngrok-free.app/api"
  );

  console.log("frame tags", frameTags);
  return {
    other: frameTags,
  };
}

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(12, 139, 56, 0.4)), url(/images/background.png)",
      }}
    >
      <Leaderboard />
    </div>
  );
}
