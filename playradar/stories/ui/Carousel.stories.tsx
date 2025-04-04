import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '@/app/components/ui/Carousel';
import React from 'react';

const meta = {
  title: 'Components/UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      {
        id: '1',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=800',
        alt: 'Random landscape',
      },
      {
        id: '2',
        type: 'image',
        src: 'https://picsum.photos/seed/picsum/800/600',
        alt: 'Mountain view',
      },
      {
        id: '3',
        type: 'image',
        src: 'https://picsum.photos/800/600?grayscale',
        alt: 'Black and white city',
      },
      {
        id: '4',
        type: 'image',
        src: 'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
        alt: 'Ocean waves',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};
