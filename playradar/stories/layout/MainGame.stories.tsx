import type { Meta, StoryObj } from "@storybook/react";
import MainGame from "@/components/layout/MainGame";
import { GameDetails, GameMedia } from "@/types/games.types";

const meta: Meta<typeof MainGame> = {
  title: "Components/Layout/MainGame",
  component: MainGame,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MainGame>;

const mockGameDetails: GameDetails = {
  id: 1,
  name: "Cyber Adventure 2077",
  slug: "cyber-adventure-2077",
  description_raw:
    "A futuristic open-world RPG set in a dystopian metropolis...",
  genres: [
    { id: 1, name: "RPG", slug: "rpg" },
    { id: 2, name: "Action", slug: "action" },
  ],
  platforms: [
    {
      platform: { id: 1, name: "PC", slug: "pc" },
      requirements: {
        minimum: "OS: Win 10\nCPU: Intel i5",
        recommended: "OS: Win 11\nCPU: Intel i7",
      },
    },
    { platform: { id: 2, name: "PlayStation 5", slug: "ps5" } },
  ],
  released: "2023-10-01",
  developers: [{ id: 1, name: "Cyber Studios", slug: "cyber-studios" }],
  publishers: [{ id: 1, name: "Future Games Inc", slug: "future-games-inc" }],
  tags: [
    { id: 1, name: "cyberpunk", slug: "cyberpunk" },
    { id: 2, name: "futuristic", slug: "futuristic" },
  ],
  website: "https://example.com",
  stores: [
    {
      id: 1,
      store: {
        id: 1,
        name: "Steam",
        slug: "steam",
        domain: "store.steampowered.com",
      },
    },
  ],
  metacritic: 87,
  metacritic_url: "https://metacritic.com/game/cyber-adventure-2077",
  esrb_rating: { id: 1, name: "Mature 17+" },
  ratings_count: 1500,
};

const mockGameMedia: GameMedia = {
  short_screenshots: [
    { id: 1, image: "https://placehold.co/600x400" },
    { id: 2, image: "https://placehold.co/600x400" },
  ],
  movies: [
    {
      id: 1,
      name: "Gameplay Trailer",
      preview: "https://placehold.co/600x400",
      data: { max: "https://example.com/trailer.mp4" },
    },
  ],
};

export const Default: Story = {
  args: {
    gameDetails: mockGameDetails,
    gameMedia: mockGameMedia,
    user: true,
    activeTooltip: null,
    userPlayLater: [],
    userLikes: [],
    userDislikes: [],
    handlePlayLaterToggle: () => {},
    handleLikeToggle: () => {},
    handleDislikeToggle: () => {},
    setActiveTooltip: () => {},
  },
  parameters: {
    layout: "fullscreen",
    paddings: {
      values: [
        { name: "None", value: "0" },
        { name: "Small", value: "16px" },
        { name: "Medium", value: "32px", default: true },
      ],
    },
  },
};
