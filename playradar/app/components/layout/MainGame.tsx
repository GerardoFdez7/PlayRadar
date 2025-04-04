'use client';

import { useParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase';
import { useDetailGame } from '@/hooks/useDetailGame';
import useTooltip from '@/hooks/useTooltip';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Badge } from '@/components/ui/Badge';
import { GameActions } from '@/components/features/GameActions';
import { Requirements } from '@/components/ui/Requirements';
import Carousel from '@/components/ui/Carousel';
import { ExternalLink } from 'lucide-react';

export function MainGame() {
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

  const carouselItems = [
    ...(gameMedia?.short_screenshots || []).map((screenshot) => ({
      id: `screenshot-${screenshot.id}`,
      type: 'image' as const,
      src: screenshot.image,
      alt: `${gameDetails.name} screenshot ${screenshot.id}`,
    })),
    ...(gameMedia?.movies || []).map((trailer) => ({
      id: `trailer-${trailer.id}`,
      type: 'video' as const,
      src: trailer.data.max || '',
      preview: trailer.preview,
      alt: `${gameDetails.name} trailer ${trailer.id}`,
    })),
  ];

  // Format requirements for display
  const formatRequirements = (reqString?: string) => {
    if (!reqString) return [];
    return reqString.split('\n').map((line) => {
      const cleanedLine = line.replace(/^(Recommended|Minimum):\s*/i, '');
      const [key, value] = cleanedLine.split(': ');
      return { key, value };
    });
  };

  const pcPlatform = gameDetails.platforms?.find(
    (p) => p.platform.slug === 'pc',
  );
  const minRequirements = formatRequirements(pcPlatform?.requirements?.minimum);
  const recRequirements = formatRequirements(
    pcPlatform?.requirements?.recommended,
  );

  return (
    <main className="container px-6 mx-auto">
      {/* Game Title */}
      <h1 className="mb-6 text-4xl font-bold md:text-5xl">
        {gameDetails.name || <Skeleton />}
      </h1>

      {carouselItems.length > 0 ? (
        <Carousel items={carouselItems} />
      ) : (
        <Skeleton />
      )}

      <div className="lg:mx-20 mx-4">
        <GameActions
          gameId={gameDetails.id}
          user={!!user}
          activeTooltip={activeTooltip}
          setActiveTooltip={setActiveTooltip}
          ratingsCount={gameDetails.ratings_count || 0}
          className="mx-6 my-4"
        />

        {/* Description */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Description</h2>
          <p className="text-gray-700 whitespace-pre-line dark:text-gray-300">
            {gameDetails.description_raw}
          </p>
        </div>

        {/* Game Details Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 relative">
          {/* Vertical divider */}
          <div className="hidden md:block absolute left-1/2 h-full w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent dark:via-gray-200" />

          {/* Left Column Group */}
          <div className="md:flex flex-col items-center md:text-center md:mx-10">
            <div>
              <h3 className="mb-2 text-lg font-medium">Genres</h3>
              <div className="md:flex-col items-center">
                {gameDetails.genres?.length ? (
                  gameDetails.genres.map((genre) => (
                    <Badge key={genre.id} className="m-1">
                      {genre.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">No genres available</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-lg font-medium">Developer</h3>
              <p>
                {gameDetails.developers?.map((d) => d.name).join(', ') || (
                  <span className="text-gray-500">
                    {' '}
                    Developer information not available{' '}
                  </span>
                )}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-lg font-medium">Release Date</h3>
              <p>
                {gameDetails.released ? (
                  new Date(gameDetails.released).toLocaleDateString()
                ) : (
                  <span className="text-gray-500">
                    Release date not announced
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Right Column Group */}
          <div className="md:mx-10 flex-col items-center md:text-center">
            <div>
              <h3 className="mb-2 text-lg font-medium">Platforms</h3>
              <div className="md:flex-col items-center">
                {gameDetails.platforms?.length ? (
                  gameDetails.platforms?.map((p) => (
                    <Badge key={p.platform.id} className="m-1">
                      {p.platform.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">
                    Platform information not available
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-lg font-medium">Publisher</h3>
              <p>
                {gameDetails.publishers?.length ? (
                  gameDetails.publishers.map((p, index) => (
                    <span key={p.id}>
                      {index > 0 && ', '}
                      {gameDetails.website ? (
                        <a
                          href={`${gameDetails.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline dark:hover:text-gray-600 hover:text-gray-400"
                        >
                          {p.name}
                        </a>
                      ) : (
                        p.name
                      )}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">
                    Publisher information not available
                  </span>
                )}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="mb-2 text-lg font-medium">Classification</h3>
              <p>
                {gameDetails.esrb_rating?.name || (
                  <span className="text-gray-500"> Not Rated </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {gameDetails.tags?.length ? (
              gameDetails.tags.map((tag) => (
                <Badge key={tag.id} variant="outline">
                  {tag.name}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">No tags available</p>
            )}
          </div>
        </div>

        {/* Stores */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Available at</h2>
          {gameDetails.stores?.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {gameDetails.stores.map((store) => (
                <a
                  key={store.id}
                  href={`https://${store.store.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center p-3 rounded-lg border transition-colors hover:bg-muted"
                >
                  {store.store.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Store information not available</p>
          )}
        </div>

        {/* Metacritic */}
        {gameDetails.metacritic ? (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Ratings & Reviews</h2>
            <div className="flex gap-4 items-center">
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                  gameDetails.metacritic >= 75
                    ? 'border-green-500 text-green-500'
                    : gameDetails.metacritic >= 50
                      ? 'border-yellow-500 text-yellow-500'
                      : 'border-red-500 text-red-500'
                }`}
              >
                <span className="text-xl font-bold">
                  {gameDetails.metacritic}
                </span>
              </div>
              <div>
                <p className="font-medium">Metacritic Score</p>
                {gameDetails.metacritic_url && (
                  <a
                    href={gameDetails.metacritic_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center text-blue-500 hover:underline"
                  >
                    Read review <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Ratings & Reviews</h2>
            <p className="text-gray-500">No rating information available</p>
          </div>
        )}

        {/* System Requirements */}
        <Requirements
          minRequirements={minRequirements}
          recRequirements={recRequirements}
        />
      </div>
    </main>
  );
}

export default MainGame;
