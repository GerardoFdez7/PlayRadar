import type { Meta, StoryObj } from "@storybook/react";
import PlusIcon from "@/components/ui/PlusIcon";

const meta = {
  title: "Components/UI/PlusIcon",
  component: PlusIcon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A plus icon with rotation animation capabilities through CSS classes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling and animations",
      table: {
        defaultValue: { summary: "''" },
      },
    },
  },
} satisfies Meta<typeof PlusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "",
  },
};

export const CustomClass: Story = {
  args: {
    className: "text-blue-500 scale-150",
  },
};