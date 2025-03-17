import type { Meta, StoryObj } from "@storybook/react";
import LoadingAnimation from "@/components/ui/Loader";

const meta = {
  title: "Components/ui/Loader",
  component: LoadingAnimation,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An animated loading indicator using Lottie animation. Displays a smooth animation while content is loading.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for container",
      table: {
        defaultValue: { summary: "''" },
      },
    },
    size: {
      control: { type: "number", min: 20, max: 200 },
      description: "Size of the loader in pixels",      
    },
  },
} satisfies Meta<typeof LoadingAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 20,
  },
};

export const CustomSize: Story = {
  args: {
    size: 80,
  },
};

export const Small: Story = {
  args: {
    size: 10,
  },
};