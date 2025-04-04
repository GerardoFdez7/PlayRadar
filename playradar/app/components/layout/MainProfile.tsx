'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useGamePreferences } from '@/hooks/useGamePreferences';
import { usePlayLater } from '@/hooks/usePlayLater';
import useGenre from '@/hooks/useGenre';
import usePlatforms from '@/hooks/usePlatforms';
import { useUsername, useUpdateUsername } from '@/hooks/useUserProfile';
import useMultimedia from '@/hooks/useMultimedia';
import useTooltip from '@/hooks/useTooltip';
import AvatarProfile from '@/components/features/AvatarProfile';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Pencil, Check, X } from 'lucide-react';
import { genres, platforms } from '@/app/lib/consts/games.consts';
import Loader from '@/components/ui/Loader';
import CardGame from '@/ui/CardGame';

export function MainProfile() {
  const { userAuthenticated } = useAuth();
  const [editingUsername, setEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const username = useUsername(userAuthenticated);
  const { updateUsernameFunc } = useUpdateUsername(userAuthenticated);
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
    setTempUsername(username || '');
    setEditingUsername(false);
  };

  useEffect(() => {
    setTempUsername(username || '');
  }, [username]);

  const saveUsername = async () => {
    await updateUsernameFunc(tempUsername);
    window.location.reload();
    setEditingUsername(false);
  };

  return (
    <main className="mx-10">
      {/* Username Section */}
      <div className="flex gap-4 items-end mb-10">
        <AvatarProfile />
        {editingUsername ? (
          <div className="flex gap-2 items-center">
            <Input
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              className="max-w-xs"
              autoFocus
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => void saveUsername()}
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={cancelEditUsername}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-start h-full">
            <h2 className="sm:text-5xl text-[7vw] font-bold">{username}</h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setEditingUsername(true)}
            >
              <Pencil className="w-4 h-4" />
              <span className="sr-only">Edit username</span>
            </Button>
          </div>
        )}
      </div>

      <div className="grid relative grid-cols-1 gap-6 mx-auto mb-8 md:grid-cols-2">
        {/* Vertical divider */}
        <div className="hidden absolute left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent md:block dark:via-gray-200" />

        {/* Genres Column */}
        <div className="flex-col items-center md:text-center md:pr-4 lg:pr-8">
          <h2 className="mb-4 text-xl font-semibold 2xl:text-2xl">
            Select your favorite Genres
          </h2>
          <div className="items-center md:flex-col">
            {genres.map((genre) => (
              <Badge
                key={genre.name}
                variant={
                  userGenres.includes(genre.slug) ? 'default' : 'outline'
                }
                className="m-1 text-sm cursor-pointer xl:text-base 2xl:text-lg"
                onClick={() => void handleGenreToggle(genre.slug)}
              >
                <span className="mr-1">{genre.icon}</span>
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Platforms Column */}
        <div className="flex-col items-center md:text-center md:pl-4">
          <h2 className="mb-4 text-xl font-semibold 2xl:text-2xl">
            Select your favorite Platforms
          </h2>
          <div className="items-center md:flex-col">
            {platforms.map((platform) => (
              <Badge
                key={platform.id}
                variant={
                  userPlatforms.includes(platform.id) ? 'default' : 'outline'
                }
                className="m-1 text-sm cursor-pointer xl:text-base 2xl:text-lg"
                onClick={() => void handlePlatformToggle(platform.id)}
              >
                <span className="flex justify-center items-center mr-1">
                  {platform.icon}
                </span>
                {platform.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Game Collections Tabs */}
      <div className="pb-8">
        <h2 className="mb-4 text-xl font-semibold">My Games</h2>
        <Tabs defaultValue="play-later" className="w-full">
          <TabsList className="grid grid-cols-3 gap-6 mb-6 w-full bg-transparent">
            <TabsTrigger
              value="liked"
              className="font-bold max-[387px]:text-xs text-base xl:text-xl relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-700 hover:after:scale-x-100 after:rounded-full"
            >
              Liked
            </TabsTrigger>

            <TabsTrigger
              value="play-later"
              className="font-bold max-[387px]:text-xs text-base xl:text-xl relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px]
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-700 hover:after:scale-x-100 after:rounded-full"
            >
              Play Later
            </TabsTrigger>

            <TabsTrigger
              value="disliked"
              className="font-bold max-[387px]:text-xs text-base xl:text-xl relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-700 hover:after:scale-x-100 after:rounded-full"
            >
              Disliked
            </TabsTrigger>
          </TabsList>

          <TabsContent value="liked">
            {isLoadingLiked ? (
              <Loader />
            ) : likedGames.length > 0 ? (
              <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
                {likedGames?.map((games) => (
                  <CardGame
                    key={games.id}
                    games={games}
                    getTrailerOfHoveredGame={(e) =>
                      void getTrailerOfHoveredGame(e)
                    }
                    videoRefs={videoRefs}
                    trailers={trailers}
                    muted={muted}
                    setMuted={setMuted}
                    handleScreenshotHover={handleScreenshotHover}
                    currentScreenshotIndex={currentScreenshotIndex}
                    user={!!userAuthenticated}
                    activeTooltip={activeTooltip}
                    setActiveTooltip={setActiveTooltip}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No games in your Liked list
              </div>
            )}
          </TabsContent>

          <TabsContent value="play-later">
            {isLoadingPlayLater ? (
              <Loader />
            ) : playLaterGames.length > 0 ? (
              <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
                {playLaterGames?.map((games) => (
                  <CardGame
                    key={games.id}
                    games={games}
                    getTrailerOfHoveredGame={(e) =>
                      void getTrailerOfHoveredGame(e)
                    }
                    videoRefs={videoRefs}
                    trailers={trailers}
                    muted={muted}
                    setMuted={setMuted}
                    handleScreenshotHover={handleScreenshotHover}
                    currentScreenshotIndex={currentScreenshotIndex}
                    user={!!userAuthenticated}
                    activeTooltip={activeTooltip}
                    setActiveTooltip={setActiveTooltip}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No games in your Play Later list
              </div>
            )}
          </TabsContent>

          <TabsContent value="disliked">
            {isLoadingDisliked ? (
              <Loader />
            ) : dislikedGames.length > 0 ? (
              <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
                {dislikedGames?.map((games) => (
                  <CardGame
                    key={games.id}
                    games={games}
                    getTrailerOfHoveredGame={(e) =>
                      void getTrailerOfHoveredGame(e)
                    }
                    videoRefs={videoRefs}
                    trailers={trailers}
                    muted={muted}
                    setMuted={setMuted}
                    handleScreenshotHover={handleScreenshotHover}
                    currentScreenshotIndex={currentScreenshotIndex}
                    user={!!userAuthenticated}
                    activeTooltip={activeTooltip}
                    setActiveTooltip={setActiveTooltip}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No games in your Disliked list
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
