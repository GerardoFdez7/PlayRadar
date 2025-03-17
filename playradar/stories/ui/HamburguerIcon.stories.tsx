import type { Meta, StoryObj } from "@storybook/react";
import HamburguerIcon from "@/components/ui/HamburguerIcon"; 

const meta = {
  title: "Components/ui/HamburguerIcon",
  component: HamburguerIcon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An animated hamburger menu icon that transitions between open and closed states. Used for mobile navigation menus.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls the visual state of the icon (open/closed)",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof HamburguerIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    open: false,
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
};
