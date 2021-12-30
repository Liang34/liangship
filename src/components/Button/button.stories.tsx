import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './button'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
// 编写一个按钮
export const Primary = Template.bind({});
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button'
}
export const Disable = Template.bind({});
Disable.args = {
  disabled: true,
  children: 'Diaable Button'
}

export const ButtonSize = Template.bind({});
ButtonSize.args = {
  size: 'lg',
  children: 'Size'
};

// export const Small = Template.bind({});
// Small.args = {
//   size: 'sm'
// };
