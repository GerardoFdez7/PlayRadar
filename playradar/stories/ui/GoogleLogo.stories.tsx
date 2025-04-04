import type { Meta, StoryObj } from '@storybook/react';
import GoogleLogo from '@/components/ui/GoogleLogo';

const meta = {
  title: 'Components/UI/GoogleLogo',
  component: GoogleLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Google brand logo with customizable size through className',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Tailwind classes for size and color',
    },
  },
} satisfies Meta<typeof GoogleLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'w-8 h-8',
  },
};
