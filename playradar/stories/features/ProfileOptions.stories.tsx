import type { Meta, StoryObj } from '@storybook/react';
import ProfileOptions from '@/components/features/ProfileOptions';

const meta: Meta<typeof ProfileOptions> = {
  title: 'Components/Features/ProfileOptions',
  component: ProfileOptions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileOptions>;

export const Default: Story = {
  args: {},
};
