import type { Meta, StoryObj } from '@storybook/react';
import AvatarProfile from '@/components/features/AvatarProfile';

const meta: Meta<typeof AvatarProfile> = {
  title: 'Components/Features/AvatarProfile',
  component: AvatarProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isEditing: {
      control: 'boolean',
      description: 'Whether the avatar is in edit mode',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarProfile>;

export const Default: Story = {
  args: {
    isEditing: false,
  },
};
