import type { Meta, StoryObj } from "@storybook/react";
import HeaderAuth from "@/layout/HeaderAuth";

const meta = {
  title: "Components/Layout/HeaderAuth",
  component: HeaderAuth,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Authentication header with logo and theme toggle",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof HeaderAuth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
