import React from 'react';
import { PlayLaterButton } from '@/components/features/PlayLater';
import { LikeDislikeButtons } from '@/components/features/Like&Dislike';

interface GameActionsProps {
  gameId: number;
  user: boolean;
  activeTooltip: { type: string; gameId: number } | null;
  setActiveTooltip: React.Dispatch<
    React.SetStateAction<{ type: string; gameId: number } | null>
  >;
  className?: string;
  ratingsCount: number;
}

export const GameActions = ({
  gameId,
  user,
  activeTooltip,
  setActiveTooltip,
  className,
  ratingsCount,
}: GameActionsProps) => {
  const handleAction = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const button = target.closest('[data-action]');
    if (!button) return;

    // Event delegation to reduce the number of event listeners for the Tooltip
    const action = button.getAttribute('data-action');
    if (!user) {
      setActiveTooltip({
        type: action || '',
        gameId: gameId,
      });
    }
  };

  return (
    <div
      className={`flex justify-between items-center ${className}`}
      onClick={handleAction}
    >
      <PlayLaterButton
        gameId={gameId}
        user={user}
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
      />
      <LikeDislikeButtons
        user={user}
        activeTooltip={activeTooltip}
        setActiveTooltip={setActiveTooltip}
        gameId={gameId}
        ratingsCount={ratingsCount}
      />
    </div>
  );
};
