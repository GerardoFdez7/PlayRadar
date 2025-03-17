import type { Meta, StoryObj } from "@storybook/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/ThemeDropdown";

/**
 * ThemeDropdown component documentation
 * 
 * A customizable dropdown menu component for theme selection with the following features:
 * - Supports light/dark/system theme modes
 * - Animated transitions
 * - Keyboard navigation
 * - Mobile responsive
 * 
 * Uses Radix UI under the hood with custom styling through Tailwind CSS
 */
const meta = {
  title: "Components/UI/ThemeDropdown",
  component: DropdownMenuContent, // Changed to target Content component
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A theme selection dropdown with icon indicators and proper styling.",
          "### Features:",
          "- Position control (side/align props)",
          "- Dark mode compatibility",
          "- Customizable menu items",
          "- Type-safe implementation with Radix UI"
        ].join('\n'),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: "Dropdown positioning relative to trigger",
      table: {
        defaultValue: { summary: "bottom" },
        type: { summary: "enum" },
      },
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: "Dropdown alignment relative to trigger",
      table: {
        defaultValue: { summary: "start" },
        type: { summary: "enum" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the dropdown content",
    },
  },
} satisfies Meta<typeof DropdownMenuContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default theme dropdown example
 * 
 * Basic implementation with light/dark/system options. 
 * Uses default positioning and styling.
 */
export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="px-4 py-2 bg-background text-foreground rounded-md border"
        aria-label="Theme selection"
      >
        Select Theme
      </DropdownMenuTrigger>
      <DropdownMenuContent {...args}>
        <DropdownMenuItem className="gap-2">
         Light
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
         System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  args: {
    side: "bottom",
    align: "start",
    className: "min-w-[200px]",
  },
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
};

/**
 * Right-aligned dark mode variant
 * 
 * Demonstrates different positioning and dark mode styling.
 */
export const DarkModeVariant: Story = {
  ...Default,
  args: {
    ...Default.args,
    side: "right",
    align: "end",
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};