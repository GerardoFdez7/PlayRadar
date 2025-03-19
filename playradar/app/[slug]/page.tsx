"use client";

import { useState, useEffect } from "react";
import type { GameDetails, GameMedia } from "@/types/games.types";
import HeaderGame from "@/components/layout/HeaderGame";
import Footer from "@/components/layout/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useGamePreferences } from "@/hooks/useGamePreferences";
import { usePlayLater } from "@/hooks/usePlayLater";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getGameDetails, getGameMedia } from "@/services/api";
import { useParams } from "next/navigation";
import MainGame from "@/components/layout/MainGame";

export default function GameDetailsPage() {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [gameMedia, setGameMedia] = useState<GameMedia | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  // GameActions
  const [activeTooltip, setActiveTooltip] = useState<{
    type: string;
    gameId: number; 
  } | null>(null);
  const [user] = useAuthState(auth);
  const { userPlayLater, handlePlayLaterToggle } = usePlayLater();
  const { userLikes, userDislikes, handleLikeToggle, handleDislikeToggle } =
    useGamePreferences();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const [details, media] = await Promise.all([
          getGameDetails(slug as string),
          getGameMedia(slug as string),
        ]);

        if (details) {
          setGameDetails(details);
        }

        if (media)
          setGameMedia({
            short_screenshots: media.screenshots,
            movies: media.trailers,
          });
        if (!details) {
          setError("Failed to load game data");
        }
      } catch (err) {
        setError("Error fetching game data");
        console.error(err);
      }
    };
    fetchGameData();
  }, [slug]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const pathSegments = window.location.pathname.split("/");
        const slug = pathSegments[pathSegments.length - 1];

        const data = await getGameDetails(slug);
        if (data) {
          setGameDetails(data);
        } else {
          setError("Failed to load game details");
        }
      } catch (err) {
        setError("Error fetching game data");
        console.error(err);
      }
    };

    fetchGameData();
  }, [slug]);

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
          className="mb-6 dark:bg-gray-800"
        />
        {/* Skeleton Carousel */}
        {[...Array(1)].map((_, i) => (
          <Skeleton
            key={i}            
            height={400}
            containerClassName="flex-1"
            className="dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-500 dark:bg-gray-900">
      {/* Header */}
      <HeaderGame />
      <MainGame 
      gameDetails={gameDetails}
      gameMedia={gameMedia}
      user={!!user}
      activeTooltip={activeTooltip}
      setActiveTooltip={setActiveTooltip}
      userPlayLater={userPlayLater}
      userLikes={userLikes}
      userDislikes={userDislikes}
      handlePlayLaterToggle={handlePlayLaterToggle}
      handleLikeToggle={handleLikeToggle}
      handleDislikeToggle={handleDislikeToggle}/>
      <Footer />
    </div>
  );
}
