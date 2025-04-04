import type { Meta, StoryObj } from '@storybook/react';
import HeaderProfile from '@/components/layout/HeaderProfile';

const meta: Meta<typeof HeaderProfile> = {
  title: 'Components/Layout/HeaderProfile',
  component: HeaderProfile,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeaderProfile>;

export const Default: Story = {
  args: {},
};
