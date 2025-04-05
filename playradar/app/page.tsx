'use client';

import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/connections/firebase';
import useGames from '@/hooks/useGames';
import useSentinel from '@/hooks/useSentinel';
import useMultimedia from '@/hooks/useMultimedia';
import useTooltip from '@/hooks/useTooltip';
import HeaderHome from '@/components/layout/HeaderHome';
import MainHome from '@/components/layout/MainHome';

export default function HomePage({}) {
  const [user] = useAuthState(auth);
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Tab state
  const [selectedTab, setSelectedTab] = useState<'home' | 'for-you'>('home');
  // API calls states
  const {
    filteredGames,
    recommendedGames,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedGenreSlug,
    setSelectedGenreSlug,
    selectedPlatform,
    setSelectedPlatform,
    setSortBy,
    loadMoreGames,
    loadMoreSearchResults,
  } = useGames([], null, selectedTab === 'for-you');
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
  // Detect end of the list
  const sentinelRef = useSentinel(
    () => {
      void loadMoreGames();
    },
    () => {
      void loadMoreSearchResults();
    },
    searchTerm,
  );

  return (
    <div className="min-h-screen bg-gray-300 transition-colors duration-500 dark:bg-gray-900">
      <HeaderHome
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={!!user}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        selectedGenreSlug={selectedGenreSlug}
        setSelectedGenreSlug={setSelectedGenreSlug}
      />
      <MainHome
        selectedGenreSlug={selectedGenreSlug}
        setSelectedGenreSlug={setSelectedGenreSlug}
        filteredGames={filteredGames}
        recommendedGames={recommendedGames}
        isLoading={isLoading}
        sentinelRef={sentinelRef}
        setSortBy={setSortBy}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        videoRefs={videoRefs}
        trailers={trailers}
        muted={muted}
        setMuted={setMuted}
        handleScreenshotHover={handleScreenshotHover}
        currentScreenshotIndex={currentScreenshotIndex}
        getTrailerOfHoveredGame={(e) => void getTrailerOfHoveredGame(e)}
        user={!!user}
        onTabChange={setSelectedTab}
      />
    </div>
  );
}
