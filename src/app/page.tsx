import Leaderboard from "@/components/leaderboard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">
      <Leaderboard />
    </div>
  );
}
