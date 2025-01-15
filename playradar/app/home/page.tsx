"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, Search, ThumbsUp, Heart } from "lucide-react";
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
import radarImage from "./radar.png";
import videoGameImage from "./videogame.png";

const genres = [
  { name: "Action", icon: "🎮" },
  { name: "Adventure", icon: "🗺️" },
  { name: "Arcade", icon: "👾" },
  { name: "Board Games", icon: "🎲" },
  { name: "Card", icon: "🃏" },
  { name: "Casual", icon: "🎯" },
  { name: "Educational", icon: "📚" },
  { name: "Family", icon: "👨‍👩‍👧‍👦" },
  { name: "Fighting", icon: "🥊" },
  { name: "Indie", icon: "🎨" },
  { name: "Massively Multiplayer", icon: "🌐" },
];

const games = [
  {
    id: 1,
    title: "Grand Theft Auto V",
    image:
    videoGameImage,
    platforms: ["windows", "playstation", "xbox"],
    rating: 92,
    likes: 1500,
  },
  {
    id: 2,
    title: "The Witcher 3: Wild Hunt",
    image:
    videoGameImage,
    platforms: ["windows", "playstation", "xbox", "nintendo"],
    rating: 92,
    likes: 2000,
  },
  {
    id: 3,
    title: "Black Myth: Wukong",
    image:
    videoGameImage,
    platforms: ["windows", "playstation", "xbox", "apple", "linux"],
    rating: 95,
    likes: 1800,
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
              <Input placeholder="Search games..." className="pl-8 w-full" />
            </div>
          </div>
          <Button
            size="icon"
            className="ml-4"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-6">Games</h1>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Order by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="release">Release Date</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pc">PC</SelectItem>
                <SelectItem value="playstation">PlayStation</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="nintendo">Nintendo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video relative">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {game.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="w-5 h-5 flex items-center justify-center bg-black/60 rounded"
                      >
                        {platform === "windows" && "🖥️"}
                        {platform === "playstation" && "🎮"}
                        {platform === "xbox" && "X"}
                        {platform === "nintendo" && "🕹️"}
                        {platform === "apple" && "🍎"}
                        {platform === "linux" && "🐧"}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold truncate">{game.title}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:text-red-500"
                    >
                      <Heart className="h-5 w-5" />
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
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
