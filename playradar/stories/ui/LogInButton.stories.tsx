import type { Meta, StoryObj } from "@storybook/react";
import LogInButton from "@/components/ui/LogInButton";

const meta = {
  title: "Components/UI/LogInButton",
  component: LogInButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A login button component that handles authentication state. Shows either a login button or user avatar based on authentication status.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
      table: {
        defaultValue: { summary: "''" },
      },
    },
  },
} satisfies Meta<typeof LogInButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "",
  },
};

export const WithCustomStyle: Story = {
  args: {
    className: "",
  },
};