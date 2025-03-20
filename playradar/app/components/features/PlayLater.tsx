import React from "react";
import { Button } from "@/ui/Button";
import { Tooltip } from "@mui/material";
import CheckIcon from "@/ui/CheckIcon";
import PlusIcon from "@/ui/PlusIcon";
import { usePlayLater } from "@/hooks/usePlayLater";

interface PlayLaterButtonProps {
  gameId: number;
  user: boolean;
  activeTooltip: { type: string; gameId: number } | null;
  setActiveTooltip: React.Dispatch<
    React.SetStateAction<{ type: string; gameId: number } | null>
  >;
  className?: string;
}

export const PlayLaterButton = ({
  gameId,
  user,
  activeTooltip,
  setActiveTooltip,
  className,
}: PlayLaterButtonProps) => {
  const { userPlayLater, handlePlayLaterToggle } = usePlayLater();

  return (
    <Tooltip
      title="Log in to add game to play later"
      placement="bottom"
      open={
        !user &&
        activeTooltip?.type === "play-later" &&
        activeTooltip?.gameId === gameId
      }
      onClose={() => setActiveTooltip(null)}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      componentsProps={{
        tooltip: {
          className:
            "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-lg text-sm",
        },
      }}
    >
      <Button
        data-action="play-later"
        variant="ghost"
        onClick={() => user && handlePlayLaterToggle(gameId.toString())}
        className={`p-0 mr-4 transition-all duration-300 transform ${
          userPlayLater.includes(gameId.toString())
            ? "text-primary scale-110"
            : "hover:[&_svg]:fill-foreground/30"
        } ${className}`}
      >
        {userPlayLater.includes(gameId.toString()) ? (
          <CheckIcon />
        ) : (
          <PlusIcon />
        )}
      </Button>
    </Tooltip>
  );
};
