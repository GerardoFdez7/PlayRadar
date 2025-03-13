"use client";

import * as React from "react";
import Drawer from "@mui/joy/Drawer";
import { CssVarsProvider } from "@mui/joy/styles";
import { useTheme } from "next-themes";
import HamburguerIcon from "@/app/components/ui/HamburguerIcon";
import Sidebar from "@/app/components/layout/Sidebar";
import LogInButton from "@/app/components/ui/LogInButton";
import ModeToggle from "@/app/components/features/ThemeSelector";

function MobileSidebarContent() {
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
        <header className="flex flex-row justify-between gap-4 mx-3 mt-2">
          <div onClick={() => setOpen(false)} role="button">
            <HamburguerIcon open={open} />
          </div>
          <div className="flex items-center gap-4">
            <LogInButton />
            <ModeToggle />
          </div>
        </header>
        <Sidebar spanClassName="flex items-center justify-end w-full" />
      </Drawer>
    </>
  );
}

export default function MobileSidebar() {
  return (
    <CssVarsProvider>
      <MobileSidebarContent />
    </CssVarsProvider>
  );
}
