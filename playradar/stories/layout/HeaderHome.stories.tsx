import type { Meta, StoryObj } from '@storybook/react';
import HeaderHome from '@/components/layout/HeaderHome';

const meta = {
  title: 'Components/Layout/HeaderHome',
  component: HeaderHome,
  tags: ['autodocs'],
  argTypes: {
    setSearchTerm: { action: 'setSearchTerm' },
    setIsMobileMenuOpen: { action: 'setIsMobileMenuOpen' },
    setSelectedGenreSlug: { action: 'setSelectedGenreSlug' },
  },
} satisfies Meta<typeof HeaderHome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Defaut: Story = {
  args: {
    user: false,
    selectedGenreSlug: null,
    isMobileMenuOpen: false,
    searchTerm: '',
    setSearchTerm: () => {},
    setIsMobileMenuOpen: () => {},
    setSelectedGenreSlug: () => {},
  },
};

export const SearchActive: Story = {
  args: {
    user: false,
    selectedGenreSlug: null,
    isMobileMenuOpen: false,
    searchTerm: 'Rocket League',
    setSearchTerm: () => {},
    setIsMobileMenuOpen: () => {},
    setSelectedGenreSlug: () => {},
  },
};
