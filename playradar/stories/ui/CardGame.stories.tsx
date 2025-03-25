import type { Meta, StoryObj } from "@storybook/react";
import CardGame from "@/components/ui/CardGame";
import { Game } from "@/types/games.types";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof CardGame> = {
  title: "Components/UI/CardGame",
  component: CardGame,
  tags: ["autodocs"],
} satisfies Meta<typeof CardGame>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock game data matching the Game type
const mockGame: Game = {
  id: 123,
  name: "Cyber Adventure 2077",
  slug: "cyber-adventure-2077",
  background_image: "https://play-lh.googleusercontent.com/mTPbxTTZ767n84VstMFdI4UEaaEvnAevaIfcLOjqlxzLupuGX5x0xE63LgyVrGjAHXc=w648-h364-rw",
  genres: [
    { id: 1, name: "RPG", slug: "rpg" },
    { id: 2, name: "Sci-Fi", slug: "sci-fi" },
  ],
  released: "2023-10-01",
  ratings_count: 1500,
  parent_platforms: [
    { platform: { id: 1, slug: "pc", name: "Windows" } },
    { platform: { id: 2, slug: "playstation", name: "PlayStation" } },
  ],
  short_screenshots: [
    { id: 1, image: "https://play-lh.googleusercontent.com/mTPbxTTZ767n84VstMFdI4UEaaEvnAevaIfcLOjqlxzLupuGX5x0xE63LgyVrGjAHXc=w648-h364-rw" },
    { id: 2, image: "https://example.com/screenshot2.jpg" },
  ],
};

// Mock handlers and refs
const videoRefs = { current: {} };
const handlers = {
  handleHoverGame: action("hover-game"),
  handleScreenshotHover: action("screenshot-hover"),
  setMuted: action("set-muted"),
  setActiveTooltip: action("set-active-tooltip"),
};

export const Default: Story = {
  args: {
    games: mockGame,
    trailers: { "123": "https://example.com/trailer.mp4" },
    muted: true,
    currentScreenshotIndex: { 123: 0 },
    user: true,
    activeTooltip: null,
    ...handlers,
    videoRefs: videoRefs as React.MutableRefObject<{
      [key: string]: HTMLVideoElement | null;
    }>,
  },
  decorators: [
    (Story) => (
      <div className="dark:bg-gray-900 p-8">
        <Story />
      </div>
    ),
  ],
};

export const HoveredState: Story = {
  ...Default,
  args: {
    ...Default.args,
    muted: false,
    trailers: {},
  },
};
