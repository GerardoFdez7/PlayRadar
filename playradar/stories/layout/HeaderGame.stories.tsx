import type { Meta, StoryObj } from '@storybook/react';
import HeaderGame from '@/components/layout/HeaderGame';

const meta: Meta<typeof HeaderGame> = {
  title: 'Components/Layout/HeaderGame',
  component: HeaderGame,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeaderGame>;

export const Default: Story = {
  args: {},
};
