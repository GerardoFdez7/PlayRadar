"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import CheckIcon from "@/ui/CheckIcon";
import LoadingAnimation from "@/ui/Loader";
import { Button } from "@/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import { Input } from "@/ui/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import radarImage from "@/assets/radar.png";
import videogameImage from "@/assets/placeholder.png";
import ModeToggle from "@/features/ThemeSelector";
import { fetchGameTrailer, getSearchedGames, getGames } from "@/services/api";
import { Game } from "@/types/games.types";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Tooltip } from "@mui/material";
import {
  PcIcon,
  PlaystationIcon,
  XboxIcon,
  NintendoIcon,
  MacIcon,
  LinuxIcon,
  IosIcon,
  AndroidIcon,
} from "@/ui/Platforms";
import MobileSidebar from "@/layout/MobileSidebar";
import Sidebar from "@/layout/Sidebar";
import PlusIcon from "@/ui/PlusIcon";
import Avatar from "@/features/Avatar";
import { useGamePreferences } from "@/hooks/useGamePreferences";
import { usePlayLater } from "@/hooks/usePlayLater";
import { platformSlugToId } from "@/consts/games.consts";

interface ClientHomePageProps {
  initialGames: Game[];
  initialNextUrl: string | null;
}

export default function ClientHomePage({
  initialGames,
  initialNextUrl,
}: ClientHomePageProps) {
  const router = useRouter();

  // States for normal load
  const [games, setGames] = useState<Game[]>(
    Array.isArray(initialGames) ? initialGames : []
  );
  const [nextUrl, setNextUrl] = useState<string | null>(initialNextUrl);

  // Search statuses
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [nextSearchUrl, setNextSearchUrl] = useState<string | null>(null);

  // Other statuses and refs (dark mode, filters, trailers, etc.)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedGenreSlug, setSelectedGenreSlug] = useState<string | null>(
    null
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("likes");
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [trailers, setTrailers] = useState<Record<string, string>>({});
  const [hoveredGameId, setHoveredGameId] = useState<string | number | null>(
    null
  );
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [muted, setMuted] = useState(true);
  const [user] = useAuthState(auth);

  // Short images state
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState<
    Record<number, number>
  >({});

  // Sentinel for the infinite scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Card states
  const [activeTooltip, setActiveTooltip] = useState<{
    type: string;
    gameId: number;
  } | null>(null);

  const { userLikes, userDislikes, handleLikeToggle, handleDislikeToggle } =
    useGamePreferences();

  const { userPlayLater, handlePlayLaterToggle } = usePlayLater();

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Call the API and establish filters
  useEffect(() => {
    const displayGames = searchTerm.trim() ? searchResults : games;
    const updatedGames = [...displayGames];

    if (sortBy === "likes") {
      updatedGames.sort(
        (a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0)
      );
    } else if (sortBy === "release") {
      updatedGames.sort((a, b) => {
        const dateA = new Date(a.released).getTime();
        const dateB = new Date(b.released).getTime();
        return dateB - dateA;
      });
    } else if (sortBy === "name") {
      updatedGames.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredGames(updatedGames);
  }, [
    selectedPlatform,
    sortBy,
    searchResults,
    games,
    selectedGenreSlug,
    searchTerm,
  ]);

  // Get filtered games
  useEffect(() => {
    const fetchFilteredGames = async () => {
      if (!searchTerm.trim()) {
        const platformId =
          selectedPlatform !== "all" ? selectedPlatform : undefined;
        const genreSlug = selectedGenreSlug ? selectedGenreSlug : undefined;
        const data = await getGames(undefined, genreSlug, platformId);

        if (data) {
          setGames(data.results);
          setNextUrl(data.next);
        }
      }
    };

    // Only do fetch if we are NOT in search mode
    if (!searchTerm.trim()) {
      fetchFilteredGames();
    }
  }, [selectedGenreSlug, selectedPlatform, searchTerm]);

  // More games
  const loadMoreGames = useCallback(async () => {
    if (!nextUrl || isLoading) return;
    setIsLoading(true);
    const data = await getGames(nextUrl);
    if (data && Array.isArray(data.results)) {
      setGames((prev) => [...prev, ...data.results]);
      setNextUrl(data.next);
    }
    setIsLoading(false);
  }, [nextUrl, isLoading]);

  // When the search term changes the initial call is made
  useEffect(() => {
    const fetchInitialSearch = async () => {
      if (searchTerm.trim()) {
        setIsLoading(true);

        // Clear filters when starting search
        setSelectedGenreSlug(null);
        setSelectedPlatform("all");

        const data = await getSearchedGames(searchTerm);
        if (data && Array.isArray(data.results)) {
          setSearchResults(data.results);
          setNextSearchUrl(data.next);
        }
        setIsLoading(false);
      } else {
        // If the term is deleted, we reset to the initial games
        setSearchResults([]);
        setNextSearchUrl(null);
      }
    };

    // 500ms debounce
    const handler = setTimeout(() => {
      fetchInitialSearch();
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // More games when searching
  const loadMoreSearchResults = useCallback(async () => {
    if (!nextSearchUrl || isLoading) return;
    setIsLoading(true);
    const data = await getSearchedGames(searchTerm, nextSearchUrl);
    if (data && Array.isArray(data.results)) {
      setSearchResults((prev) => [...prev, ...data.results]);
      setNextSearchUrl(data.next);
    }
    setIsLoading(false);
  }, [nextSearchUrl, searchTerm, isLoading]);

  // Detect if the user is in the end of the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (searchTerm.trim()) {
            // If searched, load more search results
            loadMoreSearchResults();
          } else {
            // If not, load more games (normal view)
            loadMoreGames();
          }
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }
    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [loadMoreGames, loadMoreSearchResults, searchTerm]);

  // Handle scrolling in screenshots
  const handleScreenshotHover = (
    e: React.MouseEvent<HTMLDivElement>,
    game: Game
  ) => {
    const container = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - container.left;
    const percentage = mouseX / container.width;
    const totalScreenshots = game.short_screenshots?.length || 0;

    if (totalScreenshots > 0) {
      const newIndex = Math.min(
        Math.floor(percentage * totalScreenshots),
        totalScreenshots - 1
      );

      setCurrentScreenshotIndex((prev) => ({
        ...prev,
        [game.id]: newIndex,
      }));
    }
  };

  // Get the trailer when mouse is over the game
  const handleHoverGame = async (game: Game) => {
    const identifier = game.id.toString();
    if (!trailers[identifier]) {
      const trailerUrl = await fetchGameTrailer(identifier);
      if (trailerUrl) {
        setTrailers((prev) => ({
          ...prev,
          [identifier]: trailerUrl,
        }));
      }
    }
  };

  // Effect to handle playback logic
  useEffect(() => {
    if (hoveredGameId && videoRefs.current[hoveredGameId]) {
      const video = videoRefs.current[hoveredGameId]!;
      video.currentTime = 0;
      video.load();
      video.play().catch(() => {
        // Errors
      });
    }
  }, [hoveredGameId, trailers]);

  useEffect(() => {
    if (activeTooltip) {
      const timer = setTimeout(() => setActiveTooltip(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTooltip]);

  return (
    <div className="min-h-screen bg-gray-300 transition-colors duration-500 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky mb-2 top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]">
        <div className="flex justify-between items-center px-4 py-12 max-w-none h-16">
          {/* Logo */}
          <div className="flex flex-shrink-0 gap-4 items-center mr-4">
            <div className="w-[85px] h-[85px] cursor-pointer">
              <Image
                src={radarImage}
                alt="Radar"
                className="object-contain mt-2 w-full h-full"
                onClick={() => window.location.reload()}
              />
            </div>
          </div>
          {/* Search bar */}
          <div className="flex flex-1 justify-center mt-2 max-w-3xl h-14 bg-gray-100 rounded-full dark:bg-gray-800">
            <div className="flex relative items-center w-full h-full">
              <div className="flex absolute left-2 items-center">
                <Search className="ml-2 w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                placeholder="Search games"
                className="pl-8 ml-4 w-full bg-transparent border-0 ring-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* X button to clear search */}
              {searchTerm && (
                <button
                  className="absolute right-7 font-semibold"
                  onClick={() => {
                    setSearchTerm("");
                  }}
                >
                  X
                </button>
              )}
            </div>
          </div>
          {/* LOG IN button*/}
          <div className="items-center hidden gap-4 ml-4 min-[767px]:flex">
            {user ? (
              <Avatar />
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="font-bold bg-transparent text-lg relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:rounded-full"
              >
                LOG IN
              </button>
            )}
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="min-[767px]:hidden pl-2">
            <button
              className=""
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MobileSidebar
                selectedGenreSlug={selectedGenreSlug}
                onGenreSelect={setSelectedGenreSlug}
              />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar
          className="min-[767px]:flex hidden"
          selectedGenreSlug={selectedGenreSlug}
          onGenreSelect={setSelectedGenreSlug}
        />

        {/* Main Content */}
        <main className="flex-1 p-3">
          <h1 className="mb-3 max-[400px]:text-[12vw] text-5xl font-bold font-playRadar ">
            PlayRadar
          </h1>
          <p className="mb-6 text-lg">Scroll, click, play… repeat!</p>
          {/* Filters */}
          <div className="flex gap-4 mb-6 max-[440px]:w-[85vw]">
            <Select onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[180px] border border-gray-400">
                <SelectValue placeholder={"Order by"} />
                <ChevronDown className="w-5 h-5 opacity-80" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="likes">Likes</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="release">Release Date</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={
                selectedPlatform === "all"
                  ? "all"
                  : Object.keys(platformSlugToId).find(
                      (key) => platformSlugToId[key] === selectedPlatform
                    )
              }
              onValueChange={(value) => {
                const platformId =
                  value === "all" ? "all" : platformSlugToId[value];
                setSelectedPlatform(platformId);
              }}
            >
              <SelectTrigger className="w-[180px] border border-gray-400">
                <SelectValue placeholder="Platforms" />
                <ChevronDown className="w-5 h-5 opacity-80" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pc">PC</SelectItem>
                <SelectItem value="playstation">PlayStation</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="nintendo">Nintendo</SelectItem>
                <SelectItem value="linux">Linux</SelectItem>
                <SelectItem value="mac">Apple</SelectItem>
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="android">Android</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Games Grid */}
          <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
            {filteredGames?.map((games) => (
              <div
                key={games.id}
                className="group items-center relative bg-card rounded-xl max-[440px]:w-[85vw] transition-all duration-300 hover:scale-110 overflow-visible hover:z-[40]"
                onMouseEnter={() => {
                  handleHoverGame(games); // Update trailers
                  setHoveredGameId(games.id);
                }}
                onMouseLeave={() => {
                  const video = videoRefs.current[games.id];
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                  setHoveredGameId(null); // Clean the state
                  // Reset index on exit
                  setCurrentScreenshotIndex((prev) => ({
                    ...prev,
                    [games.id]: 0,
                  }));
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
                        style={{ pointerEvents: "none" }}
                        onLoadedData={() => {
                          // Play video when ready
                          if (hoveredGameId === games.id) {
                            videoRefs.current[games.id]?.play();
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
                            games.short_screenshots[
                              currentScreenshotIndex[games.id] || 0
                            ]?.image || videogameImage
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
                                      ? "bg-white"
                                      : "bg-gray-500"
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
                        ? "group-hover:opacity-0"
                        : ""
                    }`}
                  />
                </div>

                {/* Card information */}
                <div className="mt-2">
                  {/* Platforms icons*/}
                  <div className="flex absolute left-5 gap-1">
                    {games.parent_platforms?.map((parent_platforms) => (
                      <span
                        key={parent_platforms.platform.slug}
                        className="flex justify-center items-center w-6 h-6"
                      >
                        {parent_platforms.platform.slug === "pc" && <PcIcon />}
                        {parent_platforms.platform.slug === "playstation" && (
                          <PlaystationIcon />
                        )}
                        {parent_platforms.platform.slug === "xbox" && (
                          <XboxIcon />
                        )}
                        {parent_platforms.platform.slug === "nintendo" && (
                          <NintendoIcon />
                        )}
                        {parent_platforms.platform.slug === "mac" && (
                          <MacIcon />
                        )}
                        {parent_platforms.platform.slug === "linux" && (
                          <LinuxIcon />
                        )}
                        {parent_platforms.platform.slug === "ios" && (
                          <IosIcon />
                        )}
                        {parent_platforms.platform.slug === "android" && (
                          <AndroidIcon />
                        )}
                      </span>
                    ))}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold truncate">{games.name}</h3>
                    </div>
                    <div className="flex justify-between items-center">
                      {/* "Play later" */}
                      <Tooltip
                        title="Log in to add game to play later"
                        placement="bottom"
                        open={
                          !user &&
                          activeTooltip?.type === "play-later" &&
                          activeTooltip?.gameId === games.id
                        }
                        onClose={() => setActiveTooltip(null)}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        componentsProps={{
                          tooltip: {
                            className:
                              "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-lg text-sm",
                          },
                        }}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className={`p-0 mr-4 transition-all duration-300 transform ${
                            userPlayLater.includes(games.id.toString())
                              ? "text-primary scale-110"
                              : "hover:[&_svg]:fill-foreground/30"
                          }`}
                          onClick={() => {
                            if (!user) {
                              setActiveTooltip({
                                type: "play-later",
                                gameId: games.id,
                              });
                            } else {
                              // Enter to the list of play_later

                              handlePlayLaterToggle(games.id.toString());
                            }
                          }}
                        >
                          {userPlayLater.includes(games.id.toString()) ? (
                            <CheckIcon />
                          ) : (
                            <PlusIcon />
                          )}
                        </Button>
                      </Tooltip>

                      {/* Like and Dislike */}
                      <div className="flex gap-1 items-center">
                        <Tooltip
                          title="Log in to add games you dislike"
                          placement="bottom"
                          open={
                            !user &&
                            activeTooltip?.type === "dislike" &&
                            activeTooltip?.gameId === games.id
                          }
                          onClose={() => setActiveTooltip(null)}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          componentsProps={{
                            tooltip: {
                              className:
                                "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-lg text-sm",
                            },
                          }}
                        >
                          <Button
                            variant="ghost"
                            data-tooltip-id="login-tooltip"
                            className={`p-0 m-1 hover:bg-transparent transition-all duration-300 transform ${
                              userDislikes.includes(games.id.toString())
                                ? "text-primary scale-110"
                                : "hover:[&_svg]:fill-foreground/30"
                            }`}
                            onClick={() => {
                              if (!user) {
                                setActiveTooltip({
                                  type: "dislike",
                                  gameId: games.id,
                                });
                              } else {
                                // Enter to the list of dislikes
                                const button =
                                  document.activeElement as HTMLElement;
                                button?.classList.add("animate-ping-once");
                                setTimeout(
                                  () =>
                                    button?.classList.remove(
                                      "animate-ping-once"
                                    ),
                                  300
                                );

                                handleDislikeToggle(games.id.toString());
                              }
                            }}
                          >
                            <ThumbsDown
                              className={`h-5 w-5 transition-transform duration-300 ${
                                userDislikes.includes(games.id.toString())
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          </Button>
                        </Tooltip>

                        <Tooltip
                          title="Log in to add games you like"
                          placement="bottom"
                          open={
                            !user &&
                            activeTooltip?.type === "like" &&
                            activeTooltip?.gameId === games.id
                          }
                          onClose={() => setActiveTooltip(null)}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          componentsProps={{
                            tooltip: {
                              className:
                                "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-lg text-sm",
                            },
                          }}
                        >
                          <Button
                            variant="ghost"
                            className={`p-0 m-1 hover:bg-transparent transition-all duration-300 transform ${
                              userLikes.includes(games.id.toString())
                                ? "text-primary scale-110"
                                : "hover:[&_svg]:fill-foreground/30"
                            }`}
                            onClick={() => {
                              if (!user) {
                                setActiveTooltip({
                                  type: "like",
                                  gameId: games.id,
                                });
                              } else {
                                // Enter to the list of likes
                                const button =
                                  document.activeElement as HTMLElement;
                                button?.classList.add("animate-ping-once");
                                setTimeout(
                                  () =>
                                    button?.classList.remove(
                                      "animate-ping-once"
                                    ),
                                  300
                                );

                                handleLikeToggle(games.id.toString());
                              }
                            }}
                          >
                            <ThumbsUp
                              className={`h-5 w-5 transition-transform duration-300 ${
                                userLikes.includes(games.id.toString())
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          </Button>
                        </Tooltip>

                        <span className="text-stext-muted-foreground">
                          {games.ratings_count}
                        </span>
                      </div>
                    </div>

                    {/* Expanded content on hover */}
                    <div className="absolute right-0 left-0 pr-6 pl-6 mt-2 rounded-xl bg-card">
                      <div className="h-0 transition-all duration-300 transform origin-top scale-y-0 group-hover:scale-y-100 group-hover:h-auto">
                        {/* Genre */}
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Genre</span>
                          <span className="text-sm text-right">
                            {games.genres.map((genre) => genre.name).join(", ")}
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
            ))}
            {/* Detect end of the list */}
            <div ref={sentinelRef} className="h-1"></div>
          </div>
          {/* Loading animation */}
          {isLoading && <LoadingAnimation size={50} />}
        </main>
      </div>
    </div>
  );
}
