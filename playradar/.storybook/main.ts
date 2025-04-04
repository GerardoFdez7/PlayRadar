import { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/layout/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/features/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-themes',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../app'),
        '@/lib': path.resolve(__dirname, '../app/lib'),
        '@/components': path.resolve(__dirname, '../app/components'),
        '@/hooks': path.resolve(__dirname, '../app/hooks'),
        '@/services': path.resolve(__dirname, '../app/services'),
        '@/assets': path.resolve(__dirname, '../app/assets'),
      };

      config.resolve.modules = [
        ...(config.resolve.modules || []),
        path.resolve(__dirname, '../app'),
        path.resolve(__dirname, '../node_modules'),
      ];
    }
    return config;
  },

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
