import type { Meta, StoryObj } from '@storybook/react';
import LoaderSmall from '@/components/ui/LoaderSmall';

const meta = {
  title: 'Components/ui/LoaderSmall',
  component: LoaderSmall,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An animated loading indicator using Lottie animation. Displays a smooth animation while content is loading.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof LoaderSmall>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
