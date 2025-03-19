import type { Meta, StoryObj } from "@storybook/react";
import { Requirements } from "@/components/ui/Requirements";

const meta: Meta<typeof Requirements> = {
  title: "Components/UI/Requirements",
  component: Requirements,
  tags: ["autodocs"],
} satisfies Meta<typeof Requirements>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMinimumRequirements = [
  { key: "OS", value: "Windows 10 64-bit" },
  { key: "Processor", value: "Intel Core i5-3570K" },
  { key: "Memory", value: "8 GB RAM" },
  { key: "Graphics", value: "NVIDIA GeForce GTX 780" },
];

const mockRecommendedRequirements = [
  { key: "OS", value: "Windows 11 64-bit" },
  { key: "Processor", value: "Intel Core i7-4790" },
  { key: "Memory", value: "16 GB RAM" },
  { key: "Graphics", value: "NVIDIA GeForce GTX 1060" },
];

export const Default: Story = {
  args: {
    minRequirements: mockMinimumRequirements,
    recRequirements: mockRecommendedRequirements,
  },
};

export const EmptyState: Story = {
  args: {
    minRequirements: [],
    recRequirements: [],
  },
};