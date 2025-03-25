"use client";

import { useParams } from "next/navigation";
import { useDetailGame } from "@/hooks/useDetailGame";
import useTooltip from "@/hooks/useTooltip";
import HeaderGame from "@/components/layout/HeaderGame";
import Footer from "@/components/layout/Footer";
import MainGame from "@/components/layout/MainGame";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function GameDetailsPage() {
  const { slug } = useParams();
  const { gameDetails, gameMedia, error } = useDetailGame(slug as string);
  const { activeTooltip, setActiveTooltip } = useTooltip();
  const [user] = useAuthState(auth);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!gameDetails) {
    return (
      <div className="container px-6 mx-auto mt-20 rounded-lg">
        {/* Skeleton for Title */}
        <Skeleton
          height={60}
          width="70%"
          className="mb-6"
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        />

        {/* Skeleton Carousel */}
        {[...Array(1)].map((_, i) => (
          <Skeleton
            key={i}
            height={400}
            baseColor="var(--skeleton-base)"
            highlightColor="var(--skeleton-highlight)"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-500 dark:bg-gray-900">
      <HeaderGame />
      <MainGame
        gameDetails={gameDetails}
        gameMedia={gameMedia}
        user={!!user}
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
      />
      <Footer />
    </div>
  );
}
