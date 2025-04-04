import type { Meta, StoryObj } from '@storybook/react';
import CheckIcon from '@/components/ui/CheckIcon';

const meta = {
  title: 'Components/UI/CheckIcon',
  component: CheckIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkmark icon with animation capabilities through CSS classes',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for animations/transitions',
    },
  },
} satisfies Meta<typeof CheckIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
  },
};
