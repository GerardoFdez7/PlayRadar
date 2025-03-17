import type { Meta, StoryObj } from "@storybook/react";
import MobileSidebar from "@/layout/MobileSidebar";
import { action } from '@storybook/addon-actions';

const meta = {
  title: "Components/Layout/MobileSidebar",
  component: MobileSidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Responsive sidebar for mobile devices with genre selection",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selectedGenreSlug: {
      control: "text",
      description: "Currently selected genre slug"
    },
    onGenreSelect: {
      action: "genreSelected",
      description: "Genre selection handler"
    }
  },
} satisfies Meta<typeof MobileSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedGenreSlug: null,
    onGenreSelect: action("genreSelected")
  }
};