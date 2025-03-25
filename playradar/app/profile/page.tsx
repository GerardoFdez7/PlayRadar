"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useGamePreferences } from "@/hooks/useGamePreferences";
import { usePlayLater } from "@/hooks/usePlayLater";
import useGenre from "@/hooks/useGenre";
import usePlatforms from "@/hooks/usePlatforms";
import { useUsername, useUpdateUsername } from "@/hooks/useUserProfile";
import useMultimedia from "@/hooks/useMultimedia";
import useTooltip from "@/hooks/useTooltip";
import HeaderProfile from "@/components/layout/HeaderProfile";
import { MainProfile } from "@/components/layout/MainProfile";

export default function ProfilePage() {
  const { userAuthenticated } = useAuth();
  const [editingUsername, setEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState("");
  const username = useUsername(userAuthenticated);
  const { updateUsername } = useUpdateUsername(userAuthenticated);
  // Handle genre and platform toggles
  const { userGenres, handleGenreToggle } = useGenre();
  const { userPlatforms, handlePlatformToggle } = usePlatforms();
  // Get user lists
  const { userLikes, userDislikes } = useGamePreferences();
  const { userPlayLater } = usePlayLater();
  const {
    likedGames,
    dislikedGames,
    playLaterGames,
    isLoadingLiked,
    isLoadingDisliked,
    isLoadingPlayLater,
  } = useProfile(userLikes, userDislikes, userPlayLater);
  // Card states
  const { activeTooltip, setActiveTooltip } = useTooltip();
  const {
    videoRefs,
    trailers,
    muted,
    setMuted,
    handleScreenshotHover,
    currentScreenshotIndex,
    getTrailerOfHoveredGame,
  } = useMultimedia();

  const cancelEditUsername = () => {
    setTempUsername(username || "");
    setEditingUsername(false);
  };

  useEffect(() => {
    setTempUsername(username || "");
  }, [username]);

  const saveUsername = async () => {
    await updateUsername(tempUsername);
    window.location.reload();
    setEditingUsername(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 transition-colors duration-500 dark:bg-gray-900">
      <HeaderProfile />
      <MainProfile
        username={username}
        editingUsername={editingUsername}
        setEditingUsername={setEditingUsername}
        tempUsername={tempUsername}
        setTempUsername={setTempUsername}
        saveUsername={saveUsername}
        cancelEditUsername={cancelEditUsername}
        userGenres={userGenres}
        handleGenreToggle={handleGenreToggle}
        userPlatforms={userPlatforms}
        handlePlatformToggle={handlePlatformToggle}
        likedGames={likedGames}
        dislikedGames={dislikedGames}
        playLaterGames={playLaterGames}
        isLoadingLiked={isLoadingLiked}
        isLoadingDisliked={isLoadingDisliked}
        isLoadingPlayLater={isLoadingPlayLater}
        userAuthenticated={!!userAuthenticated}
        videoRefs={videoRefs}
        trailers={trailers}
        muted={muted}
        setMuted={setMuted}
        handleScreenshotHover={handleScreenshotHover}
        currentScreenshotIndex={currentScreenshotIndex}
        getTrailerOfHoveredGame={getTrailerOfHoveredGame}
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
      />
    </div>
  );
}
