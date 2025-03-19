import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  render: (args) => (
    <Tabs defaultValue="account" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <p className="pt-4">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="pt-4">Configure your settings here.</p>
      </TabsContent>
      <TabsContent value="billing">
        <p className="pt-4">View and manage your billing details.</p>
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'account',
  },
};