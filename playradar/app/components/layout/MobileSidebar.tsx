"use client";

import React from "react";
import Drawer from "@mui/joy/Drawer";
import { CssVarsProvider } from "@mui/joy/styles";
import { useTheme } from "next-themes";
import HamburguerIcon from "@/ui/HamburguerIcon";
import Sidebar from "@/layout/Sidebar";
import LogInButton from "@/ui/LogInButton";
import ModeToggle from "@/features/ThemeSelector";

interface MobileSidebarContentProps {
  selectedGenreSlug: string | null;
  onGenreSelect: (slug: string | null) => void;
}

function MobileSidebarContent({
  selectedGenreSlug,
  onGenreSelect
}: MobileSidebarContentProps) {
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme } = useTheme();
  
  return (
    <>
      <div onClick={() => setOpen(true)}>
        <HamburguerIcon open={open} />
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        sx={{
          "& .MuiDrawer-content": {
            backgroundColor: resolvedTheme === "dark" ? "#1f2937" : "#d1d5db",
            color: resolvedTheme === "dark" ? "#d1d5db" : "#1f2937",
          },
        }}
        className={resolvedTheme === "dark" ? "dark" : "light"}
      >
        <header className="flex flex-row gap-4 justify-between mx-3 mt-2">
          <div onClick={() => setOpen(false)} role="button">
            <HamburguerIcon open={open} />
          </div>
          <div className="flex gap-4 items-center">
            <LogInButton />
            <ModeToggle />
          </div>
        </header>
        <Sidebar
          h2ClassName="text-right"
          spanClassName="justify-end w-full"
          selectedGenreSlug={selectedGenreSlug}
          onGenreSelect={onGenreSelect}
        />
      </Drawer>
    </>
  );
}

// Update main component to pass props
export default function MobileSidebar({
  selectedGenreSlug,
  onGenreSelect
}: MobileSidebarContentProps) {
  return (
    <CssVarsProvider>
      <MobileSidebarContent 
        selectedGenreSlug={selectedGenreSlug}
        onGenreSelect={onGenreSelect}
      />
    </CssVarsProvider>
  );
}
