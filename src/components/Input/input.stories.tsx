import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Input } from './Input'

export default {
  title: 'Example/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
export const Primary = Template.bind({});

export const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} defaultValue={value} onChange={(e) => { setValue(e.target.value) }} />
}

export const disabledInput = () => (
  <Input
    style={{ width: '300px' }}
    placeholder="disabled input"
    disabled
  />
)

export const iconInput = () => (
  <Input
    style={{width: '300px'}}
    placeholder="input with icon"
    icon="search"
  />  
)

export const sizeInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="large size"
      size="lg"
    />
    <Input
      style={{width: '300px'}}
      placeholder="small size"
      size="sm"
    />
  </>
)

export const pandInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      style={{width: '300px'}}
      defaultValue="google"
      append=".com"
    />
  </>
)