import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { GoBack } from '@/app/components/ui/GoBack';

const meta: Meta<typeof GoBack> = {
  title: 'Components/UI/GoHome',
  component: GoBack,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GoBack>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    await userEvent.click(button);
  },
};
