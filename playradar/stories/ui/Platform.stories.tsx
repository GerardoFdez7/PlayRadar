import type { Meta, StoryObj } from "@storybook/react";
import {
  PcIcon,
  XboxIcon,
  PlaystationIcon,
  NintendoIcon,
  MacIcon,
  LinuxIcon,
  IosIcon,
  AndroidIcon,
} from "@/components/ui/Platforms";

const meta = {
  title: "Components/UI/Platforms",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Individual platform icons with hover effects",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// PC Icon Story
export const PC: Story = {
  render: () => {
    return <PcIcon className="w-8 h-8 text-foreground" />;
  },
};

// Xbox Icon Story
export const Xbox: Story = {
  render: () => <XboxIcon className="w-8 h-8 text-foreground" />,
};

// Playstation Icon Story
export const Playstation: Story = {
  render: () => <PlaystationIcon className="w-8 h-8 text-foreground" />,
};

// Nintendo Icon Story
export const Nintendo: Story = {
  render: () => <NintendoIcon className="w-8 h-8 text-foreground" />,
};

// Mac Icon Story
export const Mac: Story = {
  render: () => <MacIcon className="w-8 h-8 text-foreground" />,
};

// Linux Icon Story
export const Linux: Story = {
  render: () => <LinuxIcon className="w-8 h-8 text-foreground" />,
};

// iOS Icon Story
export const iOS: Story = {
  render: () => <IosIcon className="w-8 h-8 text-foreground" />,
};

// Android Icon Story
export const Android: Story = {
  render: () => <AndroidIcon className="w-8 h-8 text-foreground" />,
};
