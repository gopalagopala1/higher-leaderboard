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
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat">
      <Leaderboard />
    </div>
  );
}
