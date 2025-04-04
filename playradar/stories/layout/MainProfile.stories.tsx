import type { Meta, StoryObj } from '@storybook/react';
import { MainProfile } from '@/components/layout/MainProfile';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof MainProfile> = {
  title: 'Components/Layout/MainProfile',
  component: MainProfile,
};

export default meta;

type Story = StoryObj<typeof MainProfile>;

export const Default: Story = {
  args: {
    username: 'TestUser',
    editingUsername: false,
    setEditingUsername: action('setEditingUsername'),
    tempUsername: 'TestUser',
    setTempUsername: action('setTempUsername'),
    saveUsername: async () => action('saveUsername')(),
    cancelEditUsername: action('cancelEditUsername'),
    userGenres: [],
    handleGenreToggle: action('handleGenreToggle'),
    userPlatforms: [],
    handlePlatformToggle: action('handlePlatformToggle'),
    likedGames: [],
    dislikedGames: [],
    playLaterGames: [],
    isLoadingLiked: false,
    isLoadingDisliked: false,
    isLoadingPlayLater: false,
    userAuthenticated: true,
    videoRefs: { current: {} },
    trailers: {},
    muted: false,
    setMuted: action('setMuted'),
    handleScreenshotHover: action('handleScreenshotHover'),
    currentScreenshotIndex: {},
    getTrailerOfHoveredGame: action('getTrailerOfHoveredGame'),
    activeTooltip: null,
    setActiveTooltip: action('setActiveTooltip'),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export const EditingUsername: Story = {
  ...Default,
  args: {
    ...Default.args,
    editingUsername: true,
    tempUsername: 'NewUsername',
  },
};
