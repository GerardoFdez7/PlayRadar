import React from "react";
import { Tooltip } from "@mui/material";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/ui/Button";
import { useGamePreferences } from "@/hooks/useGamePreferences";

interface LikeDislikeProps {
  user: boolean;
  activeTooltip: { type: string; gameId: number } | null;
  setActiveTooltip: React.Dispatch<
    React.SetStateAction<{ type: string; gameId: number } | null>
  >;
  gameId: number;
  ratingsCount: number;
}

export const LikeDislikeButtons = ({
  user,
  activeTooltip,
  setActiveTooltip,
  gameId,
  ratingsCount,
}: LikeDislikeProps) => {
  const { userLikes, userDislikes, handleLikeToggle, handleDislikeToggle } =
    useGamePreferences();

  return (
    <div className="flex gap-1 items-center">
      <Tooltip
        title="Log in to add games you dislike"
        placement="bottom"
        open={
          !user &&
          activeTooltip?.type === "dislike" &&
          activeTooltip?.gameId === gameId
        }
        onClose={() => setActiveTooltip(null)}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        slotProps={{
          tooltip: {
            className:
              "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-lg text-sm",
          },
        }}
      >
        <Button
          data-action="dislike"
          variant="ghost"
          onClick={() => user && handleDislikeToggle(gameId.toString())}
          className={`p-0 m-1 hover:bg-transparent transition-all duration-300 transform ${
            userDislikes.includes(gameId.toString())
              ? "text-primary scale-110"
              : "hover:[&_svg]:fill-foreground/30"
          }`}
        >
          <ThumbsDown
            className={`h-5 w-5 transition-transform duration-300 ${
              userDislikes.includes(gameId.toString()) ? "fill-current" : ""
            }`}
          />
        </Button>
      </Tooltip>

      <Tooltip
        title="Log in to add games you like"
        placement="bottom"
        open={
          !user &&
          activeTooltip?.type === "like" &&
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
          data-action="like"
          variant="ghost"
          onClick={() => user && handleLikeToggle(gameId.toString())}
          className={`p-0 m-1 hover:bg-transparent transition-all duration-300 transform ${
            userLikes.includes(gameId.toString())
              ? "text-primary scale-110"
              : "hover:[&_svg]:fill-foreground/30"
          }`}
        >
          <ThumbsUp
            className={`h-5 w-5 transition-transform duration-300 ${
              userLikes.includes(gameId.toString()) ? "fill-current" : ""
            }`}
          />
        </Button>
      </Tooltip>

      <span className="text-stext-muted-foreground">{ratingsCount}</span>
    </div>
  );
};
