import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from './index';

import Icon from '../Icon';

export default {
  title: 'Example/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // @ts-ignore
  type: 'primary',
  children: 'Avatar',
};

export const Basic = () => {
  return <>
  <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
    <Avatar size={64} icon={<Icon icon='house-user' />} />
    <Avatar size="large" icon={<Icon icon='house-user' />} />
    <Avatar icon={<Icon icon='house-user' />} />
    <Avatar size="small" icon={<Icon icon='house-user' />} />
  </div>
  <br/>
  <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
    <Avatar shape="square" size={64} icon={<Icon icon='house-user' />} />
    <Avatar shape="square" size="large" icon={<Icon icon='house-user' />} />
    <Avatar shape="square" icon={<Icon icon='house-user' />} />
    <Avatar shape="square" size="small" icon={<Icon icon='house-user' />} />
  </div>
</>
}

export const Type = () => (
  <>
    <Avatar icon={<Icon icon='house-user' />} />
    <Avatar>U</Avatar>
    <Avatar size={40}>USER</Avatar>
    <Avatar src="https://joeschmoe.io/api/v1/random" />
    <Avatar src={<img src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<Icon icon='house-user' />} />
  </>
);