import { useState, useRef, useEffect } from 'react';
import { Game } from '@/types/games.types';
import { getGameTrailer } from '@/app/services/rawg';

export default function useMultimedia() {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [trailers, setTrailers] = useState<Record<string, string>>({});
  const [muted, setMuted] = useState(true);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState<
    Record<number, number>
  >({});
  const [hoveredGameId, setHoveredGameId] = useState<string | number | null>(
    null,
  );

  // Handle scrolling in screenshots
  const handleScreenshotHover = (
    e: React.MouseEvent<HTMLDivElement>,
    game: Game,
  ) => {
    const container = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - container.left;
    const percentage = mouseX / container.width;
    const totalScreenshots = game.short_screenshots?.length || 0;

    if (totalScreenshots > 0) {
      const newIndex = Math.min(
        Math.floor(percentage * totalScreenshots),
        totalScreenshots - 1,
      );
      setCurrentScreenshotIndex((prev) => ({ ...prev, [game.id]: newIndex }));
    }
  };

  // Get the trailer when mouse is over the game
  const getTrailerOfHoveredGame = async (game: Game) => {
    const identifier = game.id.toString();
    setHoveredGameId(identifier);
    if (!trailers[identifier]) {
      const trailerUrl = await getGameTrailer(identifier);
      if (trailerUrl) {
        setTrailers((prev) => ({ ...prev, [identifier]: trailerUrl }));
      }
    }
  };

  // Effect to handle playback logic
  useEffect(() => {
    if (hoveredGameId && videoRefs.current[hoveredGameId]) {
      const video = videoRefs.current[hoveredGameId] as HTMLVideoElement;
      video.currentTime = 0;
      video.load();
      video.play().catch(() => {});
    }
  }, [hoveredGameId, trailers]);

  return {
    videoRefs,
    trailers,
    muted,
    setMuted,
    handleScreenshotHover,
    currentScreenshotIndex,
    getTrailerOfHoveredGame,
  };
}
