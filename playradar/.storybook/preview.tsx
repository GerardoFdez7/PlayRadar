import * as React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../app/components/features/ThemeProvider";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@emotion/cache";
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import "../app/globals.css";
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const emotionCache = createEmotionCache({
  key: "css",
  prepend: true
});

const mockRouter: AppRouterInstance = {
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
  back: () => Promise.resolve(),
  forward: () => Promise.resolve(),
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppRouterContext.Provider value={mockRouter as AppRouterInstance}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider>
              <Story />
          </ThemeProvider>
        </CacheProvider>
      </AppRouterContext.Provider>
    ),
  ],
  parameters: {
    themes: {
      default: "light",
      list: [
        { name: "light", class: "light", color: "#ffffff" },
        { name: "dark", class: "dark", color: "#000000" },
        { name: "system", class: "system" },
      ],
    },
  },
};

export default preview;
