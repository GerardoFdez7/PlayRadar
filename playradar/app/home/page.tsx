"use client";

import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Search,
  ThumbsUp,
  Heart,
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
  LogOut,
} from "lucide-react";

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
import black_myth_wukong from "./black-myth-wukong.jpg";
import the_witcher_3 from "./The-Witcher-3-Wild-Hunt.jpg";
import grand_theft_auto_v from "./Grand-Theft-Auto-V1.jpg";
import cyberpunk_2077 from "./Cyberpunk2077.jpg";
import elden_ring from "./elden-ring-portada.jpg";
import hogwarts_legacy from "./hogwarts-legacy.jpg";
import starfield from "./Starfield.jpg";
import resident_evil_4_remake from "./Resident-Evil-4-Remake.jpg";
import baldurs_gate_3 from "./baldurs-gate-3.jpg";
import armored_core_vi from "./Armored-Core-VI-Fires-of-Rubicon.jpg";
import {
  getModoOscuro,
  toggleModoOscuro,
  setModoOscuro,
} from "../services/localStorage";

const genres = [
  { name: "Action", icon: <Swords className="w-4 h-4" /> },
  { name: "Adventure", icon: <Compass className="w-4 h-4" /> },
  { name: "Arcade", icon: <Gamepad2 className="w-4 h-4" /> },
  { name: "Board Games", icon: <DiceIcon className="w-4 h-4" /> },
  { name: "Card", icon: <Cards className="w-4 h-4" /> },
  { name: "Casual", icon: <Target className="w-4 h-4" /> },
  { name: "Educational", icon: <GraduationCap className="w-4 h-4" /> },
  { name: "Family", icon: <Users className="w-4 h-4" /> },
  { name: "Fighting", icon: <Sword className="w-4 h-4" /> },
  { name: "Indie", icon: <Brush className="w-4 h-4" /> },
  { name: "Massively Multiplayer", icon: <Globe2 className="w-4 h-4" /> },
];

const games = [
  {
    id: 1,
    title: "Grand Theft Auto V",
    image: grand_theft_auto_v,
    platforms: ["windows", "playstation", "xbox"],
    likes: 1500,
  },
  {
    id: 2,
    title: "The Witcher 3: Wild Hunt",
    image: the_witcher_3,
    platforms: ["windows", "playstation", "xbox", "nintendo"],
    likes: 2000,
  },
  {
    id: 3,
    title: "Black Myth: Wukong",
    image: black_myth_wukong,
    platforms: ["windows", "playstation", "xbox", "apple", "linux"],
    likes: 1800,
  },
  {
    id: 4,
    title: "Cyberpunk 2077",
    image: cyberpunk_2077,
    platforms: ["windows", "playstation", "xbox"],
    likes: 1200,
  },
  {
    id: 5,
    title: "Elden Ring",
    image: elden_ring,
    platforms: ["windows", "playstation", "xbox"],
    likes: 2500,
  },
  {
    id: 6,
    title: "Hogwarts Legacy",
    image: hogwarts_legacy,
    platforms: ["windows", "playstation", "xbox", "nintendo"],
    likes: 1700,
  },
  {
    id: 7,
    title: "Starfield",
    image: starfield,
    platforms: ["windows", "xbox"],
    likes: 1400,
  },
  {
    id: 8,
    title: "Resident Evil 4 Remake",
    image: resident_evil_4_remake,
    platforms: ["windows", "playstation", "xbox"],
    likes: 2100,
  },
  {
    id: 9,
    title: "Baldur's Gate 3",
    image: baldurs_gate_3,
    platforms: ["windows", "playstation"],
    likes: 3000,
  },
  {
    id: 10,
    title: "Armored Core VI: Fires of Rubicon",
    image: armored_core_vi,
    platforms: ["windows", "playstation", "xbox"],
    likes: 1300,
  },
];

export default function Home() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("likes");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredGames, setFilteredGames] = useState(games);

  useEffect(() => {
    // Inicializar el modo oscuro al cargar la página
    const darkMode = getModoOscuro();
    setIsDarkMode(darkMode);
    setModoOscuro(darkMode);
  }, []);

  const handleToggleMode = () => {
    const newMode = toggleModoOscuro();
    setIsDarkMode(newMode);
  };

  useEffect(() => {
    let updatedGames = [...games];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      updatedGames = updatedGames.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por plataforma
    if (selectedPlatform !== "all") {
      updatedGames = updatedGames.filter((game) =>
        game.platforms.includes(selectedPlatform)
      );
    }

    // Ordenar juegos
    if (sortBy === "likes") {
      updatedGames.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "name") {
      updatedGames.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredGames(updatedGames);
  }, [selectedPlatform, sortBy, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          <div className="w-[50px] h-[50px] ml-2 mr-20">
            <Image src={radarImage} alt="Radar" width={50} height={50} />
          </div>
          <div className="flex-1 flex items-center ml-5">
            <div className="relative flex-1 max-w-2xl ml-20">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button size="icon" className="ml-4" onClick={handleToggleMode}>
            {isDarkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Genres</h2>
            <nav className="space-y-2">
              {genres.map((genre) => (
                <button
                  key={genre.name}
                  onClick={() => setSelectedGenre(genre.name)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedGenre === genre.name
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="mr-2">{genre.icon}</span>
                  {genre.name}
                </button>
              ))}
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/login")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-6">Games</h1>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Order by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="likes">Likes</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="release">Release Date</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedPlatform(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="windows">PC</SelectItem>
                <SelectItem value="playstation">PlayStation</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="nintendo">Nintendo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video relative">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={640}
                    height={360}
                    className="object-cover w-full h-full"
                  />

                  {/* Informacion de la tarjeta */}
                  <div className="mt-3">
                    {/* Platforms icons*/}
                    <div className="absolute left-5 flex gap-1">
                      {game.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="w-5 h-5 flex items-center justify-center rounded"
                        >
                          {platform === "windows" && (
                            <svg
                              className="w-3 h-3"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                            </svg>
                          )}
                          {platform === "playstation" && (
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M8.984 2.596v17.547l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.18.76.814.76 1.505v5.875c2.441 1.193 4.362-.002 4.362-3.152 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.393-1.502zm4.656 16.241l6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.499v-2.385l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.029 5.437.661 1.848.601 2.041 1.472 1.576 2.072s-1.622 1.036-1.622 1.036l-8.544 3.107v-2.297l.02-.023zM1.999 18.674c-2.31-.586-2.657-1.784-1.765-2.234.797-.41 2.154-.573 3.622-.506l2.942.187V18.5c-1.033-.018-2.164-.069-3.201-.165-1.244-.109-1.228.493-.108.724.988.2 2.395.314 3.635.346l-.01 2.36c-.277.013-.574.023-.874.023-1.758 0-3.279-.225-4.241-.5v-2.614z" />
                            </svg>
                          )}
                          {platform === "xbox" && (
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.002 17.48 24 14.861 24 12.004c0-3.34-1.365-6.362-3.57-8.536 0 0-.027-.022-.075-.042-1.197-.459-3.61-.196-5.093 3.201zm-9.523 12.912c-1.525-2.729 3.754-10.155 6.119-12.912-1.48-3.397-3.889-3.66-5.093-3.201-.048.02-.075.042-.075.042C4.365 5.642 3 8.664 3 12.004c0 2.854.998 5.473 2.739 7.535zM12 3.269c-2.419 1.153-3.951 1.004-4.246.963-.508-.071-1.03-.01-1.03-.01-1.458.146-2.809.934-2.809.934C5.627 3.164 8.217 2.004 11.124 1.738c.236-.033.482-.05.731-.055.249.005.495.022.731.055 2.908.266 5.498 1.426 7.209 3.418 0 0-1.351-.788-2.809-.934 0 0-.522-.061-1.03.01-.295.041-1.827.19-4.246-.963z" />
                            </svg>
                          )}
                          {platform === "nintendo" && (
                            <span className="text-sm font-bold">N</span>
                          )}
                          {platform === "apple" && (
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                            </svg>
                          )}
                          {platform === "linux" && (
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202-.01-.065-.016-.132-.018-.199v-.02a1.844 1.844 0 01.12-.742.807.807 0 01.24-.334c.16-.134.337-.2.54-.2zm-2.183.817c.675-.06 1.385.257 1.985.742.278.22.526.511.697.834.17.324.277.667.302 1.04h.013c.012.2.02.4.02.6v.03c0 .2-.01.4-.03.6-.053.487-.154.77-.35 1.307-.202.555-.624 1.247-1.01 1.955-.38.7-.795 1.4-1.193 2.133-.39.72-.797 1.4-1.124 2.145-.34.72-.61 1.497-.825 2.334-.215.827-.344 1.757-.427 2.754l-.013.005c-.034.2-.06.739-.137.947-.094.255-.188.45-.376.65-.202.2-.458.268-.78.335a3.265 3.265 0 01-.543.034c-.182 0-.364-.008-.546-.034-.325-.07-.581-.135-.783-.336-.188-.2-.282-.394-.377-.649-.076-.21-.102-.747-.137-.947l-.013-.006c-.082-.997-.21-1.927-.427-2.754-.215-.837-.485-1.614-.825-2.334-.327-.745-.734-1.425-1.124-2.145-.398-.733-.813-1.433-1.193-2.133-.386-.708-.808-1.4-1.01-1.955-.196-.537-.297-.82-.35-1.307-.02-.2-.03-.4-.03-.6v-.03c0-.2.008-.4.02-.6h.013c.024-.373.133-.716.302-1.04.17-.323.42-.614.697-.834.596-.49 1.31-.8 1.985-.742.65.058 1.342.394 1.844.89.502-.496 1.194-.832 1.844-.89zm-2.426 7.546c.18.371.43.74.657 1.075.236.343.39.682.49 1.02.105.337.175.673.205 1.01.033.365.038.73.012 1.096-.413-.462-.717-.97-.905-1.51-.189-.546-.283-1.112-.296-1.692-.006-.262.005-.584.063-.835l.02-.076c.026-.092.049-.2.082-.33.033-.135.066-.2.124-.267.066-.07.136-.1.213-.135.093-.05.198-.1.31-.167.117-.07.176-.119.213-.167.05-.08.039-.178-.026-.258-.064-.08-.15-.115-.255-.135-.112-.02-.254-.015-.368.026a1.66 1.66 0 00-.355.162c-.12.07-.23.164-.344.266-.115.101-.254.165-.35.267-.09.101-.153.165-.19.268-.039.101-.049.203-.049.336 0 .135.01.203.034.47.023.267.031.467.055.668.047.405.157.745.322 1.02.164.27.41.478.68.65.276.172.56.272.86.303.301.031.61-.008.91-.156.162-.07.31-.153.47-.234.165-.08.32-.153.505-.202.183-.045.399-.072.613-.098.21-.023.427-.047.627-.08.426-.068.815-.155 1.17-.292.347-.134.664-.337.923-.572.26-.234.45-.526.603-.854.152-.337.243-.699.243-1.087v-.03c0-.267-.008-.533-.012-.8-.009-.534-.024-1.064-.024-1.598v-.301c0-.1 0-.168.005-.267.006-.067.015-.2.035-.267.02-.067.039-.136.088-.2.05-.066.115-.134.21-.167.19-.068.335.075.438.2.102.134.178.268.238.402.06.133.118.2.16.4.047.2.081.4.117.668.036.267.072.47.087.735.015.267.044.533.052.8.02.534.02 1.067-.122 1.6-.16.534-.485 1.067-1.03 1.27-.385.135-.786.2-1.186.234-.4.031-.79.047-1.186.047h-.047c-.396 0-.79-.016-1.186-.047-.4-.034-.801-.1-1.186-.234-.544-.203-.87-.736-1.029-1.27-.142-.533-.142-1.066-.122-1.6.008-.267.037-.533.052-.8.015-.265.051-.468.087-.735.037-.267.07-.467.117-.668.036-.267.072-.47.087-.735.016-.255.016-.51-.025-.76-.04.25-.108.503-.21.744-.098.246-.225.472-.376.688-.145.216-.321.404-.51.578-.185.174-.376.334-.579.467-.19.134-.404.232-.579.368-.175.134-.351.267-.527.4a5.655 5.655 0 01-.511.323c-.162.101-.313.21-.46.303-.147.09-.289.187-.427.267-.135.08-.274.152-.4.249-.127.097" />
                            </svg>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{game.title}</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:text-red-500"
                        >
                          <Heart className="h-5 w-5 mr-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm text-muted-foreground">
                            {game.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}