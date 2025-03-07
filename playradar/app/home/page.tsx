"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  ThumbsUp,
  ThumbsDown,
  Swords,
  Compass,
  Gamepad2,
  WalletCardsIcon as Cards,
  Target,
  GraduationCap,
  Users,
  Brush,
  ChevronDown,
} from "lucide-react";
import {
  MdVolumeOff,
  MdVolumeUp,
  MdOutlineSportsBasketball,
} from "react-icons/md";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { FaGun } from "react-icons/fa6";
import { GiFloatingPlatforms } from "react-icons/gi";
import LoadingAnimation from "@/components/ui/loader";
import {
  PiBoxingGloveBold,
  PiStrategy,
  PiCubeTransparentLight,
} from "react-icons/pi";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import radarImage from "./radar.png";
import videogameImage from "./placeholder.png";
import ModeToggle from "@/components/features/themeSelector";
import { fetchGameTrailer, getSearchedGames, getGames } from "../services/api";
import { Game } from "../types/games.types";
import { auth } from "../lib/firebase";
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
} from "@/components/ui/platforms";
import Footer from "@/app/components/layout/footer";
import Plus from "@/components/ui/plus";
import Avatar from "@/components/ui/avatar";
import { useGamePreferences } from "../hooks/useGamePreferences";

const genres = [
  { name: "Action", slug: "action", icon: <Swords className="w-4 h-4" /> },
  {
    name: "Fighting",
    slug: "fighting",
    icon: <PiBoxingGloveBold className="w-4 h-4" />,
  },
  { name: "Shooter", slug: "shooter", icon: <FaGun className="w-4 h-4" /> },
  {
    name: "Platformer",
    slug: "platformer",
    icon: <GiFloatingPlatforms className="w-4 h-4" />,
  },
  {
    name: "Sports",
    slug: "sports",
    icon: <MdOutlineSportsBasketball className="w-4 h-4" />,
  },
  {
    name: "Strategy",
    slug: "strategy",
    icon: <PiStrategy className="w-4 h-4" />,
  },
  {
    name: "Simulation",
    slug: "simulation",
    icon: <PiCubeTransparentLight className="w-4 h-4" />,
  },
  {
    name: "Adventure",
    slug: "adventure",
    icon: <Compass className="w-4 h-4" />,
  },
  { name: "Arcade", slug: "arcade", icon: <Gamepad2 className="w-4 h-4" /> },
  { name: "Card", slug: "card", icon: <Cards className="w-4 h-4" /> },
  { name: "Casual", slug: "casual", icon: <Target className="w-4 h-4" /> },
  {
    name: "Educational",
    slug: "educational",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    name: "Puzzle",
    slug: "puzzle",
    icon: <IoExtensionPuzzleOutline className="w-4 h-4" />,
  },
  { name: "Family", slug: "family", icon: <Users className="w-4 h-4" /> },
  { name: "Indie", slug: "indie", icon: <Brush className="w-4 h-4" /> },
];

const platformSlugToId: { [key: string]: string } = {
  pc: "1",
  playstation: "2",
  xbox: "3",
  nintendo: "7",
  linux: "6",
  mac: "5",
  ios: "4",
  android: "8",
};

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

    // Solo hacer fetch si NO estamos en modo búsqueda
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
    <div className="min-h-screen bg-gray-300 dark:bg-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter] ">
        <div className="flex h-16 items-center justify-between py-12 px-4 max-w-none">
          {/* Logo */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-[85px] h-[85px] cursor-pointer ml-3">
              <Image
                src={radarImage}
                alt="Radar"
                className="w-full h-full object-contain mt-2"
                onClick={() => window.location.reload()}
              />
            </div>
          </div>
          {/* Search bar */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 flex rounded-full justify-center max-w-3xl h-14 mx-8 mt-2 mr-24">
            <div className="relative w-full h-full flex items-center">
              <div className="absolute left-2 flex items-center">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                placeholder="Search games"
                className="pl-8 w-full border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 outline-none"
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
          <div className="absolute right-1 mr-20">
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
          </div>
          {/* Theme button */}
          <div className="ml-4 mr-3">
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-41 h-[calc(100vh-4rem)] ml-3 sticky top-16 overflow-y-auto flex flex-col">
          <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 mt-3">Genres</h2>
            <nav className="space-y-2">
              {genres.map((genre) => (
                <button
                  key={genre.slug}
                  onClick={() =>
                    setSelectedGenreSlug((prev) =>
                      prev === genre.slug ? null : genre.slug
                    )
                  }
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedGenreSlug === genre.slug
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <span className="mr-2">{genre.icon}</span>
                  {genre.name}
                </button>
              ))}
            </nav>
          </div>
          {/* Footer */}
          <Footer className="w-[10vw]" />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 mr-3">
          <h1 className="text-5xl font-bold font-playRadar mb-3 ">PlayRadar</h1>
          <p className="text-lg mb-6">Scroll, click, play… repeat!</p>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[180px] border border-gray-400">
                <SelectValue placeholder={"Order by"} />
                <ChevronDown className="h-5 w-5 opacity-80" />
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
                <ChevronDown className="h-5 w-5 opacity-80" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames?.map((games) => (
              <div
                key={games.id}
                className="group relative bg-card rounded-xl transition-all duration-300 hover:scale-110 overflow-visible hover:z-[40]"
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
                <div className="aspect-video relative">
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
                        className="object-cover w-full h-full absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-100 opacity-0"
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
                        className="absolute bottom-2 right-2 z-30 bg-gray-700/50 p-2 rounded-full hover:bg-gray-700/75 transition-all"
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
                        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 isolate"
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
                        <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
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
                  <div className="absolute left-5 flex gap-1">
                    {games.parent_platforms?.map((parent_platforms) => (
                      <span
                        key={parent_platforms.platform.slug}
                        className="w-6 h-6 flex items-center justify-center"
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
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate ">{games.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
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
                          className="mr-4"
                          onClick={() => {
                            if (!user) {
                              setActiveTooltip({
                                type: "play-later",
                                gameId: games.id,
                              });
                            } else {
                              alert("Logged in");
                            }
                          }}
                        >
                          <Plus />
                        </Button>
                      </Tooltip>

                      {/* Like and Dislike */}
                      <div className="flex items-center gap-1">
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
                                // Animation
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
                                // Animation
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
                    <div className="absolute left-0 right-0 bg-card mt-2 pr-6 pl-6 rounded-xl">
                      <div className="transition-all duration-300 transform origin-top scale-y-0 h-0 group-hover:scale-y-100 group-hover:h-auto">
                        {/* Genre */}
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Genre</span>
                          <span className="text-sm text-right">
                            {games.genres.map((genre) => genre.name).join(", ")}
                          </span>
                        </div>
                        {/* Line */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 dark:via-gray-200 to-transparent my-2" />
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
