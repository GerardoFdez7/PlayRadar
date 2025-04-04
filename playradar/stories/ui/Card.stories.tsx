import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import radarImage from '@/assets/placeholder.png';
import Image from 'next/image';

const meta: Meta<typeof Card> = {
  title: 'Components/UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>Manage your project settings</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Project Status: Active</p>
        <p className="text-sm">Members: 5</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardContent className="p-0">
        <Image
          src={radarImage}
          alt="PlayRadar Logo"
          className="rounded-t-lg h-48 w-full object-cover"
        />
        <div className="p-6">
          <CardTitle>Featured Content</CardTitle>
          <p className="text-sm mt-2 text-muted-foreground">
            This is an example card with an image header.
          </p>
        </div>
      </CardContent>
    </Card>
  ),
};
