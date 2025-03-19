import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'
import { GoHome } from '@/components/ui/GoHome'

const meta: Meta<typeof GoHome> = {
  title: 'Components/UI/GoHome',
  component: GoHome,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof GoHome>

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = await canvas.findByRole('button')
    await userEvent.click(button)
    
  },
}