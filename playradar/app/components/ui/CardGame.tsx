import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Game } from '@/types/games.types';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import { platforms } from '@/app/lib/consts/games.consts';
import { GameActions } from '@/features/GameActions';
import videogameImage from '@/assets/placeholder.png';

interface CardGameProps {
  user: boolean;
  games: Game;
  getTrailerOfHoveredGame: (game: Game) => void;
  videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
  trailers: Record<string, string>;
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  handleScreenshotHover: (
    e: React.MouseEvent<HTMLDivElement>,
    game: Game,
  ) => void;
  currentScreenshotIndex: Record<number, number>;
  activeTooltip: { type: string; gameId: number } | null;
  setActiveTooltip: React.Dispatch<
    React.SetStateAction<{ type: string; gameId: number } | null>
  >;
}

export default function CardGame({
  games,
  getTrailerOfHoveredGame,
  videoRefs,
  trailers,
  muted,
  setMuted,
  handleScreenshotHover,
  currentScreenshotIndex,
  user,
  activeTooltip,
  setActiveTooltip,
}: CardGameProps) {
  const router = useRouter();

  return (
    <div
      className="group items-center relative bg-card rounded-xl max-[440px]:w-[85vw] transition-all duration-300 hover:scale-110 overflow-visible hover:z-[40]"
      onMouseEnter={() => {
        getTrailerOfHoveredGame(games);
      }}
      onMouseLeave={() => {
        const video = videoRefs.current[games.id];
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }}
    >
      <div className="relative aspect-video">
        {/* Video trailer */}
        {trailers[games.id.toString()] && (
          <>
            <video
              ref={(el) => {
                videoRefs.current[games.id] = el;
              }}
              src={trailers[games.id.toString()]}
              autoPlay
              muted={muted}
              loop
              className="object-cover absolute inset-0 z-10 w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ pointerEvents: 'none' }}
              onLoadedData={() => {
                // Play video when ready
                if (videoRefs.current[games.id]) {
                  void videoRefs.current[games.id]?.play();
                }
              }}
            />
            {/* Mute button */}
            <button
              onClick={() => setMuted((prev) => !prev)}
              className="absolute right-2 bottom-2 z-30 p-2 rounded-full transition-all bg-gray-700/50 hover:bg-gray-700/75"
            >
              {muted ? (
                <MdVolumeOff className="w-6 h-6 opacity-50 hover:opacity-100" />
              ) : (
                <MdVolumeUp className="w-6 h-6 opacity-50 hover:opacity-100" />
              )}
            </button>
          </>
        )}

        {/* Screenshots */}
        {!trailers[games.id.toString()] &&
          games.short_screenshots &&
          games.short_screenshots.length > 0 && (
            <div
              className="isolate absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              onMouseMove={(e) => handleScreenshotHover(e, games)}
            >
              <Image
                src={
                  games.short_screenshots[currentScreenshotIndex[games.id] || 0]
                    ?.image || videogameImage
                }
                alt={games.name}
                fill
                className="object-cover w-full h-full"
              />

              {/* Position indicator */}
              <div className="absolute right-0 bottom-0 left-0 z-10 p-2">
                <div className="flex flex-col gap-1">
                  {/* Position counter */}
                  <div className="flex justify-between items-center"></div>

                  {/* Interactive progress bar */}
                  <div className="flex gap-3">
                    {games.short_screenshots.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          index === currentScreenshotIndex[games.id]
                            ? 'bg-white'
                            : 'bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Default image */}
        <Image
          src={games.background_image || videogameImage}
          alt={games.name}
          width={640}
          height={360}
          className={`object-cover w-full h-full transition-all duration-500 ${
            trailers[games.id.toString()] ||
            (games.short_screenshots?.length ?? 0) > 0
              ? 'group-hover:opacity-0'
              : ''
          }`}
        />
      </div>

      {/* Card information */}
      <div className="mt-2">
        {/* Platforms icons*/}
        <div className="flex absolute left-5 gap-1">
          {games.parent_platforms?.map((parent_platforms) => {
            const platform = platforms.find(
              (p) => p.slug === parent_platforms.platform.slug,
            );
            return (
              <span
                key={parent_platforms.platform.slug}
                className="flex justify-center items-center w-6 h-6"
              >
                {platform?.icon}
              </span>
            );
          })}
        </div>

        <div className="p-6">
          <div className="" onClick={() => router.push(`/${games.slug}`)}>
            <h3 className="font-semibold truncate transition-colors cursor-pointer hover:text-gray-500 dark:hover:text-gray-400">
              {games.name}
            </h3>
          </div>

          <GameActions
            gameId={games.id}
            user={!!user}
            activeTooltip={activeTooltip}
            setActiveTooltip={setActiveTooltip}
            ratingsCount={games.ratings_count || 0}
          />

          {/* Expand content on hover */}
          <div className="absolute right-0 left-0 pr-6 pl-6 mt-2 rounded-xl bg-card">
            <div className="h-0 transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100 group-hover:h-auto">
              {/* Genre */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Genre</span>
                <span className="text-sm text-right">
                  {games.genres.map((genre) => genre.name).join(', ')}
                </span>
              </div>

              {/* Line */}
              <div className="my-2 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent dark:via-gray-200" />

              {/* Release */}
              <div className="flex justify-between items-center mt-2 mb-4">
                <span className="text-sm">Released</span>
                <span className="text-sm">
                  {new Date(games.released).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
