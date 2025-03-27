import type { Meta, StoryObj } from "@storybook/react";
import MainLogin from "@/app/components/layout/MainLogin";

const meta = {
  title: "Components/Layout/MainLogin",
  component: MainLogin,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MainLogin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: "",
    password: "",
    showPassword: false,
    error: null,
    isLoading: false,
    showForgotPassword: false,
    newPassEmail: "",
    message: "",
    setEmail: () => {},
    setPassword: () => {},
    setShowPassword: () => {},
    setError: () => {},
    setShowForgotPassword: () => {},
    setNewPassEmail: () => {},
    handleGoogleSignIn: () => console.log("Google sign-in clicked"),
  },
};
