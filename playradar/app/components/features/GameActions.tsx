import { Button } from "@/ui/Button";
import { Tooltip } from "@mui/material";
import CheckIcon from "@/ui/CheckIcon";
import PlusIcon from "@/ui/PlusIcon";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import React from "react";

interface GameActionsProps {
  gameId: number;
  user: boolean;
  activeTooltip: { type: string; gameId: number } | null;
  setActiveTooltip: React.Dispatch<React.SetStateAction<{ type: string; gameId: number } | null>>;
  playLater: string[];
  dislikes: string[];
  likes: string[];
  handlePlayLater: (gameId: string) => void;
  handleDislike: (gameId: string) => void;
  handleLike: (gameId: string) => void;
  className?: string;
  ratingsCount: number;
}

export const GameActions = ({
  gameId,
  user,
  activeTooltip,
  setActiveTooltip,
  playLater,
  dislikes,
  likes,
  handlePlayLater,
  handleDislike,
  handleLike,
  className,
  ratingsCount, 
}: GameActionsProps) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {/* "Play later" */}
      <Tooltip
        title="Log in to add game to play later"
        placement="bottom"
        open={!user && activeTooltip?.type === "play-later" && activeTooltip?.gameId === gameId}
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
          size="icon"
          variant="ghost"
          className={`p-0 mr-4 transition-all duration-300 transform ${
            playLater.includes(gameId.toString())
              ? "text-primary scale-110"
              : "hover:[&_svg]:fill-foreground/30"
          }`}
          onClick={() => {
            if (!user) {
              setActiveTooltip({
                type: "play-later",
                gameId: gameId,
              });
            } else {
              handlePlayLater(gameId.toString());
            }
          }}
        >
          {playLater.includes(gameId.toString()) ? <CheckIcon /> : <PlusIcon />}
        </Button>
      </Tooltip>

      {/* Like and Dislike */}
      <div className="flex gap-1 items-center">
        <Tooltip
          title="Log in to add games you dislike"
          placement="bottom"
          open={!user && activeTooltip?.type === "dislike" && activeTooltip?.gameId === gameId}
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
            variant="ghost"
            className={`p-0 m-1 hover:bg-transparent transition-all duration-300 transform ${
              dislikes.includes(gameId.toString()) ? "text-primary scale-110" : "hover:[&_svg]:fill-foreground/30"
            }`}
            onClick={() => {
              if (!user) {
                setActiveTooltip({
                  type: "dislike",
                  gameId: gameId,
                });
              } else {
                const button = document.activeElement as HTMLElement;
                button?.classList.add("animate-ping-once");
                setTimeout(() => button?.classList.remove("animate-ping-once"), 300);
                handleDislike(gameId.toString());
              }
            }}
          >
            <ThumbsDown
              className={`h-5 w-5 transition-transform duration-300 ${
                dislikes.includes(gameId.toString()) ? "fill-current" : ""
              }`}
            />
          </Button>
        </Tooltip>

        <Tooltip
          title="Log in to add games you like"
          placement="bottom"
          open={!user && activeTooltip?.type === "like" && activeTooltip?.gameId === gameId}
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
            variant="ghost"
            className={`p-0 m-1 hover:bg-transparent transition-all duration-300 transform ${
              likes.includes(gameId.toString()) ? "text-primary scale-110" : "hover:[&_svg]:fill-foreground/30"
            }`}
            onClick={() => {
              if (!user) {
                setActiveTooltip({
                  type: "like",
                  gameId: gameId,
                });
              } else {
                const button = document.activeElement as HTMLElement;
                button?.classList.add("animate-ping-once");
                setTimeout(() => button?.classList.remove("animate-ping-once"), 300);
                handleLike(gameId.toString());
              }
            }}
          >
            <ThumbsUp
              className={`h-5 w-5 transition-transform duration-300 ${
                likes.includes(gameId.toString()) ? "fill-current" : ""
              }`}
            />
          </Button>
        </Tooltip>

        <span className="text-stext-muted-foreground">{ratingsCount}</span>
      </div>
    </div>
  );
};