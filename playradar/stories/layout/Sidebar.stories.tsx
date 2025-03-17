import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Sidebar from "@/components/layout/Sidebar";

const meta = {
  title: "Components/Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Primary sidebar with genre navigation and filtering",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for container"
    },
    h2ClassName: {
      control: "text",
      description: "Styling for the heading element"
    },
    spanClassName: {
      control: "text",
      description: "Styling for genre text spans"
    },
    selectedGenreSlug: {
      control: "text",
      description: "Currently active genre slug"
    },
    onGenreSelect: {
      action: "genreSelected",
      description: "Genre selection callback"
    }
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedGenreSlug: null,
    onGenreSelect: action("genreSelected"),
    className: "",
    h2ClassName: "text-gray-900 dark:text-white",
    spanClassName: "font-medium"
  }
};