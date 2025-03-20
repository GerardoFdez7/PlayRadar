import type { Meta, StoryObj } from "@storybook/react";
import { GameActions } from "@/components/features/GameActions";
import { useState } from "react";

const meta: Meta<typeof GameActions> = {
  title: "Components/Features/GameActions",
  component: GameActions,
};

export default meta;

type Story = StoryObj<typeof GameActions>;

export const LoggedOut: Story = {
  args: {
    gameId: 123,
    user: false,
    ratingsCount: 42,
  },
  render: (args) => {
    const Wrapper = () => {
      const [activeTooltip, setActiveTooltip] = useState<{ 
        type: string; 
        gameId: number 
      } | null>(null);
      
      return (
        <GameActions 
          {...args}
          activeTooltip={activeTooltip}
          setActiveTooltip={setActiveTooltip}
        />
      );
    }
    return <Wrapper />;
  }
};

export const LoggedIn: Story = {
  args: {
    gameId: 123,
    user: true,
    ratingsCount: 42,
  },
  render: (args) => {
    const Wrapper = () => {
      const [activeTooltip, setActiveTooltip] = useState<{ 
        type: string; 
        gameId: number 
      } | null>(null);
      
      return (
        <GameActions 
          {...args}
          activeTooltip={activeTooltip}
          setActiveTooltip={setActiveTooltip}
        />
      );
    }
    return <Wrapper />;
  }
};
