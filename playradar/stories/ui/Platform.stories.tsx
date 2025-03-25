import type { Meta, StoryObj } from "@storybook/react";
import {
  PcIcon,
  XboxIcon,
  XboxOneIcon,
  XboxSeriesXIcon,
  PlaystationIcon,
  Playstation4Icon,
  Playstation5Icon,
  NintendoIcon,
  NintendoSwitchIcon,
  NintendoWiiIcon,
  NintendoDsIcon,
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
export const Windows: Story = {
  render: () => {
    return <PcIcon className="w-8 h-8 text-foreground" />;
  },
};

// Xbox Icon Story
export const Xbox: Story = {
  render: () => <XboxIcon className="w-8 h-8 text-foreground" />,
};

// XboxOne Icon Story
export const XboxOne: Story = {
  render: () => <XboxOneIcon className="w-8 h-8 text-foreground" />,
};

// XboxOne Icon Story
export const XboxSeriesX: Story = {
  render: () => <XboxSeriesXIcon className="w-8 h-8 text-foreground" />,
};

// Playstation Icon Story
export const Playstation: Story = {
  render: () => <PlaystationIcon className="w-8 h-8 text-foreground" />,
};

// Playstation 5 Icon Story
export const Playstation5: Story = {
  render: () => <Playstation5Icon className="w-8 h-8 text-foreground" />,
};

// Playstation 4 Icon Story
export const Playstation4: Story = {
  render: () => <Playstation4Icon className="w-8 h-8 text-foreground" />,
};

// Nintendo Icon Story
export const Nintendo: Story = {
  render: () => <NintendoIcon className="w-8 h-8 text-foreground" />,
};

// Nintendo Switch Icon Story
export const NintendoSwitch: Story = {
  render: () => <NintendoSwitchIcon className="w-8 h-8 text-foreground" />,
};

// Nintendo Wii Icon Story
export const NintendoWii: Story = {
  render: () => <NintendoWiiIcon className="w-8 h-8 text-foreground" />,
};

// Nintendo DS Icon Story
export const NintendoDS: Story = {
  render: () => <NintendoDsIcon className="w-8 h-8 text-foreground" />,
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
export const IOS: Story = {
  render: () => <IosIcon className="w-8 h-8 text-foreground" />,
};

// Android Icon Story
export const Android: Story = {
  render: () => <AndroidIcon className="w-8 h-8 text-foreground" />,
};
