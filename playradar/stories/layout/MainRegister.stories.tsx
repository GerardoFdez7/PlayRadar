import type { Meta, StoryObj } from "@storybook/react";
import MainRegister from "@/app/components/layout/MainRegister";

const meta = {
  title: "Components/Layout/MainRegister",
  component: MainRegister,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MainRegister>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: null,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false,
    handleGoogleSignIn: () => console.log("Google sign-in clicked"),
    setError: () => {},
    setUsername: () => {},
    setEmail: () => {},
    setPassword: () => {},
    setConfirmPassword: () => {},
  },
};
