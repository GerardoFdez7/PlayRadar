"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Moon,
  Sun,
  Search,
  ThumbsUp,
  ThumbsDown,
  Swords,
  Compass,
  Gamepad2,
  Dice1Icon as DiceIcon,
  WalletCardsIcon as Cards,
  Target,
  GraduationCap,
  Users,
  Sword,
  Brush,
  Globe2,
  ChevronDown,
  //LogOut,
} from "lucide-react";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
import {
  getModoOscuro,
  toggleModoOscuro,
  setModoOscuro,
} from "../services/localStorage";
import { fetchGameTrailer, getSearchedGames, getGames } from "../services/api";
import { Game } from "../types/games.types";

const genres = [
  { name: "Action", slug: "action", icon: <Swords className="w-4 h-4" /> },
  {
    name: "Adventure",
    slug: "adventure",
    icon: <Compass className="w-4 h-4" />,
  },
  { name: "Arcade", slug: "arcade", icon: <Gamepad2 className="w-4 h-4" /> },
  {
    name: "Board Games",
    slug: "board Games",
    icon: <DiceIcon className="w-4 h-4" />,
  },
  { name: "Card", slug: "card", icon: <Cards className="w-4 h-4" /> },
  { name: "Casual", slug: "aasual", icon: <Target className="w-4 h-4" /> },
  {
    name: "Educational",
    slug: "educational",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  { name: "Family", slug: "family", icon: <Users className="w-4 h-4" /> },
  { name: "Fighting", slug: "fighting", icon: <Sword className="w-4 h-4" /> },
  { name: "Indie", slug: "indie", icon: <Brush className="w-4 h-4" /> },
  {
    name: "Massively Multiplayer",
    slug: "massively multiplayer",
    icon: <Globe2 className="w-4 h-4" />,
  },
];

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
  const [games, setGames] = useState<Game[]>(initialGames);
  const [nextUrl, setNextUrl] = useState<string | null>(initialNextUrl);

  // Search statuses
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [nextSearchUrl, setNextSearchUrl] = useState<string | null>(null);

  // Other statuses and refs (dark mode, filters, trailers, etc.)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Sentinel for the infinite scroll (single)
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Initialize dark mode on page load
  useEffect(() => {
    const darkMode = getModoOscuro();
    setIsDarkMode(darkMode);
    setModoOscuro(darkMode);
  }, []);
  const handleToggleMode = () => {
    const newMode = toggleModoOscuro();
    setIsDarkMode(newMode);
  };

  // Call the API and establish filters
  useEffect(() => {
    const displayGames = searchTerm.trim() ? searchResults : games;
    let updatedGames = [...displayGames];

    if (selectedGenreSlug) {
      updatedGames = updatedGames.filter((game) =>
        game.genres?.some((g) => g.slug === selectedGenreSlug)
      );
    }

    if (selectedPlatform !== "all") {
      updatedGames = updatedGames.filter((game) =>
        game.parent_platforms?.some((p) => p.platform.slug === selectedPlatform)
      );
    }

    if (sortBy === "likes") {
      updatedGames.sort(
        (a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0)
      );
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
                onClick={() => router.push("/")}
              />
            </div>
          </div>
          {/* Search bar */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 flex rounded-full justify-center max-w-3xl h-14 mx-8 mt-2">
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
            </div>
          </div>
          <Button
            size="icon"
            className="ml-4 mr-3 border-0 bg-transparent shadow-none hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 hover:scale-110"
            onClick={handleToggleMode}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 fill-white dark:stroke-white dark:fill-white transition-transform" />
            ) : (
              <Moon className="h-5 w-5 stroke-[1.5] stroke-black fill-black dark:stroke-white dark:fill-black transition-transform" />
            )}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-41 h-[calc(100vh-4rem)] ml-3 sticky top-16 overflow-y-auto ">
          <div className="p-4 ">
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
            <Select onValueChange={(value) => setSelectedPlatform(value)}>
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
            {filteredGames.map((games) => (
              <div
                key={games.id}
                className="group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-110"
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
                }}
              >
                <div className="aspect-video relative">
                  {/* Video al pasar el cursor */}
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
                        className="absolute bottom-2 right-2 z-20 bg-gray-700 bg-opacity-50 p-2 rounded-full"
                      >
                        {muted ? (
                          <MdVolumeOff className="w-6 h-6 opacity-50" />
                        ) : (
                          <MdVolumeUp className="w-6 h-6 opacity-50" />
                        )}
                      </button>
                    </>
                  )}

                  {/* Default image */}
                  <Image
                    src={games.background_image || videogameImage}
                    alt={games.name}
                    width={640}
                    height={360}
                    className="object-cover w-full h-full transition-all duration-500 group-hover:opacity-0"
                  />
                </div>

                {/* Card information */}
                <div className="mt-3">
                  {/* Platforms icons*/}
                  <div className="absolute left-5 flex gap-1">
                    {games.parent_platforms?.map((parent_platforms) => (
                      <span
                        key={parent_platforms.platform.slug}
                        className="w-6 h-6 flex items-center justify-center"
                      >
                        {parent_platforms.platform.slug === "pc" && (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                          </svg>
                        )}
                        {parent_platforms.platform.slug === "playstation" && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 35 25"
                            fill="currentColor"
                          >
                            <path d="m18.646 5.077c.044.289.069.622.069.96 0 .109-.003.218-.008.326l.001-.015c0 2.344-.007 4.688.006 7.032.655.34 1.427.549 2.245.57h.007c.022.001.048.001.074.001.521 0 1.011-.131 1.439-.362l-.016.008c.478-.268.867-.644 1.143-1.096l.008-.014c.295-.491.512-1.064.616-1.677l.004-.029c.08-.464.125-.998.125-1.542 0-.191-.006-.382-.017-.57l.001.026c-.013-1.131-.259-2.202-.692-3.171l.02.051c-.269-.559-.613-1.036-1.027-1.443l-.001-.001c-.389-.383-.824-.72-1.298-1l-.031-.017c-.979-.56-2.112-1.048-3.302-1.404l-.116-.03c-.75-.24-1.505-.47-2.262-.69-1.323-.375-2.652-.735-4.005-.987q0 11.2 0 22.393l5.065 1.607q.006-9.414 0-18.827c-.001-.018-.001-.039-.001-.06 0-.36.112-.693.304-.967l-.004.005c.115-.146.292-.24.49-.24.038 0 .074.003.11.01l-.004-.001c.234.043.44.143.609.286l-.002-.002c.235.224.397.523.446.858l.001.008zm-13.226 13.272c1.738-.621 3.475-1.249 5.216-1.866.007-.076.01-.165.01-.254 0-.034-.001-.069-.002-.103v.005c0-.865 0-1.73 0-2.594-2.202.777-4.4 1.563-6.602 2.342-.537.196-1.082.37-1.608.594-.675.272-1.254.581-1.795.943l.035-.022c-.243.156-.438.368-.569.619l-.004.009c-.065.135-.103.294-.103.461 0 .139.026.271.073.393l-.003-.007c.139.322.354.589.624.785l.005.004c.47.338 1.02.601 1.613.756l.035.008c1.548.53 3.332.835 5.187.835.117 0 .234-.001.351-.004h-.017c.995-.024 1.948-.129 2.876-.308l-.108.017c.014-.146.006-.293.008-.439 0-.732 0-1.463 0-2.194-.744.266-1.487.537-2.23.806-.244.101-.536.193-.837.26l-.037.007c-.406.087-.873.138-1.351.139h-.001c-.009 0-.021 0-.032 0-.42 0-.823-.072-1.198-.204l.025.008c-.15-.049-.271-.15-.344-.282l-.002-.003c-.007-.025-.011-.054-.011-.084 0-.102.047-.193.12-.254h.001c.188-.165.413-.294.66-.372l.013-.004zm25.184-1.68c-.436-.361-.949-.648-1.509-.831l-.033-.009c-.309-.098-.609-.22-.918-.314-1.432-.449-3.079-.708-4.786-.708-.036 0-.073 0-.109 0h.006c-.502.018-1.004.032-1.503.09-1.52.165-2.908.484-4.228.946l.132-.04q0 1.52 0 3.04c1.829-.64 3.654-1.287 5.482-1.928.551-.183 1.185-.288 1.844-.288h.052-.003c.018 0 .039-.001.06-.001.412 0 .808.071 1.176.201l-.025-.008c.148.048.269.147.343.276l.002.003c.005.024.008.051.008.079 0 .139-.075.261-.186.327l-.002.001c-.291.195-.629.352-.99.453l-.025.006q-3.85 1.374-7.699 2.745c-.054.01-.033.076-.038.114v2.834q5.06-1.819 10.121-3.635c.665-.218 1.21-.437 1.738-.685l-.092.039c.528-.245.979-.567 1.359-.959l.001-.001c.198-.209.32-.492.32-.804 0-.004 0-.008 0-.012v.001c-.034-.378-.22-.707-.497-.929l-.003-.002z" />
                          </svg>
                        )}
                        {parent_platforms.platform.slug === "xbox" && (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="m24 12c0-.001 0-.001 0-.002 0-3.618-1.606-6.861-4.144-9.054l-.015-.013c-1.91 1.023-3.548 2.261-4.967 3.713l-.004.004c.044.046.087.085.131.132 3.719 4.012 7.106 9.73 6.546 12.471 1.53-1.985 2.452-4.508 2.452-7.246 0-.002 0-.004 0-.006z" />
                            <path d="m12.591 3.955c1.68-1.104 3.699-1.833 5.872-2.022l.048-.003c-1.837-1.21-4.09-1.929-6.511-1.929-2.171 0-4.207.579-5.962 1.591l.058-.031c.658.567 2.837.781 5.484 2.4.143.089.316.142.502.142.189 0 .365-.055.513-.149l-.004.002z" />
                            <path d="m9.166 6.778c.046-.049.093-.09.138-.138-1.17-1.134-2.446-2.174-3.806-3.1l-.099-.064c-.302-.221-.681-.354-1.091-.354-.146 0-.288.017-.425.049l.013-.002c-2.398 2.198-3.896 5.344-3.896 8.84 0 2.909 1.037 5.576 2.762 7.651l-.016-.02c-1.031-2.547 2.477-8.672 6.419-12.862z" />
                            <path d="m12.084 9.198c-3.962 3.503-9.477 8.73-8.632 11.218 2.174 2.213 5.198 3.584 8.542 3.584 3.493 0 6.637-1.496 8.826-3.883l.008-.009c.486-2.618-4.755-7.337-8.744-10.91z" />
                          </svg>
                        )}
                        {parent_platforms.platform.slug === "nintendo" && (
                          <svg
                            className="w-8 h-8"
                            viewBox="0 0 19 14"
                            fill="currentColor"
                          >
                            <path d="m 8.088,13 1.837,0 C 11.613,13 13,11.613 13,9.925 l 0,-5.85 C 13,2.3875 11.613,1 9.925,1 L 8.05,1 C 8.013,1 7.975,1.037 7.975,1.075 l 0,11.85 C 7.9745,12.963 8.0125,13 8.088,13 Z m 2.287,-6.5995 c 0.6755,0 1.1995,0.5625 1.1995,1.199 0,0.676 -0.5625,1.2 -1.1995,1.2 -0.675,0 -1.2,-0.5245 -1.2,-1.2 C 9.1375,6.925 9.7,6.4005 10.375,6.4005 Z M 6.7,1 4.075,1 C 2.3875,1 1,2.3875 1,4.075 l 0,5.85 C 1,11.613 2.3875,13 4.075,13 L 6.7,13 c 0.037,0 0.075,-0.037 0.075,-0.0745 l 0,-11.8505 C 6.7755,1.037 6.7375,1 6.7,1 Z m -0.862,11.0255 -1.763,0 c -1.163,0 -2.1005,-0.9375 -2.1005,-2.1005 l 0,-5.85 c 0,-1.163 0.9375,-2.1005 2.1005,-2.1005 l 1.725,0 0.038,10.051 z M 2.875,4.5995 c 0,0.6375 0.4875,1.125 1.125,1.125 0.6375,0 1.125,-0.4875 1.125,-1.125 0,-0.6365 -0.4875,-1.125 -1.125,-1.125 -0.6375,0 -1.125,0.4885 -1.125,1.125 z" />
                          </svg>
                        )}
                        {parent_platforms.platform.slug === "mac" && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 26"
                            fill="currentColor"
                          >
                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                          </svg>
                        )}
                        {parent_platforms.platform.slug === "linux" && (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="m8.782 5.505c-.092.005-.17.06-.207.139l-.001.002q-.06.127-.114.127-.067.014-.067-.067 0-.16.254-.201zm1.164.187q-.054.014-.154-.087c-.041-.044-.099-.072-.163-.072-.026 0-.05.004-.073.012h.002q.32-.147.429.026c.009.013.014.028.014.045 0 .035-.022.064-.053.075h-.001zm-4.7 5.719c-.006-.002-.012-.003-.019-.003-.028 0-.052.018-.061.042-.022.046-.042.102-.058.16l-.002.008c-.019.069-.044.129-.076.185l.002-.004c-.042.065-.086.122-.135.175l.001-.001q-.134.147-.014.16.054.014.167-.094c.071-.066.128-.146.166-.236l.002-.004q.014-.04.026-.094c.007-.031.016-.057.027-.083l-.001.003c.009-.017.016-.037.02-.058v-.002c.004-.016.006-.034.006-.053v-.04l-.014-.034zm11.45 4.808q0-.24-.737-.56.054-.201.101-.368c.029-.099.053-.217.066-.338l.001-.01q.02-.181.04-.288c.008-.053.013-.115.013-.177 0-.044-.002-.087-.007-.13v.005q-.014-.194-.014-.261c-.009-.11-.026-.21-.05-.308l.003.013q-.047-.228-.054-.274t-.067-.334-.074-.355c-.129-.526-.346-.987-.638-1.391l.008.012c-.248-.406-.571-.742-.952-.997l-.012-.007c.309.314.565.682.753 1.087l.01.024c.511.775.815 1.726.815 2.748 0 .345-.035.682-.101 1.007l.005-.032c-.061.32-.337.558-.669.56q-.415.054-.515-.248c-.07-.288-.11-.619-.11-.959 0-.057.001-.113.003-.169v.008c0-.009 0-.02 0-.032 0-.497-.056-.98-.163-1.445l.008.043c-.084-.375-.174-.684-.28-.986l.019.062c-.078-.236-.166-.438-.271-.629l.01.019q-.121-.207-.207-.328c-.053-.075-.111-.141-.174-.2l-.001-.001-.095-.094c-.114-.533-.257-.994-.436-1.437l.021.058c-.106-.286-.24-.534-.402-.759l.006.009c-.108-.13-.212-.274-.305-.426l-.009-.016c-.136-.211-.217-.468-.217-.745 0-.183.035-.357.099-.517l-.003.009c.052-.128.083-.277.083-.433 0-.082-.008-.161-.024-.238l.001.008q-.074-.228-.596-.334c-.227-.061-.425-.143-.609-.247l.013.007c-.135-.078-.291-.15-.455-.208l-.02-.006q-.107-.014-.147-.348c-.005-.043-.008-.093-.008-.143 0-.196.042-.381.118-.548l-.003.008c.069-.206.256-.354.479-.362h.001c.03-.005.065-.008.1-.008.267 0 .494.168.582.404l.001.004c.068.132.108.287.108.452 0 .116-.02.228-.056.332l.002-.007q-.147.254-.026.355t.4.006q.174-.054.174-.48v-.498c-.038-.251-.101-.476-.188-.69l.007.02c-.063-.162-.159-.299-.281-.408l-.001-.001c-.09-.08-.194-.147-.307-.198l-.008-.003c-.103-.042-.224-.077-.35-.099l-.011-.002q-1.433.107-1.192 1.794c.002.019.003.04.003.062 0 .049-.006.097-.018.143l.001-.004c-.105-.088-.241-.141-.39-.141-.002 0-.004 0-.006 0-.058-.006-.124-.009-.192-.009-.088 0-.175.006-.26.017l.01-.001q-.167.026-.207-.067c.003-.05.005-.109.005-.168 0-.376-.081-.733-.226-1.054l.007.016c-.098-.251-.326-.43-.6-.455h-.003c-.005 0-.011 0-.017 0-.244 0-.452.151-.537.364l-.001.004c-.122.232-.202.505-.22.794v.006c-.001.02-.001.044-.001.068 0 .151.018.299.051.44l-.003-.013c.036.189.096.357.179.512l-.005-.01q.114.207.207.181c.095-.032.171-.099.213-.185l.001-.002q.054-.121-.094-.107-.094 0-.207-.194c-.075-.129-.121-.283-.127-.447v-.002c-.002-.02-.003-.043-.003-.067 0-.159.046-.307.126-.432l-.002.003c.088-.117.228-.192.384-.192.025 0 .05.002.074.006h-.003c.17.011.31.124.361.279l.001.003c.08.152.127.332.127.522v.01c0 .1-.007.199-.021.295l.001-.011c-.164.104-.302.233-.412.384l-.003.004c-.098.13-.221.235-.362.311l-.006.003q-.261.154-.274.167c-.099.096-.171.219-.206.356l-.001.005c-.006.019-.01.04-.01.062 0 .078.045.145.11.177l.001.001c.128.074.239.16.335.26.076.077.147.16.21.248l.004.006c.063.08.147.14.244.173l.004.001c.141.053.304.085.474.087h.001c.03.001.066.001.101.001.452 0 .887-.074 1.293-.21l-.029.008q.026-.014.308-.094t.462-.141c.154-.054.284-.113.409-.181l-.013.007c.116-.052.211-.132.28-.232l.001-.002q.121-.187.268-.107c.043.025.074.065.087.112v.001c.002.011.004.025.004.038 0 .046-.017.089-.044.122-.055.066-.131.112-.219.127h-.002c-.312.101-.563.199-.807.308l.05-.02q-.489.207-.61.261c-.269.129-.583.236-.911.303l-.027.005c-.137.018-.295.029-.456.029-.214 0-.424-.019-.628-.054l.022.003q-.134-.026-.121.026c.063.099.138.183.226.253l.002.002c.214.185.495.298.802.298.034 0 .067-.001.1-.004h-.004c.176-.013.339-.046.494-.098l-.014.004c.191-.06.35-.124.503-.197l-.023.01q.228-.107.449-.234t.4-.228c.089-.051.197-.105.308-.152l.02-.008c.048-.025.105-.04.166-.04.024 0 .048.002.071.007h-.002c.062.024.106.08.114.146v.001c-.001.022-.006.042-.014.061v-.001c-.013.027-.031.05-.053.067-.024.02-.05.04-.077.058l-.003.002q-.04.026-.114.067t-.121.06-.134.067c-.035.021-.077.041-.121.058l-.006.002c-.344.185-.64.38-.916.599l.012-.01c-.26.207-.551.399-.86.561l-.03.015c-.098.057-.215.091-.34.091-.115 0-.224-.028-.319-.079l.004.002c-.34-.268-.622-.592-.835-.962l-.009-.016q-.294-.415-.334-.294c-.009.034-.014.073-.014.114v.021-.001c-.011.278-.084.537-.205.767l.005-.01q-.201.422-.395.743c-.132.224-.23.485-.28.763l-.002.014c-.015.07-.024.15-.024.232 0 .227.066.439.181.617l-.003-.005q-.308.08-.837 1.206c-.285.546-.507 1.178-.633 1.845l-.007.043q-.026.24-.02.924c.007.064.012.139.012.215 0 .205-.031.403-.089.59l.004-.014q-.107.32-.388.04c-.298-.327-.48-.764-.48-1.244 0-.005 0-.011 0-.016v.001c-.004-.056-.007-.121-.007-.187 0-.199.022-.393.064-.58l-.003.018q.054-.254-.014-.24c-.024.016-.043.039-.053.066v.001c-.131.289-.208.627-.208.982 0 .458.127.886.347 1.252l-.006-.011c.083.152.196.277.331.373l.003.002q.268.214.32.268c.426.424.881.821 1.359 1.187l.033.025q1.125.904 1.246 1.025c.137.128.226.307.234.507v.002c.001.012.001.027.001.042 0 .45-.354.817-.799.838h-.002c.133.231.261.426.4.612l-.012-.016c.157.206.285.445.37.703l.005.017c.061.249.095.534.095.828 0 .041-.001.082-.002.122v-.006q.616-.32.094-1.232c-.042-.082-.089-.152-.142-.216l.002.002q-.087-.107-.127-.16t-.026-.08c.044-.057.103-.101.172-.126l.003-.001c.031-.015.068-.023.107-.023.061 0 .118.021.162.057q.616.696 2.223.48h.006c.96 0 1.814-.454 2.359-1.158l.005-.007q.308-.509.455-.4.16.08.134.696c-.062.46-.17.876-.321 1.27l.013-.038c-.055.114-.087.249-.087.39 0 .039.002.078.007.117v-.005q.04.194.32.207.04-.254.194-1.031c.077-.337.141-.749.178-1.168l.003-.038c.001-.028.001-.061.001-.094 0-.315-.032-.622-.093-.919l.005.029c-.065-.361-.101-.777-.101-1.201 0-.035 0-.069.001-.103v.005c0-.013-.001-.028-.001-.044 0-.341.116-.655.311-.904l-.002.003c.153-.151.363-.245.595-.245.031 0 .062.002.092.005h-.004c0-.004 0-.008 0-.012 0-.312.188-.579.458-.695l.005-.002c.209-.101.454-.161.714-.161.091 0 .18.007.267.021l-.01-.001c.309.026.589.135.822.304l-.005-.003zm-8.41-11.076c.009-.043.015-.093.015-.144 0-.092-.018-.18-.05-.261l.002.005q-.074-.174-.154-.201-.121-.026-.121.094c.01.036.034.064.066.08h.001q.134 0 .094.201-.04.268.107.268c.002 0 .004.001.006.001.019 0 .035-.016.035-.035 0-.002 0-.005-.001-.007zm5.611 2.64c-.012-.062-.043-.115-.087-.154-.049-.035-.108-.058-.172-.067h-.002c-.073-.012-.139-.038-.196-.075l.002.001c-.049-.03-.091-.066-.127-.107l-.001-.001q-.06-.067-.094-.107l-.074-.087c-.016-.02-.033-.038-.053-.053h-.001q-.014-.006-.054.02-.187.214.094.582c.122.193.302.341.515.419l.007.002c.006.001.014.001.021.001.076 0 .141-.044.173-.107l.001-.001c.034-.055.055-.122.055-.194 0-.027-.003-.052-.008-.077v.002zm-2.383-2.852c0-.001 0-.003 0-.004 0-.174-.084-.328-.213-.424l-.001-.001q-.08-.054-.121-.04c-.006-.001-.012-.001-.019-.001-.033 0-.064.01-.089.028-.008.006-.013.016-.013.027s.005.021.013.027c.018.018.041.032.066.04h.001q.187.054.24.415 0 .04.107-.026.028-.029.028-.04zm.72-3.12c-.004-.027-.016-.05-.034-.067-.034-.036-.072-.067-.114-.091l-.002-.001q-.087-.054-.127-.08c-.078-.1-.189-.172-.316-.2l-.004-.001h-.001c-.068 0-.127.041-.153.1v.001c-.013.032-.021.07-.021.109 0 .023.003.046.008.068v-.002c.006.022.009.047.009.072 0 .034-.006.066-.016.097l.001-.002c-.019.054-.046.101-.08.141v-.001c-.03.035-.056.075-.078.117l-.002.004q-.014.034.04.114c.014.013.033.021.054.021s.039-.008.054-.021q.054-.04.147-.121c.057-.05.124-.091.196-.119l.005-.002c.027-.01.058-.015.09-.015.011 0 .022.001.032.002h-.001.006c.069 0 .136-.01.199-.028l-.005.001c.053-.012.096-.047.118-.094v-.001zm7.566 17.959c.159.092.296.2.414.327l.001.001c.083.084.141.194.16.317v.003c.002.02.003.044.003.068 0 .084-.013.164-.038.239l.002-.005c-.044.118-.115.217-.206.294l-.001.001c-.095.088-.198.173-.304.254l-.01.007c-.115.083-.245.166-.382.239l-.018.009q-.248.134-.422.221t-.429.207-.362.174c-.436.23-.81.479-1.158.76l.013-.01c-.374.287-.703.567-1.018.863l.007-.006c-.241.164-.538.262-.858.262-.018 0-.037 0-.055-.001h.003c-.068.007-.147.011-.227.011-.349 0-.681-.076-.98-.211l.015.006c-.157-.077-.289-.183-.394-.312l-.002-.002c-.083-.099-.156-.212-.216-.332l-.005-.01c-.066-.117-.168-.208-.29-.259l-.004-.001c-.181-.08-.392-.127-.614-.127-.005 0-.011 0-.016 0h.001q-.59-.014-1.741-.014-.254 0-.763.02t-.777.034c-.384.004-.749.077-1.086.208l.021-.007c-.276.098-.515.234-.725.404l.005-.004c-.168.147-.36.274-.567.375l-.015.007c-.193.098-.42.156-.661.156-.021 0-.041 0-.062-.001h.003c-.553-.083-1.051-.228-1.518-.429l.04.015c-.537-.212-1.191-.41-1.864-.559l-.091-.017q-.254-.054-.683-.127t-.67-.121-.529-.127c-.17-.043-.32-.109-.454-.198l.006.003c-.098-.065-.175-.153-.226-.257l-.002-.004c-.028-.098-.045-.21-.045-.327 0-.206.051-.4.141-.57l-.003.007c.094-.207.176-.45.235-.703l.005-.027c.001-.019.001-.041.001-.063 0-.168-.02-.331-.057-.487l.003.014q-.067-.32-.134-.569c-.038-.134-.06-.288-.06-.448 0-.014 0-.029.001-.043v.002c0-.006 0-.014 0-.021 0-.133.054-.253.141-.34.197-.119.435-.189.69-.189.026 0 .052.001.077.002h-.004.039c.275 0 .537-.059.773-.165l-.012.005c.221-.122.407-.278.557-.465l.003-.004c.102-.172.163-.379.163-.6 0-.029-.001-.058-.003-.087v.004c.063.136.1.296.1.464 0 .398-.205.747-.516.949l-.004.003c-.244.139-.536.221-.848.221-.093 0-.184-.007-.273-.021l.01.001q-.455-.04-.576.134-.174.201.067.763c.036.096.072.175.113.251l-.005-.011q.08.16.114.24c.025.065.046.142.059.221l.001.007c.011.059.018.127.018.197 0 .034-.002.068-.005.102v-.004c-.034.246-.115.467-.232.664l.004-.008c-.117.18-.187.401-.187.638v.002q.04.228.495.348.268.08 1.132.248t1.333.274q.32.08.991.294t1.105.308c.159.041.342.064.53.064.075 0 .15-.004.223-.011l-.009.001c.336-.027.635-.165.865-.376l-.001.001c.173-.163.287-.386.308-.636v-.004c.001-.025.001-.055.001-.085 0-.249-.037-.489-.107-.716l.005.017c-.07-.267-.157-.499-.264-.718l.01.022q-.134-.261-.268-.489c-.744-1.231-1.491-2.287-2.304-3.287l.041.052q-.91-.991-1.514-.536-.147.121-.201-.201c-.02-.111-.031-.239-.031-.37 0-.049.002-.097.005-.146v.007c.005-.251.054-.49.138-.71l-.005.014c.097-.243.205-.45.329-.645l-.009.015c.106-.16.204-.344.286-.537l.009-.023q.107-.282.355-.964t.395-1.045c.136-.326.27-.595.419-.853l-.019.037c.149-.275.322-.511.524-.721l-.001.001c.657-.75 1.213-1.611 1.635-2.546l.026-.065q-.16-1.5-.214-4.151c-.004-.079-.007-.171-.007-.263 0-.635.12-1.242.339-1.799l-.012.033c.303-.621.797-1.11 1.405-1.398l.018-.008c.37-.18.804-.284 1.263-.284.046 0 .091.001.137.003h-.006c.025 0 .055-.001.085-.001.475 0 .935.066 1.37.19l-.035-.009c.455.117.853.309 1.202.563l-.01-.007c.539.42.958.969 1.216 1.601l.009.026c.252.523.399 1.138.399 1.787 0 .066-.002.132-.005.197v-.009c-.002.076-.004.165-.004.255 0 .932.148 1.83.421 2.672l-.017-.061c.379 1.143.99 2.121 1.781 2.92l-.001-.001c.546.621.995 1.344 1.315 2.133l.018.051c.337.735.614 1.593.788 2.487l.012.073c.048.253.076.544.076.842 0 .102-.003.203-.01.303l.001-.014c-.014.271-.071.524-.166.759l.006-.016q-.121.268-.268.294c-.132.05-.24.139-.313.252l-.002.003q-.181.228-.362.475c-.146.185-.327.336-.533.444l-.009.004c-.215.119-.471.189-.743.189-.026 0-.052-.001-.077-.002h.004c-.153-.007-.297-.031-.435-.07l.013.003c-.119-.034-.221-.097-.301-.181-.062-.064-.121-.131-.177-.202l-.004-.005c-.055-.079-.106-.169-.15-.263l-.005-.011q-.094-.194-.121-.261-.294-.495-.549-.4t-.375.656c-.026.14-.041.3-.041.464 0 .299.049.586.14.854l-.006-.019c.09.402.141.864.141 1.338 0 .451-.046.89-.135 1.315l.007-.042c-.031.12-.048.259-.048.401 0 .352.108.68.292.95l-.004-.006c.203.272.524.445.885.445.032 0 .065-.001.096-.004h-.004c.44-.032.833-.207 1.141-.477l-.002.002c.356-.311.748-.604 1.161-.867l.039-.023c.389-.205.848-.398 1.324-.551l.062-.017c.393-.118.735-.285 1.044-.497l-.013.008q.32-.248.248-.462c-.067-.164-.184-.295-.331-.38l-.004-.002c-.198-.122-.426-.229-.667-.308l-.023-.007c-.305-.109-.544-.34-.661-.633l-.003-.007c-.127-.266-.202-.579-.202-.908 0-.022 0-.044.001-.066v.003c-.002-.021-.003-.045-.003-.07 0-.218.079-.418.211-.572l-.001.001c.006.272.045.532.112.78l-.005-.023c.054.209.12.389.202.561l-.008-.018c.076.146.167.272.275.382.085.093.177.176.276.251l.005.004q.107.074.288.174t.218.125z" />
                          </svg>
                        )}
                        {parent_platforms.platform.slug === "ios" && (
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 30 32"
                            fill="currentColor"
                          >
                            <path d="M1.119 12.633v10.576h2.49v-10.576h-2.49zM11.882 10.768c2.553 0 4.193 2.040 4.193 5.232 0 3.217-1.64 5.257-4.193 5.257-2.578 0-4.206-2.040-4.206-5.257 0-3.192 1.627-5.232 4.206-5.232zM25.45 8.578c-3.129 0-5.357 1.727-5.357 4.293 0 2.040 1.264 3.317 3.918 3.93l1.865 0.451c1.815 0.413 2.553 1.014 2.553 2.053 0 1.202-1.214 2.053-2.941 2.053-1.765 0-3.092-0.864-3.229-2.19h-2.503c0.1 2.654 2.278 4.281 5.582 4.281 3.492 0 5.683-1.715 5.683-4.443 0-2.14-1.252-3.354-4.155-4.018l-1.665-0.376c-1.765-0.426-2.491-0.989-2.491-1.94 0-1.202 1.101-2.003 2.729-2.003 1.64 0 2.766 0.814 2.891 2.153h2.453c-0.063-2.528-2.153-4.243-5.332-4.243zM11.882 8.578c-4.205-0-6.834 2.866-6.834 7.422 0 4.594 2.628 7.447 6.834 7.447 4.181 0 6.821-2.854 6.821-7.447 0-4.556-2.641-7.422-6.822-7.422zM2.357 8.553c-0.007-0-0.016-0-0.024-0-0.747 0-1.352 0.605-1.352 1.352s0.605 1.352 1.352 1.352c0.009 0 0.017-0 0.026-0l-0.001 0c0.011 0 0.024 0.001 0.037 0.001 0.747 0 1.352-0.605 1.352-1.352s-0.605-1.352-1.352-1.352c-0.013 0-0.026 0-0.039 0.001l0.002-0z"></path>
                          </svg>
                        )}
                        {parent_platforms.platform.slug === "android" && (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M14.97535,3.01886l.95982-1.73159a.19342.19342,0,0,0-.33833-.18756l-.97045,1.75078a6.54141,6.54141,0,0,0-5.25275,0L8.40316,1.09971a.19342.19342,0,0,0-.33833.18756l.95985,1.7316A5.54614,5.54614,0,0,0,5.93152,7.89522h12.137A5.54615,5.54615,0,0,0,14.97535,3.01886ZM9.19911,5.67446a.5068.5068,0,1,1,.5068-.5068A.50737.50737,0,0,1,9.19911,5.67446Zm5.60178,0a.5068.5068,0,1,1,.5068-.5068A.50737.50737,0,0,1,14.80089,5.67446Zm-8.86946,11.497a1.46713,1.46713,0,0,0,1.46713,1.46713h.9736v3.00095a1.36046,1.36046,0,1,0,2.72091,0V18.63859h1.81386v3.00095a1.36046,1.36046,0,1,0,2.72091,0V18.63859h.97364a1.46713,1.46713,0,0,0,1.46713-1.46713V8.37532H5.93143ZM4.06415,8.14191A1.362,1.362,0,0,0,2.7037,9.50237v5.66846a1.36046,1.36046,0,1,0,2.72091,0V9.50237A1.362,1.362,0,0,0,4.06415,8.14191Zm15.8717,0a1.362,1.362,0,0,0-1.36046,1.36046v5.66846a1.36046,1.36046,0,1,0,2.72091,0V9.50237A1.362,1.362,0,0,0,19.93585,8.14191Z"></path>
                          </svg>
                        )}
                      </span>
                    ))}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{games.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button size="icon" variant="ghost" className="mr-4">
                        {/* "Play later" */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      </Button>
                      <div className="flex items-center gap-1">
                        <ThumbsDown className="h-5 w-5" />
                        <ThumbsUp className="h-5 w-5" />
                        <span className="text-s text-muted-foreground">
                          {games.ratings_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Detect end of the list */}
            <div ref={sentinelRef} className="h-1"></div>

            {/* Loading animation */}
            {isLoading && (
              <div className="col-span-2 flex justify-center">
                <div className="w-50 h-50">
                  <DotLottieReact
                    src="https://lottie.host/7b4dd0bd-fedc-41a6-b542-8d7c1950999a/3fmNE4stxF.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}