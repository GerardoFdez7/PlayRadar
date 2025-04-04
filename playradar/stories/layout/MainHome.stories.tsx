import type { Meta, StoryObj } from '@storybook/react';
import MainHome from '@/components/layout/MainHome';
import { Game } from '@/types/games.types';
import { platforms } from '@/app/lib/consts/games.consts';

const mockGames: Game[] = [
  {
    id: 1,
    name: 'Sample Game 1',
    slug: 'sample-game-1',
    released: '2023-01-01',
    genres: [{ id: 1, name: 'Action', slug: 'action' }],
    background_image: '/sample-image.jpg',
    parent_platforms: [{ platform: { id: 1, name: 'PC', slug: 'pc' } }],
    short_screenshots: [],
    ratings_count: 100,
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Sample Game 2',
    slug: 'sample-game-2',
    released: '2023-02-01',
    genres: [{ id: 2, name: 'Adventure', slug: 'adventure' }],
    background_image: '/sample-image2.jpg',
    parent_platforms: [
      { platform: { id: 2, name: 'PlayStation', slug: 'playstation' } },
    ],
    short_screenshots: [],
    ratings_count: 200,
    isAvailable: true,
  },
  {
    id: 3,
    name: 'Sample Game 3',
    slug: 'sample-game-3',
    released: '2023-02-01',
    genres: [{ id: 2, name: 'Adventure', slug: 'adventure' }],
    background_image: '/sample-image2.jpg',
    parent_platforms: [
      { platform: { id: 3, name: 'PlayStation', slug: 'playstation' } },
    ],
    short_screenshots: [],
    ratings_count: 400,
    isAvailable: true,
  },
  {
    id: 4,
    name: 'Sample Game 4',
    slug: 'sample-game-4',
    released: '2023-02-01',
    genres: [{ id: 4, name: 'Adventure', slug: 'adventure' }],
    background_image: '/sample-image2.jpg',
    parent_platforms: [
      { platform: { id: 4, name: 'PlayStation', slug: 'playstation' } },
    ],
    short_screenshots: [],
    ratings_count: 5600,
    isAvailable: true,
  },
] as unknown as Game[];

const meta: Meta<typeof MainHome> = {
  title: 'Components/Layout/MainHome',
  component: MainHome,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isLoading: { control: 'boolean' },
    selectedPlatform: {
      control: 'select',
      options: ['all', ...platforms.map((p) => p.id)],
    },
    setSortBy: { action: 'setSortBy' },
    setSelectedPlatform: { action: 'setSelectedPlatform' },
  },
};

export default meta;

const Template: StoryObj<typeof MainHome> = {
  render: (args) => <MainHome {...args} />,
};

export const Default: StoryObj<typeof MainHome> = {
  ...Template,
};

Default.args = {
  user: true,
  filteredGames: mockGames,
  recommendedGames: mockGames,
  isLoading: false,
  selectedGenreSlug: null,
  selectedPlatform: 'all',
  sentinelRef: { current: null },
  videoRefs: { current: {} },
  trailers: {},
  muted: false,
  currentScreenshotIndex: {},
  activeTooltip: null,
  // Mock functions
  setSelectedGenreSlug: () => {},
  setSortBy: () => {},
  setSelectedPlatform: () => {},
  setMuted: () => {},
  handleScreenshotHover: () => {},
  getTrailerOfHoveredGame: () => {},
  setActiveTooltip: () => {},
  onTabChange: () => {},
};
